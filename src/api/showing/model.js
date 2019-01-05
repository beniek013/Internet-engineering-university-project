const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Showing = require('../showing/model').model
const index=require('../showing/controller').index

const ShowingSchema = new mongoose.Schema({
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    reservations:{
        type: [Schema.ObjectId],
        ref: 'Reservation'
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
        let view = {}
        let fields = ['date', 'movieId',]

        if (full) {
            fields = [...fields, 'reservations']
        }

        fields.forEach((field) => {
            view[field] = this[field]
        })

        return view
    }
}

const model = mongoose.model('Showing', ShowingSchema)

module.exports = { model, ShowingSchema }