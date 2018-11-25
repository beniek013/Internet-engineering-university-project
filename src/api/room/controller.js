const { success, notFound } = require('../../services/response')
const Room=require('./model').model

// create new room
const create = ({body}, res, next) =>
    Room.create(body)
    .then((room) => room.view(true))
    .then(success(res, 201))
    .catch(next)

// show all (short)
const index = ({query}, res, next) =>
    Room.find(query)
    .then((room) => room.map((room) => room.view()))
    .then(success(res))
    .catch(next)

// show one (detailed)
const show = ({params}, res, next) => 
    Room.findById({_id: params.id})
    .then(notFound(res))
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

// update
const update = ({body, params}, res, next) =>
    Room.findById({_id: params.id})
    .then(notFound(res))
    .then((room) => room ? Object.assign(room, body).save() : null)
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

// update seats - WIP
const updateSeats = ({body, params, query}, res, next) =>
    Room.findById({_id: params.id}).find(query)
    .then(notFound(res))
    .then((room) => room.seats ? Object.assign(room.seats, body).save() : null)
    .then((room) => room ? room.view(true) : null)
    .then(success(res))
    .catch(next)

// delete
const destroy = ({params}, res, next) =>
    Room.findById({_id: params.id})
    .then(notFound(res))
    .then((room) => room ? room.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index, show, update, updateSeats, destroy
}
    