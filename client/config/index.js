export default {
  BASE_URL:
    typeof window === 'undefined' || process.env.NODE_ENV === 'test'
      ? process.env.BASE_URL || `http://localhost:${process.env.PORT || 8000}`
      : '',
  API: {
    POST_REG: '/api/requestvehicle',
    GET_RECENT: '/api/getrecent',
  },
};
