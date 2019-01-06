const { success, notFound } = require('../../services/response/')
const User = require('./model').model
const ObjectId = require('mongoose').Types.ObjectId;
const Seat = require('../room/model-seat').model
const Showing=require('../showing/model').model

const createReservation = async (req, res, next) => {
    const id = req.params.id
    const seats = req.params.seat
    const showing = req.params.showing

    let user = await User.findById(id).exec()
    if(user === null) return notFound(res)(user)

    const reservationId = ObjectId()

    // check if seat is not reserved

    const now = new Date()
    if(showing.date <= now.getTime())
        return res.status(400).json({errors: ['It is not possible to make a reservation for a past showing']});

    // TODO - test for pre-reserved

    try {
        user.reservations.push({
            _id: reservationId,
            showingId: showing,
            seat: seats,
        })
    } catch (e) {
        return res.status(400).end();
    }

    let show=await Showing.findById(showing).exec()
    show.reservations.push(reservationId)

    // Wersja asynchroniczna - 25ms
    // {
    //     Promise.all([
    //         car.save(),
    //         user.save()
    //     ]).then(result => result[0])
    //         .then(result => result.reservations.map(r => r.viewBy(user)))
    //         .then(success(res))
    //         .catch(next)
    // }

    // Wersja synchroniczna - 32 ms
    // Brakuje sprawdzenia poprawnosci w callbackach!
    {
        await user.save()
        await show.save()

        success(res)(user.reservations.map(r => r.view(true)))
    }

}

// show reservation
const showReservation = (req, res, next) => {
    User.findById(req.params.id)
        .populate('reservations.showing', '_id seat movieId')
        .then(notFound(res))
        .then((user) => user ? user.reservations.map(r => r.view(true)) : null)
        .then(success(res))
        .catch(next)
}

module.exports={
    createReservation, showReservation
}