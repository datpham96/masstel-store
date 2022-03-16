import {put} from 'redux-saga/effects';
import * as types from '../../constants';

export function* loginRequest() {
  try {
    yield put({
      type: types.LOGIN.REQUEST,
      data: [],
    });
  } catch (error) {}
}
