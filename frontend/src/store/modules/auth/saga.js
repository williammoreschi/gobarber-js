import { takeLatest, call, put, all } from 'redux-saga/effects';

import { singInSuccess } from './actions';

import history from '~/services/history';
import api from '~/services/api';

export function* singIn({ payload }) {
  const { email, password } = payload;

  const response = yield call(api.post, 'sessions', {
    email,
    password,
  });

  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Usuário não é um prestador');
    return;
  }

  yield put(singInSuccess(token, user));

  history.push('/dashboard');
}

export default all([takeLatest('@auth/SING_IN_REQUEST', singIn)]);