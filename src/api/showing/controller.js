const { success, notFound } = require('../../services/response')
const Showing=require('./model').model

// create new room
const create = ({body}, res, next) =>
    Showing.create(body)
    .then((showing) => showing.view(true))
    .then(success(res, 201))
    .catch(next)

// show all (short)
const index = ({query}, res, next) =>
    Showing.find(query)
    .then((showing) => showing.map((showing) => showing.view()))
    .then(success(res))
    .catch(next)

// update
const update = ({body, params}, res, next) =>
    Showing.findById({_id: params.id})
    .then(notFound(res))
    .then((showing) => showing ? Object.assign(showing, body).save() : null)
    .then((showing) => showing ? room.view(true) : null)
    .then(success(res))
    .catch(next)

// delete
const destroy = ({params}, res, next) =>
    Showing.findById({_id: params.id})
    .then(notFound(res))
    .then((showing) => showing ? showing.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index , update, destroy
}
    