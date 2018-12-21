var express = require('express')

var router = express.Router();
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync'),
	moment = require('moment');
const shortid = require('shortid');

const accountRepo = require('./Repo/accountRepo')

router.post('/getAccountInformation', (req, res) => {
	// {
	// "bankAccountId":
	// }
	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);
	var bankAccountId = req.body.bankAccountId;

	var bankAccountInfo =
	 bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
	
	res.statusCode = 200;
	res.json({bankAccountInfo});
})

router.post('/getRemain', (req, res)=> {
	// {
	// "bankAccountId":
	// }
	var bankAccountRemain =
	 accountRepo.getRemain(bankAccountId);
	
	res.statusCode = 200;
	res.json({bankAccountRemain});

})

module.exports = router;
