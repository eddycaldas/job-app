import { AsyncStorage } from 'react-native';
import { Facebook } from 'expo';

import  { FACEBOOK_LOGIN_SUCESS, FACEBOOK_LOGIN_FAIL } from './types';

//How to use AsyncStorage:
//AsyncStorage.setItem('fb_token', token);
//AsyncStorage.getItem('fb_token');

export const facebookLogin = () => async dispatch => {
  let token = await AsyncStorage.getItem('fb_token');
  
  if (token) {
    //ispatch an action daying FB login is done 
    dispatch({ type: FACEBOOK_LOGIN_SUCESS, payload: token })
  } else {
    //Start up FB login process
    doFacebookLogin(dispatch);
  }
};

const doFacebookLogin = async dispatch => {
  let { type, token } = await Facebook.logInWithReadPermissionsAsync('159210618154834', {
    permissions: ['public_profile']
  });
  if (type === 'cancel') {
    return dispatch({ type: FACEBOOK_LOGIN_FAIL })
  }
  await AsyncStorage.setItem('fb_token', token);
  dispatch({ type: FACEBOOK_LOGIN_SUCESS, payload: token });
};