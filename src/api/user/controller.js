const { success, notFound } = require('../../services/response/')
const User=require('./model').model
const { sign } = require('../../services/jwt')

// show all (short)
const index = ({query}, res, next) =>
    User.find(query)
    .then((user) => user.map((user) => user.view()))
    .then(success(res))
    .catch(next)

// show one (detailed)
const show = ({params}, res, next) =>
    User.findById({_id: params.id})
    .then(notFound(res))
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

// create new customer
const create = ({body}, res, next) =>
    User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch(next)

// authorize password
const auth = (req, res, next) => {
    const { user } = req
    sign(user)
        .then((token) => ({token, user: user.view(true)}))
        .then(success(res, 201))
        .catch(next)
    }
    
// update
const update = ({body, params}, res, next) =>
    User.findById({_id: params.id})
    .then(notFound(res))
    .then((user) => user ? Object.assign(customer, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

// delete
const destroy = ({params}, res, next) =>
    User.findById({_id: params.id})
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index, show, update, destroy, auth
}
    