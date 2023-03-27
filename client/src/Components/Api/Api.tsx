/** @format */

import axios from "axios";

const lifeUrl = "https://hackathonconsumingkoraapi.onrender.com/api";

const localHost = "http://localhost/2001"

export const signup = async ({ name, email, password, userName }: any) => {
  return await axios
    .post(`${localHost}/postUser`, {
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
    .post(`${localHost}/login`, {
      email,
    })
    .then((res) => {
      return res.data;
    });
};

export const GetOneUser = async (id: any) => {
  return await axios
    .get(`${localHost}/getoneuser/${id}/`)
    .then((res) => res.data);
};


export const sendToSpecialist = async(id: any) => {
  return await axios 
  .patch(`${localHost}/sendtospecialist/${id}/${id}`).then((res) => res.data);
}
