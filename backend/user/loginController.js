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
router.post('/', (req, res) => {
	var userEntity = req.body;
	console.log(userEntity.password);
	console.log(typeof userEntity.password);

	var md5_pwd = md5(userEntity.password);
	console.log(JSON.stringify(md5_pwd))

	userEntity["status"] = OFFILINE;
	userEntity["driverId"] = shortid.generate();
	userEntity["password"] = md5_pwd;
	userEntity["currentLocation"] = "";
	driverDB.get('driver').push(userEntity).write();

	res.statusCode = 201;
	res.json({
		msg: 'received request'
	})
})

//dang nhap
router.post('/login', (req, res) => {
	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);

	var loginEntity = req.body;
	var md5_pwd = md5(loginEntity.password);
	var userEntity = userDB.get('user').find({ "username": loginEntity.username, "password": md5_pwd }).value();
	if (userEntity != undefined) {
		var acToken = authRepo.generationAccessToken(userEntity);
		var rfToken = authRepo.generateRefreshToken();
		authRepo.updateRefreshToken(userEntity.userId, rfToken)
		res.statusCode = 201
		res.json({
			auth: true,
			user: userEntity,
			access_token: acToken,
			refresh_token: rfToken
		})
	}
	else {
		res.statusCode = 401
		res.json({
			auth: false
		})
	}
})


router.post('/getAccessTokenFromRefreshToken', (req, res) => {
	var refreshTokenAdapter = new fileSync('./data/refreshTokenDB.json');
    var refreshTokenDB = low(refreshTokenAdapter);
	var refreshToken = req.body.refreshToken;
	// console.log(refreshToken);
	var driverId = refreshTokenDB.get('refreshTokenList').find({"refreshToken":refreshToken}).value().driverId;
	// console.log(driverId);

	if (driverId == undefined){
		res.statusCode = 403;
		res.json({
			msg: "uncorrect refreshToken"
		})
	}
	else{
		var userEntity = driverDB.get('driver').find({"driverId": driverId}).value();
		if (userEntity != undefined){
			res.statusCode = 200;
			var acToken = authRepo.generationAccessToken(userEntity);
			res.json({
				user: userEntity,
				access_token : acToken,
			})
		}
	}
	
})

module.exports = router;