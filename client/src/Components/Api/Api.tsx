/** @format */

import axios from "axios";

const lifeUrl = "https://hackathonconsumingkoraapi.onrender.com/api";

export const signup = async ({ name, email, password, genotype, bloodGroup }: any) => {
  return await axios
    .post(`https://codecrusaderslifecare.onrender.com/api/postUser`, {
      name,
      email,
      password,
      genotype,
      bloodGroup,
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
