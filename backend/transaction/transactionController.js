var express = require('express')

var router = express.Router();
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const accountRepo = require('../account/Repo/accountRepo.js')
const transactionRepo = require('./Repo/transactionRepo')



const PENDING = 0;
const DONE = 1;

// {
// 	sendAcc:
// 	recAcc:
// 	message:
// 	amount:
// }
router.post('/addPendingTransaction', (req, res) => {
	var transactionEntity = req.body;

	try{
		var sendAccRemain = accountRepo.getRemain(transactionEntity.sendAcc);
		if (sendAccRemain >= transactionEntity.amount){

			var transaction = transactionRepo.addTransaction(transactionEntity, PENDING);

			transactionRepo.sendEmail(transactionEntity["sendAcc"]);

			res.statusCode = 200;
			res.json({
				msg: "ACCEPTED",
				transactionId: transaction.transactionId
			})
		}
		else {
			res.statusCode = 200;
			res.json({
				msg: 'NOTENOUGH'
			})
		}

	}
	catch(error){
		res.statusCode = 500;
		res.json({
			error
		})
	}
})

router.post('/verifyOTPAndExcuteTransaction', (req, res) => {
	// {
	// 	"transactionId":
	// 	"OTP":
	// }
	var isValid = transactionRepo.checkOTP(req.body.OTP);
	if (isValid){
		var transactionEntity = transactionRepo.getEntityFromTransactionId(req.body.transactionId)
		transactionEntity["status"] = null;
		//thuc hien cong tien

		accountRepo.addRemain(transactionEntity.recAcc, transactionEntity.amount)
		accountRepo.addRemain(transactionEntity.sendAcc, -transactionEntity.amount)

		//add vao database transactionDB

		transactionRepo.addTransaction(transactionEntity, DONE)
		res.statusCode = 200;
		res.json({
			msg:"transfer finish"
		})
	}
	else{
		res.json({
			msg: 'Wrong OTP'
		})
	}

})
module.exports = (router);