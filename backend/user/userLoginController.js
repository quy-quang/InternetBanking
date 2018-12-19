var express = require('express')

var router = express.Router();
var authRepo = require('./Repo/authRepo')
var md5 = require('md5')
var low = require('lowdb'),
	fileSync = require('lowdb/adapters/FileSync')
const shortid = require('shortid');


var userAdapter = new fileSync('./userDB.json');
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

router.post('/getAccessTokenFromRefreshToken', (req, res) => {
	var refreshTokenAdapter = new fileSync('./refreshTokenDB.json');
    var refreshTokenDB = low(refreshTokenAdapter);
	var refreshToken = req.body.refreshToken;
	// console.log(refreshToken);
	var userId = refreshTokenDB.get('refreshTokenList').find({"refreshToken":refreshToken}).value().userId;
	// console.log(userId);

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
