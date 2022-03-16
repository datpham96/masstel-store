import {takeLatest} from 'redux-saga/effects';
import * as types from '../../constants';
import {loginRequest} from './loginSagas';

export function* watchLoginRequest() {
  yield takeLatest(types.LOGIN.REQUEST, loginRequest);
}
