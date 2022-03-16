import * as types from '../constants';
const initialState = {};

const loginReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN.REQUEST:
      return {};
    case types.LOGIN.SUCCESS:
      return {};
    case types.LOGIN.FAILURE:
      return {};
    default:
      return state;
  }
};

export default loginReducers;
