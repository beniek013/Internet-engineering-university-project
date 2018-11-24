const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const CustomerSchema=new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
        index: {unique: true}
    }
    // discount_type: {}
}, {
    timestamps: true
})

CustomerSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            firstname: this.firstname,
            lastname: this.lastname
        }

        return full ? {
            ...view,
            born: this.born,
            address: this.address,
            email: this.email,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Customer', CustomerSchema)

module.exports = {model, CustomerSchema}