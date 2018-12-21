var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')

exports.getRemain = (bankAccountId) => {
   	// {
	// "bankAccountId":
	// }
	//db cung duong dan vs app.js
	var bankAccountAdapter = new fileSync('./data/bankAccountDB.json');
	var bankAccountDB = low(bankAccountAdapter);

	console.log(bankAccountDB.get('bankAccountList').value());

	console.log(bankAccountId);
	var bankAccountRemainObj =
	 bankAccountDB.get('bankAccountList').find({ "bankAccountId": bankAccountId }).value();
	 console.log(bankAccountRemainObj)
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

