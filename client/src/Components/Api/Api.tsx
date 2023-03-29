/** @format */

import axios from "axios";
import { useAppSelector } from "../Global/Store";

import { UserData } from "../interface/interface";

// const userOne = useAppSelector((state) => state?.currentUser);

interface iData {
  name:string, amount:number, number:string, cvv:string, expiry_month:string, expiry_year:string
}


const lifeUrl = "https://codecrusaderslifecare.onrender.com/api";

const localHost = ""

export const signup = async ({ name, email, password, genotype, bloodGroup }: any) => {
  return await axios
    .post(`${lifeUrl}/postUser`, 
    // {
    // .post(`https://codecrusaderslifecare.onrender.com/api/postUser`, 
    // .post(`http://localhost:2001/api/postUser`, 
    {
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
  .post (`${lifeUrl}/createspecialist`,
  // .post (`http://localhost:2001/api/createspecialist`,
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
    .post(`${lifeUrl}/login`, 
    // .post(`http://localhost:2001/api/login`, 
    {
      email,
    })
    .then((res) => {
      return res.data;
    });
};

export const GetOneUser = async (id: any) => {
  return await axios
    .get(`${lifeUrl}/getoneuser/${id}/`)
    // .get(`http://localhost:2001/api/getoneuser/${id}/`)
    .then((res) => res.data);
};

export const GetOneSpecialist = async (id: any) => {
  return await axios
    .get(`${lifeUrl}/getonespecialist/${id}`)
    // .get(`http://localhost:2001/api/getonespecialist/${id}`)
    .then((res) => res.data);
};


export const sendToSpecialist = async({ amount, accountNumber}: any, id : any) => {
  return await axios 
  .patch(`${lifeUrl}/sendtospecialist/${id}`, 
  // .patch(`http://localhost:2001/api/sendtospecialist/${id}`, 
  {
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
  // .patch(`http://localhost:2001/api/transfer/${id}`).then((res) => res.data)
}

export const fundFromBank = async ({ amount, number, cvv, expiry_month, expiry_year} : iData , id:string) => {
  return await axios
  .post (`${lifeUrl}/fundWallet/${id}`,
  // .post (`http://localhost:2001/api/fundwallet/${id}`, 
  {
    cvv,
    amount, 
    number,
    expiry_month,
    expiry_year,
    id,
  })
  .then((res) => {
    return res.data
  })
}

export const payTobank = async ({amount}: any, id: any) => {
  return await axios
  
  // .post (`http://localhost:2001/payout/`,
  .post(`${lifeUrl}/payout/${id}`,
  {
    amount
  }).then((res) => res.data)

}


export const bookAppointment = async (id: any) => {
  // const getUserAppoint = useAppSelector((state) => state?.currentUser);

// const getSpecialistAppoint = useAppSelector((state) => state?.consultUser);
  return await axios
  .post (`${lifeUrl}/bookappointment/${id}/${id}`).then((res) => res.data)
  // .post (`http://localhost:2001/api/${id}/${id}`).then((res) => res.data)
}