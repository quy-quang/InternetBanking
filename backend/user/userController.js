var express = require('express')
var request = require('request');
var router = express.Router();
var authRepo = require('./Repo/authRepo')
var accountRepo = require('../account/Repo/accountRepo')
var transactionRepo = require('../transaction/Repo/transactionRepo');
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const secretKey = '6Lf4L4YUAAAAAKXFwMsq_0AK4B_3ABuy9JDVTT_d';

var userAdapter = new fileSync('./data/userDB.json');
var userDB = low(userAdapter);

const NORMAL_USER = 1,
	EMPLOYER = 2

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

router.post('/verifyCaptcha', (req, res) => {
	var captchaToken = req.body.token;
	var remoteIp = req.connection.remoteAddress;
	if (
		captchaToken === undefined ||
		captchaToken === '' ||
		captchaToken === null
	) {
		return res.json({ "success": false, "msg": "No captcha" });
	}
	const verifyUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}&remoteip=${remoteIp}`;
	request(verifyUrl, (err, response, body) => {
		body = JSON.parse(body);
		console.log(body);
		// If Not Successful
		if (body.success !== undefined && !body.success) {
			res.statusCode = 401
			return res.json({ "success": false, "msg": "Failed captcha verification" });
		} else {
			res.statusCode = 200
			return res.json({"success": true, "msg":"Captcha passed"});
		}
	});
})
//dang nhap

router.post('/getAccountList', (req, res) => {
	// {
	// 	"userId":
	// }
	var userId = req.body.userId;


	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;


	res.statusCode = 201;
	res.json({ accountList });
})

router.post('/getAccountDetail', (req, res) => {
	// {
	// 	"userId":
	// 	bankAccountId:""
	// }
	var userId = req.body.userId;// bo sung them check account number in account id.=> done
	var bankAccountId = req.body.bankAccountId;


	var bankaccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankaccountAdapter);

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);

	var accountList = userDB.get('user').find({ "userId": userId }).value().listAccount;

	if (accountList.indexOf(bankAccountId) >= 0) {
		var AccountDetail = bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
		res.statusCode = 200;
		res.json({ AccountDetail });
	}
	else {
		res.statusCode = 500;
		res.json({
			msg: "User not found or not found bank account id in user"
		})
	}
})


router.post('/getAccountName', (req, res) => {
	//AccountId
	var accountNumber = req.body.accountNumber;

	var bankaccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankaccountAdapter);

	var AccountDetail = bankAccountDB.get('bankAccountList').find({ "bankAccountId": accountNumber }).value();
	if (AccountDetail == null) {
		res.statusCode = 204;
		res.json({ msg: "No Data" });
	} else {
		res.statusCode = 201;
		res.json({ accountName: AccountDetail.bankAccountName });
	}
})

router.post('/getContactName', (req, res) => {
	//userId
	//accountNumber
	var userId = req.body.userId;
	var accountNumber = req.body.accountNumber;

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);

	var user = userDB.get('user').find({ "userId": userId }).value();
	var contactList = user.contactList
	if (contactList === []) {
		res.statusCode = 204;
	} else {
		for (var i = 0; i < contactList.length; i++) {
			if (contactList[i].accountNumber === accountNumber) {
				res.statusCode = 201;
				res.json({ accountName: contactList[i].name });
			}
		}
	}
	res.statusCode = 204;
	res.json({
		msg: "No Data"
	})
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

	if (accountList.indexOf(bankAccountId) >= 0) {
		res.statusCode = 200;
		//get list of transaction related to bankAccountId

		res.json({
			"relatedTransaction": transactionRepo.getRelatedTransaction(bankAccountId)
		})
	}
	else {
		res.statusCode = 500;
		res.json({
			msg: "User not found or not found bank account id in user"
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
	if (accountList.indexOf(delAcc) >= 0 && accountList.indexOf(recAcc) >= 0) {
		var delRemain = accountRepo.getRemain(delAcc)
		//thuc hien chuyen tien con lai
		if (delRemain >= 50000) {

			var transactionEntity = {
				"sendAcc": delAcc,
				"recAcc": recAcc,
				"message": "transfer balance for account deleted",
				"amount": delRemain - 50000
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
			res.statusCode = 200;
			res.json({
				msg: "transfer finished"
			})
		}
	}
	else {
		res.statusCode = 500;
		res.json({
			msg: "Wrong bank account"
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

	if (accountList.indexOf(bankAccountId) >= 0) {

		var event = userDB.get('user').find({ "userId": userId })
			.get("listAccount").remove(acc => acc == bankAccountId).write();

		if (event) {
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
			msg: "User not found or not found bank account id in user"
		})
	}
})

router.post('/newContact', (req, res) => {
	//userId
	//contactName
	//accountNumber
	var userId = req.body.userId;
	var contactName = req.body.contactName;
	var accountNumber = req.body.accountNumber;

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);

	var contact = userDB.get('user').find({ "userId": userId }).get('contactList').find({ "accountNumber": accountNumber }).value();

	if (contact == null) {
		userDB.get('user').find({ "userId": userId }).get('contactList').push({
			name: contactName,
			accountNumber: accountNumber
		}).write()
	} else {
		userDB.get('user').find({ "userId": userId }).get('contactList').remove(contact => contact.accountNumber == accountNumber).write();
		userDB.get('user').find({ "userId": userId }).get('contactList').push({
			name: contactName,
			accountNumber: accountNumber
		}).write()
	}
	res.statusCode = 201;
	res.json({
		msg: "Save complete"
	})
})
router.post('/checkUsername', (req, res) => {
	var username = req.body.username;
	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);
	var user = userDB.get('user').find({ "username": username }).value();
	if(user == null) {
		res.statusCode = 200
		res.json({
			msg: "Accept"
		})
	} else {
		res.statusCode = 204
		res.json({
			msg: "username is already exist"
		})
	}
})
router.post('/createUser', (req, res) => {
	// {
	//      "username": "quyquang",
	//      "password": "xxx",
	//      "name": "Nguyen Phuoc Quy Quang",
	//      "email": "quyquang2421997@gmail.com",
	//    }

	var userEntity = req.body;

	var md5_pwd = md5(userEntity.password);

	userEntity["userId"] = shortid.generate();
	userEntity["password"] = md5_pwd;
	userEntity["type"] = NORMAL_USER;
	userEntity["listAccount"] = [];
	userEntity["contactList"] = [];
	userDB.get('user').push(userEntity).write();

	res.statusCode = 201;
	res.json({
		msg: 'user created'
	})
})

router.post('/createBankAccount', (req, res) => {
	// {
	// 	"username":
	//  "name"
	// }

	var username = req.body.username;
	var name =  req.body.name

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);


	//var name = userDB.get('user').find({ "username": username }).value().name;


	var newAccount = accountRepo.createAccount(name);
	userDB.get('user').find({ "username": username }).get('listAccount').push(newAccount).write();

	res.statusCode = 201;
	res.json({
		msg: "Account created",
		accountId: newAccount
	});

})
module.exports = router;
