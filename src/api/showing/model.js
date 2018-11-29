const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Showing = require('../showing/model').model
const index=require('../showing/controller').index

const ShowingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
},
    {
        timestamps: true
    })

ShowingSchema.methods = {
    view(full) {
        const view = {
            id: this._id,
            movieId: this.movieId,
            column: this.date
        }
        return full ? {
            id: this._id,
            ...view,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Showing', ShowingSchema)

module.exports = { model, ShowingSchema }