const { Router } = require('express')
const { create, index, show, update, updateSeats, destroy } = require('./controller')

const router = new Router()

router.post('/',
  create)

router.get('/',
  index)

router.get('/:id',
  show)

router.put('/:id',
  update)

router.put('/:id',
  updateSeats) // WIP

router.delete('/:id',
  destroy)

module.exports = router
