import {api} from 'api';
import ApiConstants from '../ApiConstants';

export function applicationList() {
  return api(ApiConstants.APPLICATION_LIST, 'post');
}

export function applicationDetail(app_id) {
  let bodyData = {
    app_id: app_id,
  };
  return api(ApiConstants.APPLICATION_DETAIL, 'post', bodyData);
}
