const { Router } = require('express')
const { create, index, update, destroy } = require('./controller')

const router = new Router()

router.post('/',
  create)

router.get('/',
  index)

router.put('/:id',
  update)

router.delete('/:id',
  destroy)

module.exports = router
