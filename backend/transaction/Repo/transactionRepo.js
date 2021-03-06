var express = require('express')

var router = express.Router();
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');
const accountRepo = require('../../account/Repo/accountRepo')
const userRepo = require('../../user/Repo/authRepo')

const PENDING = 0;
const DONE = 1;


var nodemailer = require('nodemailer');

var otplib = require('otplib');
const secret = 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD'


exports.addTransaction = (transactionEntity, status) => {
	//db duoc xac dinh cung duong dan vs app.js
	var transactionAdapter = new fileSync('./data/transactionDB.json');
	var transactionDB = low(transactionAdapter);

	transactionEntity["status"] = status;
	transactionEntity["transactionId"] = shortid.generate();
	transactionDB.get('transaction').push(transactionEntity).write();
	return transactionEntity
}

exports.getRelatedTransaction =(bankAccountId) => {
	//list ra nhung transaction co tk gui va tk nhan la bankAccountId
	var transactionAdapter = new fileSync('./data/transactionDB.json');
	var transactionDB = low(transactionAdapter);
    var listRelatedTransaction = 
    	transactionDB.get('transaction').filter(
    		trans => (trans.sendAcc == bankAccountId || trans.recAcc == bankAccountId) && trans.status == DONE ).value();
    return listRelatedTransaction
}

exports.sendEmail = (sendAcc) => {
	var userEntity = userRepo.getEntityFromBankAccountId(sendAcc);

	var recEmail = userEntity.email; 

	const OTP = otplib.authenticator.generate(secret);
	 console.log(recEmail);
	console.log('check otp'+otplib.authenticator.check('123', secret));
	console.log('check otp'+otplib.authenticator.check(OTP, secret));


	var transporter = nodemailer.createTransport({
	  service: 'Gmail',
	  auth: {
	    user: 'quyquang97@gmail.com',
	    pass: 'quyquang@123'
	  }
	});

	var mailOptions = {
	  from: 'anonymous@gmail.com',
	  to: recEmail,
	  subject: 'OTP verified internet banking',
	  html: `<p>
	  	<div>Dear ${userEntity.name},</div>
	  	<div>You have selected ${userEntity.email} as your default email at internet banking verification page:</div>
	  	<strong><h1>${OTP}</h1></strong>
	  	<div>This code will expire 30 seconds after this email was sent</div>
	  </p>`
	};

	transporter.sendMail(mailOptions, function(error, info) {
	  if (error) {
	    console.log(error);
	    return null;
	  } else {
	    console.log('Email sent: ' + info.response);
	  }
	});
}

exports.checkOTP = (OTP) => {
	return otplib.authenticator.check(OTP, secret);
}

exports.getEntityFromTransactionId = (transactionId) => {
	var transactionAdapter = new fileSync('./data/transactionDB.json');
	var transactionDB = low(transactionAdapter);

	return entity = transactionDB.get('transaction').find({"transactionId":transactionId}).value();
}