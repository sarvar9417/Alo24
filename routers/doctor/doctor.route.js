const {Router} = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

router.post('/template/create', auth, (req, res) => {
    require('./templates').createandupdate(req, res)
})

router.post('/template/getall', auth, (req, res) => {
    require('./templates').getAll(req, res)
})

router.post('/template/createall', auth, (req, res) => {
    require('./templates').createall(req, res)
})

router.post('/template/delete', auth, (req, res) => {
    require('./templates').delete(req, res)
})

module.exports = router
