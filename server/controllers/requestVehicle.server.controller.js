import mongoose from 'mongoose';

import { cleanReg } from '../utils';

const Vehicle = mongoose.model('Vehicle');

/**
 * Checks for existing vehicle in the DB
 * @param req
 * @param res
 * @param next
 * @returns void
 */
export default function (req, res, next) {
  let { body: { registration } } = req;

  registration = cleanReg(registration);
  if (!registration) {
    return res.status(400).json({ message: 'Invalid registration' });
  }

  return Vehicle.findOne({ registration }, { __v: 0, lookupIPs: 0 })
    .exec()
    .then((vehicle) => {
      if (vehicle) {
        Object.assign(vehicle, { requestedAt: Date.now() }).save();
      }
      return vehicle;
    })
    .then(vehicle => (vehicle ? res.json(vehicle) : next()))
    .catch(({ message }) => res.status(400).json({ message }));
}
