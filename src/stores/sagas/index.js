import {all, fork} from 'redux-saga/effects';
import {watchLoginRequest} from './login';

export default function* rootSaga() {
  yield all([fork(watchLoginRequest)]);
}
