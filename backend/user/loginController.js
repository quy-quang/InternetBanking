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
		res.statusCode = 200
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


router.post('/getAccessTokenFromRefreshToken', (req, res) => {

	var userAdapter = new fileSync('./data/userDB.json');
	var userDB = low(userAdapter);

	var refreshTokenAdapter = new fileSync('./data/refreshTokenDB.json');
    var refreshTokenDB = low(refreshTokenAdapter);
	var refreshToken = req.body.refreshToken;

	var userId = refreshTokenDB.get('refreshTokenList').find({"refreshToken":refreshToken}).value().userId;

	if (userId == undefined){
		res.statusCode = 403;
		res.json({
			msg: "uncorrect refreshToken"
		})
	}
	else{
		var userEntity = userDB.get('user').find({"userId": userId}).value();
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
