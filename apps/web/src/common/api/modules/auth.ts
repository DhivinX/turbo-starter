import { AuthLoginDto, AuthLoginResponse } from 'shared';
import { $axios } from '../client';

export async function login(authLoginDto: AuthLoginDto) {
  return await $axios.post<AuthLoginResponse>('/auth/login', authLoginDto);
}

export async function logout() {
  return await $axios.post<void>('/auth/logout');
}
