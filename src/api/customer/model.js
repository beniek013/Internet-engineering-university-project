const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const ReservationSchema=new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    showing: {
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
            movie: this.movie,
            showing: this.showing
        }

        return full ? {
            ...view,
            seat: this.seat
        } : view
    }
}

const CustomerSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: {unique: true}
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
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

CustomerSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            email: this.email
        }

        return full ? {
            ...view,
            firstname: this.firstname,
            lastname: this.lastname,
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

const model = mongoose.model('Customer', CustomerSchema)

module.exports = {model, CustomerSchema}