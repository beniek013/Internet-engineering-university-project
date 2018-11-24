const { success, notFound } = require('../../services/response/')
const Customer=require('./model').model

// create new customer
const create = ({body}, res, next) =>
    Customer.create(body)
    .then((customer) => customer.view(true))
    .then(success(res, 201))
    .catch(next)

// show all (short)
const index = ({query}, res, next) =>
    Customer.find(query)
    .then((customers) => customers.map((customer) => customer.view()))
    .then(success(res))
    .catch(next)

// show one (detailed)
const show = ({params}, res, next) => 
    Customer.findById({_id: params.id})
    .then(notFound(res))
    .then((customer) => customer ? customer.view(true) : null)
    .then(success(res))
    .catch(next)

// update
const update = ({body, params}, res, next) =>
    Customer.findById({_id: params.id})
    .then(notFound(res))
    .then((customer) => customer ? Object.assign(customer, body).save() : null)
    .then((customer) => customer ? customer.view(true) : null)
    .then(success(res))
    .catch(next)

// delete
const destroy = ({params}, res, next) =>
    Customer.findById({_id: params.id})
    .then(notFound(res))
    .then((customer) => customer ? customer.remove() : null)
    .then(success(res, 204))
    .catch(next)


module.exports = {
    create, index, show, update, destroy
}
    