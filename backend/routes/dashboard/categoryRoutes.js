const categoryControllers = require('../../controllers/dashboard/categoryControllers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const router = require('express').Router()

router.post('/category-add',authMiddleware, categoryControllers.add_category)

module.exports = router