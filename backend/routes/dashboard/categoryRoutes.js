const categoryControllers = require('../../controllers/dashboard/categoryControllers')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const { route } = require('../authRoutes')
const router = require('express').Router()

router.post('/category-add',authMiddleware, categoryControllers.add_category)
router.get('/category-get',authMiddleware, categoryControllers.get_category)
router.put('/category-update/:id',authMiddleware, categoryControllers.update_category)

module.exports = router