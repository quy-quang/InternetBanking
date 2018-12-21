var express = require('express')

var router = express.Router();
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const accountRepo = require('../../account/Repo/accountRepo')

exports.addTransaction = (transactionEntity) => {
	//db duoc xac dinh cung duong dan vs app.js
	var transactionAdapter = new fileSync('./data/transactionDB.json');
	var transactionDB = low(transactionAdapter);
	transactionEntity["transactionId"] = shortid.generate();
	transactionDB.get('transaction').push(transactionEntity).write();
}