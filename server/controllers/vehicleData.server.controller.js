import mongoose from 'mongoose';
import getVehicle from 'dvla-uk-vehicle-lookup';
import axios from 'axios';

import config from '../../config';
import { formatVrtme } from '../utils';

const Vehicle = mongoose.model('Vehicle');

/**
 * Gets Vehicle information then
 * gets VRT information and saves to DB
 * @param req
 * @param res
 * @returns void
 */
export default function (req, res) {
  const { body: { registration } } = req;

  // Vehicle DVLA lookup
  getVehicle(registration)
    .then(vehicle =>
      (config.API.vrtme.TOKEN
        ? // Vehicle VRT lookup
        axios({
          method: 'POST',
          url: config.API.vrtme.URL,
          headers: { access_token: config.API.vrtme.TOKEN },
          data: formatVrtme(vehicle),
        }).then(({ data: vrt }) => ({
          ...vehicle,
          vrt,
        }))
        : vehicle))
    // Save new Vehicle to DB
    .then(vehicle => new Vehicle(vehicle).save())
    // Return saved Vehicle
    .then(vehicle => res.json(vehicle))
    .catch(({ message }) => res.status(400).json({ message }));
}
