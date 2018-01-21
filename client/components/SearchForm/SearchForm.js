import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import HeaderText from './HeaderText';

import { postRegRequest, requestError } from './SearchFormActions';

import styles from './search-form.scss';

export class SearchFormWrap extends React.Component {
  sendRequest() {
    const { registration, props: { postReg, requestErrorDis } } = this;

    if (!registration.value) {
      return requestErrorDis('Please enter a valid UK vehicle registration.');
    }
    postReg({ registration: registration.value });
    registration.value = '';
  }

  render() {
    const { loading, error, registration = '' } = this.props;
    const errorOn = error ? styles.errorOn : '';

    return (
      <div className={styles.inputCon}>
        <HeaderText />
        <input
          defaultValue={registration}
          name="registration"
          placeholder="eg: TK04KAL"
          ref={(val) => {
            this.registration = val;
          }}
        />
        <button className={styles.buttonCon} onClick={this.sendRequest.bind(this)}>
          {loading ? <span className={styles.loader} /> : <span>Get</span>}
        </button>
        {<div className={`${styles.errorCon} ${errorOn}`}>{error}</div>}
      </div>
    );
  }
}

SearchFormWrap.propTypes = {
  loading: PropTypes.bool.isRequired,
  postReg: PropTypes.func.isRequired,
  requestErrorDis: PropTypes.func.isRequired,
  registration: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]).isRequired,
};

const mapDispatchToProps = dispatch => ({
  postReg: data => dispatch(postRegRequest(data)),
  requestErrorDis: error => dispatch(requestError(error)),
});

const mapStateToProps = ({ search }) => ({ ...search });

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormWrap);
