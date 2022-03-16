import {api} from 'api';
import ApiConstants from '../ApiConstants';

export function applicationList(limit, start) {
  console.log(
    ApiConstants.APPLICATION_LIST + '/?_limit=' + limit + '&_start=' + start,
  );
  return api(
    ApiConstants.APPLICATION_LIST + '/?_limit=' + limit + '&_start=' + start,
    'get',
  );
}
