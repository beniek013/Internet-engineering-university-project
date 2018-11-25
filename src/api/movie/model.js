const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const ShowingSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
}, {
        timestapms: true
    })

ShowingSchema.methods = {
    view(full) {
        const view = {
            // simple view
            date: this.date,
            room: this.room // eventually room.name
        }
        return full ? {
            id: this._id,
            ...view,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const MovieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    duration: {
        type: Date,
        required: true
    },
    ageCategory: {
        type: Number,
        required: true
    },
    showings: [ShowingSchema]
}, {
        timestamps: true
    })

MovieSchema.methods = {
    view(full) {
        const view = {
            // simple view
            id: this._id,
            name: this.name,
            genre: this.genre
        }

        return full ? {
            ...view,
            duration: this.duration / 60000,
            ageCategory: this.ageCategory,
            showings: this.showings.map((show) => show.view(true)),
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        } : view
    }
}

const model = mongoose.model('Movie', MovieSchema)

module.exports = { model, MovieSchema }

/*var today = new Date().toLocaleDateString(undefined, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
})*/

/*this.duration.toLocaleTimeString('UTC', {
                hour: '2-digit',
                minute: '2-digit',
                timeZone: "UTC"
            }),*/