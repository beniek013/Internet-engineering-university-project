const { success, notFound } = require('../../services/response/')
const User=require('./model').model
const { sign } = require('../../services/jwt')

// show all (short) - WORKS
const index = ({query}, res, next) =>
    User.find(query)
    .then((user) => user.map((user) => user.view()))
    .then(success(res))
    .catch(next)

// show one (detailed) - WORKS w/ ?id=*
const show = ({query}, res, next) =>
    User.findById(query.id.match(/[a-z0-9]{24}/)[0])
    .then(notFound(res))
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

// create new customer - WORKS
const create = ({body}, res, next) =>
    User.create(body)
    .then((user) => user.view(true))
    .then(success(res, 201))
    .catch(next)

// authorize password - WORKS
const auth = (req, res, next) => {
    const { user } = req
    sign(user)
        .then((token) => ({token, user: user.view(true)}))
        .then(success(res, 201))
        .catch(next)
    }
    
// update - WORKS w/ ?id=*
const update = ({body, query}, res, next) =>
    User.findById(query.id.match(/[a-z0-9]{24}/)[0])
    .then(notFound(res))
    .then((user) => user ? Object.assign(user, body).save() : null)
    .then((user) => user ? user.view(true) : null)
    .then(success(res))
    .catch(next)

// delete - WORKS
const destroy = ({params}, res, next) =>
    User.findById({_id: params.id})
    .then(notFound(res))
    .then((user) => user ? user.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index, show, update, destroy, auth
}
    