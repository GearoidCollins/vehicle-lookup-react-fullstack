import mongoose, { Schema } from 'mongoose';

const VehicleSchema = new Schema(
  {
    lookupIPs: [
      {
        type: String,
        trim: true,
      },
    ],
    registration: {
      type: String,
      trim: true,
      max: 10,
      required: 'Registration is required',
      unique: true,
      uppercase: true,
    },
    manufacturer: {
      type: String,
      trim: true,
    },
    exported: {
      type: String,
      trim: true,
    },
    motStatus: {
      type: String,
      trim: true,
    },
    roadTaxStatus: {
      type: String,
      trim: true,
    },
    model: {
      type: String,
      trim: true,
    },
    colour: {
      type: String,
      trim: true,
    },
    vehicleType: {
      type: String,
      trim: true,
    },
    fuelType: {
      type: String,
      trim: true,
    },
    engineSize: {
      type: String,
      trim: true,
    },
    brakeHorsePower: {
      type: String,
      trim: true,
    },
    registrationDate: {
      type: String,
      trim: true,
    },
    manufacturedYear: {
      type: String,
      trim: true,
    },
    roadTax12Months: {
      type: String,
      trim: true,
    },
    roadTax6Months: {
      type: String,
      trim: true,
    },
    coOutput: {
      type: String,
      trim: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
    },
    vrt: {
      title: {
        type: String,
        trim: true,
      },
      vrt_rate: {
        type: Number,
      },
      km_excess_adj: {
        type: Number,
      },
      co2: {
        type: String,
        trim: true,
      },
      road_tax: {
        three_months: {
          type: Number,
        },
        six_months: {
          type: Number,
        },
        one_year: {
          type: Number,
        },
      },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model('Vehicle', VehicleSchema);
