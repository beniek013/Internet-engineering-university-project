const mongoose = require('mongoose')

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

const model = mongoose.model('Seat', SeatSchema)

module.exports = { model, SeatSchema }