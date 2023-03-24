/** @format */

import axios from "axios";

const lifeUrl = "https://hackathonconsumingkoraapi.onrender.com/api";

export const signup = async ({ name, email, password, userName }: any) => {
  return await axios
    .post(`${lifeUrl}/postUser`, {
      name,
      email,
      password,
    })
    .then((res) => {
      return res.data;
    });
};

export const signin = async ({ email }: any) => {
  return await axios
    .post(`${lifeUrl}/login`, {
      email,
    })
    .then((res) => {
      return res.data;
    });
};

export const GetOneUser = async (id: any) => {
  return await axios
    .get(`${lifeUrl}/getoneuser/${id}/`)
    .then((res) => res.data);
};
