const controller = require('../controllers/book')
const express = require('express')
const router = express.Router()

router.get('/', controller.List)
router.post('/', controller.Create)
router.put('/:id', controller.Update)
router.patch('/:id', controller.Update)
router.delete('/:id', controller.Delete)

module.exports = router