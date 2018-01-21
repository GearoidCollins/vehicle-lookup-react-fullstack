import React from 'react';
import PropTypes from 'prop-types';

import VehicleItem from '../VehicleItem';

import styles from './search-result.scss';

const SearchResult = ({ vehicle, loading, animateResult }) => {
  const fadeIn = !animateResult && !loading && vehicle.registration ? styles.open : '';
  return (
    <div className={`${styles.searchResult} ${fadeIn}`}>
      {vehicle.registration && <VehicleItem {...vehicle} />}
    </div>
  );
};

SearchResult.propTypes = {
  vehicle: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  animateResult: PropTypes.bool.isRequired,
};

export default SearchResult;
