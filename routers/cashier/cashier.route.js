const {Router} = require('express')
const router = Router()
const auth = require('../../middleware/auth.middleware')

router.post('/offline/payment', auth, (req, res) => {
    require('./offlinepayment.route').payment(req, res)
})

router.post('/offline/getall', auth, (req, res) => {
    require('./offlinepayment.route').getAll(req, res)
})

module.exports = router
