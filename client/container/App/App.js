import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';

// Import Components
import DevTools from './DevTools';
import Footer from '../../components/common/Footer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMounted: false };
  }

  componentDidMount() {
    this.setState({ isMounted: true }); // eslint-disable-line
  }

  render() {
    return (
      <div>
        {this.state.isMounted &&
          !window.devToolsExtension &&
          process.env.NODE_ENV === 'development' && <DevTools />}
        <div>
          <Helmet
            title="UK registration vehicle lookup app"
            titleTemplate="%s - Find the cost of VRT for your vehicle"
            meta={[
              { charset: 'utf-8' },
              {
                'http-equiv': 'X-UA-Compatible',
                content: 'IE=edge',
              },
              {
                name: 'viewport',
                content: 'width=device-width, initial-scale=1',
              },
            ]}
          />
          <div>{this.props.children}</div>
          <Footer />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object.isRequired,
};

// Retrieve data from store as props
function mapStateToProps(store) {
  return store;
}

export default connect(mapStateToProps)(App);
