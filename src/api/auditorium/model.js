const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const Customer = require('../customer/model').model
const index=require('../customer/controller').index

const SeatSchema = new mongoose.Schema({
    row: {
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required: true
    },
    reserver: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }
}, {
        timestamps: true
    })

SeatSchema.methods = {
    view(name) {
        const view={
            id: this._id,
            row: this.row,
            column: this.column
        }
        return name?
        // w/ name
        {
            ...view,
            reserver: "WIP"//index().map((customer) => customer._id===this.reserver?customer.view():null)
        }:
        {
            ...view,
            reserver: this.reserver
        }
    }
}

const AuditoriumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seats: [SeatSchema]
}, {
        timestamps: true
    })

AuditoriumSchema.methods = {
    view(full) {
        let count = 0, i = this.seats.length
        while (i--) {
            if (this.seats[i].reserver != null)
                count++;
        }
        const view = {
            // simple view
            id: this._id,
            name: this.name
        }

        return full ? {
            ...view,
            seats: this.seats.map((seat) => seat.view()),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : {
            ...view,
            seats: this.seats.length,
            reserved: count
        }
    }
}

//const SeatModel = mongoose.model('Seat', SeatSchema)
const model = mongoose.model('Auditorium', AuditoriumSchema)

module.exports = { model, AuditoriumSchema }