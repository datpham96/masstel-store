import * as React from 'react';

export const isReadyRef = React.createRef();
export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}
// export function navigateAuth(name, params, isLogin) {
//   if (isLogin) {
//     navigationRef.current?.navigate(name, params);
//   } else {
//     navigationRef.current?.navigate('login');
//   }
// }

export function goBack() {
  if (isReadyRef.current && navigationRef.current) {
    navigationRef.current?.goBack();
  }
}
