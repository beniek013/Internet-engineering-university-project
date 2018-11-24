const { success, notFound } = require('../../services/response/')
const Movie=require('./model').model

// create new movie
const create = ({body}, res, next) =>
    Movie.create(body)
        .then((movie) => movie.view(true))
        .then(success(res, 201))
        .catch(next)

// show
const index = ({query}, res, next) =>
    Movie.find(query)
        .then((movies) => movies.map((movie) => movie.view()))
        .then(success(res))
        .catch(next)

// show subdoc? (detailed)
const show = ({params}, res, next) =>
    Movie.findById({_id: params.id})
        .then(notFound(res))
        .then((movie) => movie ? movie.view(true) : null)
        .then(success(res))
        .catch(next)

// update
const update = ({body, params}, res, next) =>
    Movie.findById({_id: params.id})
        .then(notFound(res))
        .then((movie) => movie ? Object.assign(movie, body).save() : null)
        .then((movie) => movie ? movie.view(true) : null)
        .then(success(res))
        .catch(next)

// delete
const destroy = ({params}, res, next) =>
    Movie.findById({_id: params.id})
        .then(notFound(res))
        .then((movie) => movie ? movie.remove() : null)
        .then(success(res, 204))
        .catch(next)


module.exports = {
    create, index, show, update, destroy
}
