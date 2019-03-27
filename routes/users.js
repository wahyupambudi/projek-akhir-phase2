var express = require('express');
var router = express.Router();
const models = require('../models')
const bcrypt = require('bcrypt');
const mysql = require('mysql2')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
})

//REGISTER
router.get('/regis', (req, res) =>{
	res.render('auth/regis')
})

const connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		database: 'db_smk',
	});

router.post('/regis', (req, res, err) => {
// const result = {username: req.body.username, password: req.body.password, createdAt: new Date(), updatedAt: new Date()}
	const result = {
		"username":req.body.username,
		"password" :bcrypt.hashSync(req.body.password, 10),
		"createdAt" : new Date(),
		"updatedAt" : new Date()
	}
	// 	connection.query('INSERT INTO Users SET ?',result,(err, result, fields) => {
	// 		if(err){
	// 			console.log(err);
	// 			res.send({
	// 				"gagal" : "terdapat error"
	// 			})
	// 		}
	// 	})
	if(result != null){
			connection.query(`INSERT INTO Users SET ?`,result)
			res.redirect('/users/login')
			// res.redirect('/auth/err')
		}else {
			// connection.query(`INSERT INTO Users SET ?`,result)
			// if(err) throw err;
			res.redirect('/auth/err')

		}
	});

//LOGIN
router.get('/login', (req, res) =>{
	res.render('auth/login')
})

router.post('/login', (req, res) => {
	const {username, password} = req.body
	models.User.findOne({
		where: {
			username: username
		}
	}).then(user => {
		if(user != null){
			const checkPassword = bcrypt.compareSync(password, user.password);
			if(checkPassword === true){
				req.session.user = {
					username: user.username
				}
				res.redirect('/gurus/')
			}else{
				res.redirect('/users/login')
			}
		}else{
			res.redirect('/users/login')
		}
	})
})

router.get('/logout', (req, res) => {
	// res.session.user = null
	req.session.destroy(function(err) {
		if(err){
			console.log(err)
		}else {
			res.redirect('/users/login')
		}
	})
})
module.exports = router;
