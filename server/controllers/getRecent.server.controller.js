import mongoose from 'mongoose';

const Vehicle = mongoose.model('Vehicle');

/**
 * Returns most recently searched vehicles
 * @param req
 * @param res
 * @returns void
 */
export default (req, res) =>
  Vehicle.find({}, { __v: 0, lookupIPs: 0, _id: 0 })
    .sort('-requestedAt')
    .limit(8)
    .exec()
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json({ message: 'An error occurred', err }));
