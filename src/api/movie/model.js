const mongoose=require('mongoose')
const {Schema} = require('mongoose')

const MovieSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    ageCategory: {
        type: String,
        required: true
    },
    isDisplay: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

MovieSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            name: this.name,
            species: this.species
        }

        return full ? {
            ...view,
            duration: this.duration,
            ageCategory: this.ageCategory,
            isDisplay: this.isDisplay,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Movie', MovieSchema)

module.exports = {model, MovieSchema}