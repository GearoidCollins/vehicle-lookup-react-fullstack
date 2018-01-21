import React from 'react';
import PropTypes from 'prop-types';

import VehicleItem from '../VehicleItem';

import styles from './recent-searches.scss';

export class RecentSearches extends React.Component {
  componentWillMount() {
    const { getRecentDis } = this.props;
    getRecentDis();
  }

  loopRecent(vehicles) {
    return (
      vehicles.length > 0 &&
      vehicles.map(vehicle => <VehicleItem {...vehicle} key={vehicle.registration} />)
    );
  }

  render() {
    const { vehicles } = this.props;
    return (
      <div className={styles.recentCon}>
        <h3>{vehicles.length > 0 ? 'Recent searches' : 'No recent lookups...'}</h3>
        {this.loopRecent(vehicles)}
      </div>
    );
  }
}

RecentSearches.propTypes = {
  vehicles: PropTypes.array.isRequired,
  getRecentDis: PropTypes.func.isRequired,
};

export default RecentSearches;
