var express = require('express')

var router = express.Router();
var authRepo = require('./Repo/authRepo')
var accountRepo = require('../account/Repo/accountRepo')
var transactionRepo = require('../transaction/Repo/transactionRepo');
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');


var userAdapter = new fileSync('./data/userDB.json');
var userDB = low(userAdapter);

const 	OFFILINE = 0,
		STANDBY = 1,
		READY	= 2;

//add vao database
// {
// 	"username":"...",
// 	"password":"...",
// 	"name":"...",
// 	"email":"...",
// 	"type":"...",
// 	"listAccount":[]
// }
router.post('/', (req, res) => {
	var userEntity = req.body;
	console.log(userEntity.password);
	console.log(typeof userEntity.password);

	var md5_pwd = md5(userEntity.password);
	console.log(JSON.stringify(md5_pwd))

	userEntity["userId"] = shortid.generate();
	userEntity["password"] = md5_pwd;
	userDB.get('user').push(userEntity).write();

	res.statusCode = 201;
	res.json({
		msg: 'received request'
	})
})

//dang nhap
router.post('/login', (req, res) => {
	var loginEntity = req.body;
	var md5_pwd = md5(loginEntity.password);
	console.log(md5_pwd)
	var userEntity = userDB.get('user').find({"username": loginEntity.username, "password": md5_pwd}).value();
	if (userEntity != undefined){
		var acToken = authRepo.generationAccessToken(userEntity);
		var rfToken = authRepo.generateRefreshToken();
		authRepo.updateRefreshToken(userEntity.userId, rfToken)
		res.json({
			auth: true,
			user: userEntity,
			access_token : acToken,
			refresh_token : rfToken
		})
	}
	else{
		res.json({
			auth: false
		})
	}
})

router.post('/getAccountList', (req, res) => {
	// {
	// 	"userId":
	// }
	var userId = req.body.userId;


	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;


	res.statusCode = 201;
	res.json({accountList});
})

router.post('/getHistory', (req, res) => {

	// {
	// 	userId:"",
	// 	bankAccountId:""
	// }
	var userId = req.body.userId;
	var bankAccountId = req.body.bankAccountId;

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;

	if (accountList.indexOf(bankAccountId) >= 0){
		res.statusCode = 200;
		//get list of transaction related to bankAccountId

		res.json({
			"relatedTransaction":transactionRepo.getRelatedTransaction(bankAccountId)
			})
	}
	else {
		res.statusCode = 500;
		res.json({
			msg:"User not found or not found bank account id in user"
		})
	}
})

router.post('/transferBalance', (req, res) => {
	// {
	// 	"userId":"",
	// 	"delAcc":"",
	// 	"recAcc":""
	// }
	var userId = req.body.userId;
	var delAcc = req.body.delAcc;
	var recAcc = req.body.recAcc;


	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;
	if (accountList.indexOf(delAcc) >= 0 && accountList.indexOf(recAcc) >= 0){
		var delRemain = accountRepo.getRemain(delAcc)  
		//thuc hien chuyen tien con lai
		if ( delRemain >= 50000){
			
			var transactionEntity = {
				"sendAcc": delAcc,
				"recAcc": recAcc,
				"message": "transfer balance for account deleted",
				"amount": delRemain
			}
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
				msg:"Your remain money is under 50000"
		})	
		}
	}
	else {
		res.statusCode = 500;
		res.json({
			msg:"Wrong bank account"
		})
	}


})

router.post('/deleteAccount', (req, res) => {
	// {
	// 	userId:"",
	// 	bankAccountId:""
	// }
	var userId = req.body.userId;
	var bankAccountId = req.body.bankAccountId;

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;

	if (accountList.indexOf(bankAccountId) >= 0){

		var event = userDB.get('user').find({ "userId": userId })
		.get("listAccount").remove( acc => acc == bankAccountId).write();

		if (event){
			res.statusCode = 200;

			res.json({
				"msg": "deleted"
				})
		}
		else {
			res.statusCode = 404;

			res.json({
				"msg": "cannot delete account"
				})
		}
	}
	else {
		res.statusCode = 500;
		res.json({
			msg:"User not found or not found bank account id in user"
		})
	}
})

module.exports = router;
