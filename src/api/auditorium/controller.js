const { success, notFound } = require('../../services/response/')
const Auditorium=require('./model').model

// create new auditorium
const create = ({body}, res, next) =>
    Auditorium.create(body)
    .then((auditorium) => auditorium.view(true))
    .then(success(res, 201))
    .catch(next)

// show all (short)
const index = ({query}, res, next) =>
    Auditorium.find(query)
    .then((auditoriums) => auditoriums.map((auditorium) => auditorium.view()))
    .then(success(res))
    .catch(next)

// show one (detailed)
const show = ({params}, res, next) => 
    Auditorium.findById({_id: params.id})
    .then(notFound(res))
    .then((auditorium) => auditorium ? auditorium.view(true) : null)
    .then(success(res))
    .catch(next)

// update
const update = ({body, params}, res, next) =>
    Auditorium.findById({_id: params.id})
    .then(notFound(res))
    .then((auditorium) => auditorium ? Object.assign(auditorium, body).save() : null)
    .then((auditorium) => auditorium ? auditorium.view(true) : null)
    .then(success(res))
    .catch(next)

// update seats - WIP
const updateSeats = ({body, params, query}, res, next) =>
    Auditorium.findById({_id: params.id}).find(query)
    .then(notFound(res))
    .then((auditorium) => auditorium.seats ? Object.assign(auditorium.seats, body).save() : null)
    .then((auditorium) => auditorium ? auditorium.view(true) : null)
    .then(success(res))
    .catch(next)

// delete
const destroy = ({params}, res, next) =>
    Auditorium.findById({_id: params.id})
    .then(notFound(res))
    .then((auditorium) => auditorium ? auditorium.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index, show, update, updateSeats, destroy
}
    