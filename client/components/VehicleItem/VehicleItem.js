import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import styles from './vehicle-item.scss';

const display = {
  dvla: [
    'motStatus',
    'roadTaxStatus',
    'colour',
    'fuelType',
    'engineSize',
    'brakeHorsePower',
    'registrationDate',
    'manufacturedYear',
    'roadTax12Months',
  ],
  vrt: ['title', 'vrt_rate'],
  irishRoadTax: ['three_months', 'six_months', 'one_year'],
};

/**
 * Temporary to spit out data
 * @param {Object} items
 * @returns {Array} filtered items by key
 */
const toDisplay = (items, match) =>
  Object.keys(items).reduce(
    (passed, key) =>
      (match.indexOf(key) !== -1
        ? [
          ...passed,
          <li key={key}>
            <b>{_.capitalize(_.lowerCase(key))}:</b> {items[key]}
          </li>,
        ]
        : passed),
    [],
  );

const loadVrtDetails = vrt =>
  vrt && (
    <div className="listCon">
      <h4>VRT:</h4>
      <ul>
        {toDisplay(vrt, display.vrt)}
        {toDisplay(vrt.road_tax, display.irishRoadTax)}
      </ul>
    </div>
  );

const VehicleItem = (props) => {
  const {
    manufacturer, registration, model, vrt = {},
  } = props;

  return (
    <div className={styles.vehicleBlockCon}>
      <div className="titleCon">
        <div className={styles.registration}>{registration}</div>
        <h6>
          {manufacturer} - {model}
        </h6>
      </div>
      <div className="listCon">
        <h4>DVLA:</h4>
        <ul>{toDisplay(props, display.dvla)}</ul>
      </div>
      {loadVrtDetails(vrt)}
    </div>
  );
};

VehicleItem.propTypes = {
  createdAt: PropTypes.string.isRequired,
  registration: PropTypes.string.isRequired,
  manufacturer: PropTypes.string.isRequired,
  exported: PropTypes.string.isRequired,
  motStatus: PropTypes.string.isRequired,
  roadTaxStatus: PropTypes.string.isRequired,
  model: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
  vehicleType: PropTypes.string.isRequired,
  fuelType: PropTypes.string.isRequired,
  engineSize: PropTypes.string.isRequired,
  brakeHorsePower: PropTypes.string.isRequired,
  registrationDate: PropTypes.string.isRequired,
  manufacturedYear: PropTypes.string.isRequired,
  roadTax12Months: PropTypes.string.isRequired,
  roadTax6Months: PropTypes.string.isRequired,
  coOutput: PropTypes.string.isRequired,
  vrt: PropTypes.shape({
    title: PropTypes.string.isRequired,
    vrt_rate: PropTypes.number.isRequired,
    km_excess_adj: PropTypes.number.isRequired,
    co2: PropTypes.string.isRequired,
    road_tax: PropTypes.shape({
      three_months: PropTypes.number.isRequired,
      six_months: PropTypes.number.isRequired,
      one_year: PropTypes.number.isRequired,
    }),
  }),
};

VehicleItem.defaultProps = {
  vrt: null,
};

export default VehicleItem;
