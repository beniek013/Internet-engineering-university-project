const mongoose = require('mongoose')
const { Schema } = require('mongoose')
//const Customer = require('../customer/model').model
//const index=require('../customer/controller').index

const SeatSchema = new mongoose.Schema({
    row: {
        type: Number,
        required: true
    },
    column: {
        type: Number,
        required: true
    },
}, {
        timestamps: true
    })

SeatSchema.methods = {
    view() {
        return {
            id: this._id,
            row: this.row,
            column: this.column
        }
    }
}

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seats: [SeatSchema]
}, {
        timestamps: true
    })

RoomSchema.methods = {
    view(full) {
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
            seats: this.seats.length
        }
    }
}

const model = mongoose.model('Room', RoomSchema)

module.exports = { model, RoomSchema }