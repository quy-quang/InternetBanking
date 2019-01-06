var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')

const shortid = require('shortid');
const UniqueNumber = require('unique-number')
var uniqueNumber = new UniqueNumber(true);

exports.getRemain = (bankAccountId) => {
   	// {
	// "bankAccountId":
	// }
	//db cung duong dan vs app.js
	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);

	// console.log(bankAccountDB.get('bankAccountList').value());

	// console.log(bankAccountId);
	var bankAccountRemainObj =
	 bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
	 // console.log(bankAccountRemainObj)
	var bankAccountRemain = bankAccountRemainObj.remain;

	return bankAccountRemain
}

exports.addRemain = (bankAccountId, amount) => {

	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);
	var oldRemain = bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).get("remain").value();
	var newRemain = oldRemain + amount;

	bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).set("remain",newRemain).write();
}

exports.createAccount = (bankAccountName) => {
	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);

	var bankAccount={};
	bankAccount["bankAccountId"] = uniqueNumber.generate()+'';
	bankAccount["remain"] = 0;
	bankAccount["bankAccountName"] = bankAccountName;
	bankAccountDB.get('bankAccountList').push(bankAccount).write();

	return bankAccount["bankAccountId"];
}


exports.getAccEntityFromBankAccountId = (bankAccountId) => {
	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);

	// console.log(bankAccountDB.get('bankAccountList').value());

	// console.log(bankAccountId);
	var bankAccountObj =
	 bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
	 // console.log(bankAccountRemainObj)
	// var bankAccountRemain = bankAccountRemainObj.remain;

	return bankAccountObj
}
