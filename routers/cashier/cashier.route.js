const {Router} = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

router.post('/offline/payment', auth, (req, res) => {
    require('./offlinepayment.route').payment(req, res)
})

router.post('/offline/getall', auth, (req, res) => {
    require('./offlinepayment.route').getAll(req, res)
})

router.post('/statsionar/getall', auth, (req, res) => {
    require('./statsionarpayment.route').getAll(req, res)
})

router.post('/statsionar/payment', auth, (req, res) => {
    require('./statsionarpayment.route').payment(req, res)
})

router.post('/statsionar/prepayment', auth, (req, res) => {
    require('./statsionarpayment.route').prepayment(req, res)
})

router.post('/statsionar/updateservices', auth, (req, res) => {
    require('./statsionarpayment.route').updateservices(req, res)
})

module.exports = router
