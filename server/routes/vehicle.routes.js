import RateLimit from 'express-rate-limit';

import checkVehicle from '../controllers/requestVehicle.server.controller';
import vehicleData from '../controllers/vehicleData.server.controller';
import getRecent from '../controllers/getRecent.server.controller';

const limiter = new RateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 30, // limit each IP to 100 requests per windowMs
  delayMs: 0, // disable delaying - full speed until the max limit is reached
});

export default function (app) {
  // Returns 4 most recent searches
  app.route('/api/getrecent').get(getRecent);

  // rate limiter, check if preiously searched, do Vehicle lookup
  app.route('/api/requestvehicle').post(limiter, checkVehicle, vehicleData);
}
