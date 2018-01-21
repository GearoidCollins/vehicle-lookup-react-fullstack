/**
 *Utility function to fetch required data for component to render in server side.
 *This was inspired from https://github.com/caljrimmer/isomorphic-redux-app/tree/master/src/common/api/fetchComponentDataBeforeRender.js
 */
import { promiseUtil as sequence } from './index';

export default function (store, components, params) {
  const needs = components.reduce((prev, current) => {
    return (current.need || [])
      .concat((current.WrappedComponent ? current.WrappedComponent.need : []) || [])
      .concat(prev);
  }, []);

  return sequence(needs, need => store.dispatch(need(params, store.getState())));
}
