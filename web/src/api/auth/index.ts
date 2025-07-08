/** @format */

import api from "../interceptor";

export interface LoginPayload {
  email: string;
  password: string;
}
export interface CreateGuestInterface {
  email?: string;
  phone?: string;
  address?: string;
  name?: string;
  productId: number;
  quantity: number;
}
export interface BaseInfoUser {
  phone?: string;
  name?: string;
  address?: string;
}
export interface RegisterPayload {}

const authApi = {
  login: async (data: LoginPayload) => {
    return await api({
      method: "POST",
      url: "/auth/login",
      data,
    });
  },
  createGuestUser: async (data: CreateGuestInterface) => {
    return await api({
      method: "POST",
      url: "/auth/userInfoGuest",
      data: data,
    });
  },
  getUserInfoByID: async (userID: number) => {
    return await api({
      method: "GET",
      url: `/auth/${userID}`,
    });
  },
  updateUserProfile: async (userID: number, data: BaseInfoUser) => {
    return await api({
      method: "Patch",
      url: `/auth/updateProfile/${userID}`,
      data: data,
    });
  },
};

export default authApi;
