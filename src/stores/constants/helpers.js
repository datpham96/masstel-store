const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

export const createRequestTypes = base => {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => (res[type] = `${base}_${type}`));
  return res;
};
