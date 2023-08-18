import {
  PaginationDto,
  PaginationResponse,
  UserCreateDto,
  UserProfileResponse,
  UserUpdateDto,
  UserUpdateSelfDto,
  UserUpdateSelfPasswordDto,
} from 'shared';

import { $axios } from '../client';

export async function getSelf() {
  return await $axios.get<UserProfileResponse>('/users/self');
}

export async function updateSelf(data: UserUpdateSelfDto) {
  return await $axios.put<UserProfileResponse>('/users/self', data);
}

export async function updateSelfPassword(data: UserUpdateSelfPasswordDto) {
  return await $axios.put<UserProfileResponse>('/users/self/password', data);
}

export async function createOne(data: UserCreateDto) {
  return await $axios.post<UserProfileResponse>('/users/', data);
}

export async function getMany(data: PaginationDto) {
  return await $axios.get<PaginationResponse<UserProfileResponse>>(`/users/`, {
    params: data,
  });
}

export async function getOne(id: string) {
  return await $axios.get<UserProfileResponse>(`/users/${id}`);
}

export async function updateOne(id: string, data: UserUpdateDto) {
  return await $axios.put<UserProfileResponse>(`/users/${id}`, data);
}

export async function deleteOne(id: string) {
  return await $axios.delete<number>(`/users/${id}`);
}
