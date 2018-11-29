const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const ReservationSchema=new mongoose.Schema({
    showingId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    seat: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
    timestamps: true
})

ReservationSchema.methods={
    view(full) {
        const view = {
            // simple view
            id: this._id,
            showingId: this.showingId
        }

        return full ? {
            ...view,
            seat: this.seat
        } : view
    }
}

const UserSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    born: {
        type: Date, // three arguments for year, month, day
        required: true
    },
    address: {
        type: String,
    },
    reservations: [ReservationSchema]
    // discount_type: {}
}, {
    timestamps: true
})

UserSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            email: this.email
        }

        return full ? {
            ...view,
            firstName: this.firstName,
            lastName: this.lastName,
            born: this.born,
            address: this.address,
            reservations: this.reservations.map((res) => res.view(true)),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : {
            ...view,
            reservations: this.reservations.length
        }
    }
}

const model = mongoose.model('User', UserSchema)

module.exports = {model, UserSchema}