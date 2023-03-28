/** @format */

import axios from "axios";
import { useAppSelector } from "../Global/Store";



const lifeUrl = "https://codecrusaderslifecare.onrender.com/api";

const localHost = ""

export const signup = async ({ name, email, password, genotype, bloodGroup }: any) => {
  return await axios
    // .post(`${lifeUrl}/postUser`, {
    .post(`https://codecrusaderslifecare.onrender.com/api/postUser`, {
      name,
      email,
      password,
      genotype,
      bloodGroup
    })
  .then((res) =>{
    return res.data
  });
};

export const createSpecialist = async ({name, email, password, lience, profession}: any) => {
  return await axios 
  .post (`https://codecrusaderslifecare.onrender.com/api/createspecialist`,
    {
      name,
      email,
      password,
      lience,
      profession
  }
  ).then((res) => {
    return res.data
  })
}



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

export const GetOneSpecialist = async (id: any) => {
  return await axios
    .get(`${lifeUrl}/getonespecialist/${id}`)
    .then((res) => res.data);
};


export const sendToSpecialist = async({ amount, accountNumber}: any, id : any) => {
  return await axios 
  .patch(`${lifeUrl}/sendtospecialist/${id}`, {
    amount,
    accountNumber
  }).then((res) => res.data);
}

export const sendToHospital = async (id: any) => {
  return await axios
  .patch(`.${lifeUrl}/sendtohospital/${id}/${id}`).then((res) => res.data);
}

export const sendToOtherWallet = async (id: any) => {
  return await axios
  .patch(`${lifeUrl}/transfer/${id}`).then((res) => res.data)
}

export const fundFromBank = async (id : any) => {
  return await axios
  .post (`${lifeUrl}/fundwallet/${id}`).then((res) => res.data)
}

export const bookAppointment = async (id: any) => {
  // const getUserAppoint = useAppSelector((state) => state?.currentUser);

// const getSpecialistAppoint = useAppSelector((state) => state?.consultUser);
  return await axios
  .post (`${lifeUrl}/bookappointment/${id}/${id}`).then((res) => res.data)
}
