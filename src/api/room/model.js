const mongoose = require('mongoose')
const Seat = require('./model-seat').SeatSchema

const RoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seats: [Seat]
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