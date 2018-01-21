import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import SearchForm from '../SearchForm';
import RecentSearches from '../RecentSearches';
import SearchResult from '../SearchResult';

import { getRecent } from '../SearchForm/SearchFormActions';

import styles from './home.scss';

const Home = ({
  loading, result, animateResult, vehicles, getRecentDis,
}) => (
  <div className="homeCon">
    <div className={styles.viewPort}>
      <SearchForm />
      <SearchResult loading={loading} animateResult={animateResult} vehicle={result} />
    </div>
    <div className={styles.recentSearchesCon}>
      <RecentSearches vehicles={vehicles} getRecentDis={getRecentDis} />
    </div>
  </div>
);

// Actions required to provide data for this component to render in sever side.
Home.need = [() => getRecent()];

Home.propTypes = {
  result: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  animateResult: PropTypes.bool.isRequired,
  vehicles: PropTypes.array.isRequired,
  getRecentDis: PropTypes.func.isRequired,
};

const mapStateToProps = ({ search }) => ({
  result: search.result,
  loading: search.loading,
  animateResult: search.animateResult,
  vehicles: search.recentSearches,
});

const mapDispatchToProps = dispatch => ({
  getRecentDis: () => dispatch(getRecent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
