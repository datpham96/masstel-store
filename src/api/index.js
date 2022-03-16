import ApiConstants from './ApiConstants';
import axios from 'axios';
import statusCode from 'src/config/errors/statusCodes';

const TIME_OUT = 60000;

export function api(path, method, params = {}) {
  let options;
  options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    timeout: TIME_OUT,
    method: method,
    data: params,
  };
  return axios(ApiConstants.BASE_URL + path, options)
    .then(json => {
      return json.data;
    })
    .catch(async error => {
      if (
        error.response.status === statusCode.CODE_500 ||
        error?.response?.status === statusCode.CODE_429
      ) {
        console.log('lỗi 500 hoặc 429');
        return {
          data: null,
        };
      }
      return Promise.reject(error);
    });
}
