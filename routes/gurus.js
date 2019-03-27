var express = require('express');
var router = express.Router();
const models = require('../models')
const {checkAuth} = require('../middlewares/auth')

/* GET users listing. */
router.get('/',checkAuth, function(req, res, next) {
	const user = req.session.user
	models.Guru.findAll({include: [{model: models.Bidang}]}).then(gurus => {
		res.render('guru/index', {gurus: gurus, user: user})
	}).catch(err => {
		console.log(err)
		res.render('guru/index')
	})
});

router.get('/',checkAuth, function(req, res, next) {
	models.Bidang.findAll({include: [{model: models.Guru}]}).then(bidangs => {
	bidangs.forEach(bidang => {
		console.log(`Bidang: ${bidang.nama}`);
		console.log(`nama nya: ${bidang.Gurus.map(guru => guru.nama).join(', ')}`)
	}).then(bidangs => {
		res.render('guru/index', {gurus: gurus, user: user} )
	}).catch(err => {
		console.log(err)
		res.render('guru/index')
	})
})
});


router.get('/delete/:id',(req, res) => {
	const guruId = req.params.id
	models.Guru.findOne({
		where: {
			id: guruId
		}
	}).then(guru => {
		return guru.destroy()
	}).then(guru => {
		res.redirect('/gurus')
	}).catch(err => {
		console.log(err)
		res.redirect('/gurus')
	})
})

router.get('/create', checkAuth, (req, res) => {
	res.render('guru/create')
})

router.post('/create',(req, res) => {
	const {nama, alamat, pelajaran, kelas, bidangId} = req.body
	models.Guru.create({nama, alamat, pelajaran, kelas, bidangId}).then(guru => {
		res.redirect('/gurus')
	}).catch(err => {
		console.log(err)
		res.redirect('/gurus')
	})
})

router.get('/edit/:id', (req, res) => {
	const guruId = req.params.id
	models.Guru.findOne({
		where: {
			id: guruId
		}
	}).then(guru => {
		res.render('guru/edit',{guru: guru})
	}).catch(err => {
		console.log(err)
		res.redirect('/gurus')
	})
})

router.post('/edit/:id', (req, res) => {
	const guruId = req.params.id
	const {nama, alamat, pelajaran, kelas, bidangId} = req.body
	models.Guru.findOne({
		where: {
			id: guruId
		}
	}).then(guru => {
		guru.update({
			nama,
			alamat,
			pelajaran,
			kelas,
			bidangId
		})
	}).then(updatedGuru => {
		res.redirect('/gurus')
	}).catch(err => {
		console.log(err)
		res.redirect('/gurus')
	})
})
module.exports = router;
