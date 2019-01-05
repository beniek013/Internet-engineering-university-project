const bcrypt = require('bcrypt')
const mongoose=require('mongoose')
const roles=['user', 'admin']
const Reservation=require('./model-reservations').ReservationSchema

const UserSchema=new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    born: {
        type: Date, // three arguments for year, month, day
        required: true
    },
    address: {
        type: String,
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
        required: true
    },
    reservations: {
        type: [Reservation]
    }
    // discount_type: {}
}, {
    timestamps: true
})

UserSchema.pre('save', function(next){
    if (!this.isModified('password')) return next()

    const rounds = 9

    bcrypt.hash(this.password, rounds).then((hash) => {
        this.password = hash
        next()
    }).catch(next)
})

UserSchema.methods = {
    view(full) {
        let view = {}
        let fields = ['id', 'name',]

        if (full) {
            fields = [...fields, 'role', 'email', 'reservations']
        }

        fields.forEach((field) => {
            view[field] = this[field]
        })

        return view
    },

    authenticate(password) {
        return bcrypt.compare(password, this.password).then((valid) => valid ? this : false)
    }
}

UserSchema.statics={roles}

const model = mongoose.model('User', UserSchema)

module.exports = {model, UserSchema}