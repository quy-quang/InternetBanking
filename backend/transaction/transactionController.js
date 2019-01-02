var express = require('express')

var router = express.Router();
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const accountRepo = require('../account/Repo/accountRepo.js')
const transactionRepo = require('./Repo/transactionRepo')
// {
// 	sendAcc:
// 	recAcc:
// 	message:
// 	amount:
// }
router.post('/', (req, res) => {
	var transactionEntity = req.body;

	var sendAccRemain = accountRepo.getRemain(transactionEntity.sendAcc);
	console.log(sendAccRemain)
	if (sendAccRemain >= transactionEntity.amount){
		//thuc hien cong tien
		accountRepo.addRemain(transactionEntity.recAcc, transactionEntity.amount)
		accountRepo.addRemain(transactionEntity.sendAcc, -transactionEntity.amount)

		//add vao database transactionDB

		transactionRepo.addTransaction(transactionEntity)

		res.statusCode = 200;
		res.json({
		msg: 'transfer finished'
		})
	}
	else {
		res.statusCode = 500;
		res.json({
		msg: 'not enough money'
		})
	}
})

module.exports = (router);