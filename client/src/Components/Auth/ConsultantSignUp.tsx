/** @format */

import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import accidentSignup from "../Assets/accidentSignup.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { consultData } from "../interface/interface";
import { UseAppDispach } from "../Global/Store";
import { Consultant } from "../Global/ReduxState";
import { createSpecialist, signup } from "../Api/Api";
import { Link } from "react-router-dom";

import { AnyMxRecord } from 'dns';

import pic from "../Images/sign-up.svg";


const ConsultantSignUp = () => {
  const dispatch = UseAppDispach();
  const navigate = useNavigate();
  
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().min(9).required(),
      profession: yup.string().required(),
      lience: yup.string().required(),
    })
    .required();

  type formData = yup.InferType<typeof schema>;

  const posting = useMutation({
    mutationKey: ["lifecareconsult"],
    mutationFn: createSpecialist,

    onSuccess: (Data:any) => {
      dispatch(Consultant(Data.data));
      console.log(Data.data)
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<formData>({
    resolver: yupResolver(schema),
  });

  const Submit = handleSubmit(async (data) => {
    posting.mutate(data);
    reset();
    navigate("/consulthome");
  });

  return (
    <>
      <Body>
        <Hold>
          <Left>
            <Form onSubmit={Submit}>
              <div
                style={{
                  fontSize: "20px",
                  color: "#567e22",
                  fontWeight: "700",
                  marginBottom: "20px",
                  textAlign: "center",
                }}>
                Consultant Sign Up
              </div>

              <Input
                type="text"
                placeholder="Full Name"
                {...register("name")}
              />
              <p>{errors?.name && errors?.name?.message}</p>

              <Input type="text" placeholder="Email" {...register("email")} />
              <p>{errors?.email && errors?.email?.message}</p>

              <Input
                type="text"
                placeholder="Specialty"
                {...register("profession")}
              />
              <p>{errors?.profession && errors?.profession?.message}</p>

              <Input
                type="text"
                placeholder="License Num"
                {...register("lience")}
              />
              <p>{errors?.lience && errors?.lience?.message}</p>

              {/* <Input
                type="number"
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
              <p>{errors?.phoneNumber && errors?.phoneNumber?.message}</p> */}

              <Input
                type="password"
                placeholder="Password"
                {...register("password")}
              />
              <p>{errors?.password && errors?.password?.message}</p>


              <Button type="submit">Sign Up</Button>

              <Link style={{ textDecoration: "none" }} to={"/signin"}>
                <Already>Already have an account? Sign in</Already>
              </Link>
            </Form>
          </Left>

          <Right>
            <RightImg src={pic} />
          </Right>
        </Hold>
      </Body>
    </>
  );
};

export default ConsultantSignUp;

const RightImg = styled.img`
  width: 500px;
`;

const Right = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

// const Body = styled.div``;

const Already = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: #567e22;
  margin-top: 15px;
  text-align: center;
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  width: 105%;
  height: 40px;
  background: #567e22;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: all 350ms;
  :hover {
    background-color: #567e22;
  }
`;

const Input = styled.input`
  // <{ props: string }>
  width: 100%;
  height: 40px;
  border: none;
  box-shadow: 0 0 2px #a7fd37;
  margin-bottom: 10px;
  border-radius: 7px;
  padding-left: 10px;
  @media screen and (max-width: 425px) {
    box-shadow: none;
    border-bottom: 1px solid #a7fd37;
  }
  @media screen and (max-width: 768px) {
    height: 35px;
  }
`;

const Form = styled.form`
  width: 270px;
  height: 500px;
  box-shadow: 0 0 3px #567e22;
  border-radius: 10px 0 10px 0;
  padding: 30px;
  padding-right: 40px;
  @media screen and (max-width: 425px) {
    width: 310px;
    padding: 20px;
    padding-right: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-shadow: none;
  }
  @media screen and (max-width: 320px) {
    width: 310px;
    padding: 10px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    height: 400px;
  }
`;

const Left = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 768px) {
    width: 85%;
  }
  @media screen and (max-width: 425px) {
    width: 95%;
  }
`;

const Hold = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
