import mongoose from 'mongoose';
import { Mockgoose } from 'mockgoose';
import config from '../../config';

const mockgoose = new Mockgoose(mongoose);

export function connectDB(t, done) {
  mongoose.connect(config.db.uri, (err) => {
    if (err) t.fail('Unable to connect to test database');
    done();
  });
  // mockgoose.prepareStorage().then(() => {
  //   done(mongoose);
  //   mongoose.createConnecton(config.db.uri, (err) => {
  //     if (err) t.fail('Unable to connect to test database');
  //   });
  // });
}

export function dropDB(t, Model) {
  Model.remove({}, (err) => {
    if (err) t.fail('Unable to reset test database');
  });
}
