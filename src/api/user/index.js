const bcrypt = require('bcrypt')
const { token, password } = require('../../services/passport')
const { Router } = require('express')
const { create, index, show, update, destroy, auth } = require('./controller')
const {createReservation, showReservation}=require('./controller-reservations')

const router = new Router()

router.get('/',
  token({required:true, roles:['admin']}),
  index)

router.get('/profile',
  token({required:true}),
  show)

router.post('/',
  create)

router.post('/auth',
  password(),
  auth)

router.put('/',
  token({required: true}),
  update)

router.delete('/:id',
  token({required: true, roles: ['admin']}),
  destroy)

router.get('/reservations/:id',
  token({required:true}),
  showReservation)

router.post('/reservations/:id/:seat/:showing',
  token({ required: true }),
  createReservation
)

module.exports = router
