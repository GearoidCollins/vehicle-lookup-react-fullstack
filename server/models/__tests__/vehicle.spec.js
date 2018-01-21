import mongoose from 'mongoose';
import test from 'ava';
import request from 'supertest';
import app from '../../../config/lib/app';
import Vehicle from '../vehicle.server.model';
import { connectDB, dropDB } from '../../utils/test-helpers';

import vehiclesMock from '../../../config/mocks/vehicles.mock';
// Initial vehicles added into test db
const vehicles = [new Vehicle(vehiclesMock[0]), new Vehicle(vehiclesMock[1])];

const startedApp = app.start();

test.beforeEach('connect and add two vehicle entries', (t) => {
  vehicles[0].save();
  vehicles[1].save();
  connectDB(t, () => {});
});

test.afterEach.always((t) => {
  dropDB(t, Vehicle);
});

test.serial('Should correctly give number of vehicles', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .get('/api/getrecent')
    .set('Accept', 'application/json');

  t.is(res.status, 200);
  t.is(res.body.length, vehicles.length);
});

test.serial('should return the correct vehicle', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'tk04kal' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  t.is(res.body.registration, vehicles[0].registration);
});

test.serial('should fetch thirdparty vehicle details', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'cy16rhu' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  t.is(res.body.registration, 'CY16RHU');
});

test.serial('should return error for unknown reg', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'kdnflks' })
    .set('Accept', 'application/json');

  t.is(res.status, 400);
  t.is(res.body.message, 'Invalid registration');
});

test.serial('should return error when not providing reg', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .set('Accept', 'application/json');

  t.is(res.status, 400);
  t.is(res.body.message, 'Invalid registration');
});

test.serial('should correctly add a vehicle', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'tk04kal' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedVehicle = await Vehicle.findOne({ registration: 'TK04KAL' }).exec();
  t.is(savedVehicle.model, 'A5 T Fsi Sport 6Sp');
});

test.serial('should correctly add a vehicle', async (t) => {
  t.plan(2);

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'BX14UFB' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedVehicle = await Vehicle.findOne({ registration: 'BX14UFB' }).exec();
  t.is(savedVehicle.model, 'Rs5 Fsi Quattro Auto');
});

test.serial('should fetch vehicle from db', async (t) => {
  t.plan(2);
  await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'tk04kal' })
    .set('Accept', 'application/json');

  const res = await request(startedApp)
    .post('/api/requestvehicle')
    .send({ registration: 'tk04kal' })
    .set('Accept', 'application/json');

  t.is(res.status, 200);

  const savedVehicle = await Vehicle.findOne({ registration: 'TK04KAL' }).exec();
  t.is(savedVehicle.model, 'A5 T Fsi Sport 6Sp');
});
