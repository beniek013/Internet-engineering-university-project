const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const ReservationSchema=new Schema({
    showingId: {
        type: Schema.ObjectId,
        ref: 'Showing',
        required: true
    },
    seat: {
        type: Schema.ObjectId,
        ref: 'Seat',
        required: true
    }
}, {
    timestamps: true
})

ReservationSchema.methods={
    view(full) {
        const view = {
            id: this._id,
            showingId: this.showingId
        }

        return full ? {
            ...view,
            seat: this.seat
        } : view
    }
}

const model = mongoose.model('Reservations', ReservationSchema)

module.exports = {model, ReservationSchema}