const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const AuditoriumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    seats: [{
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
    }]
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
            name: this.name,
            seats: this.seats.length,
            reserved: count
        }

        return full ? {
            ...view,
            seats: this.seats,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

//const SeatModel = mongoose.model('Seat', SeatSchema)
const model = mongoose.model('Auditorium', AuditoriumSchema)

module.exports = { model, AuditoriumSchema }