/** @format */

import React from 'react'
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import accidentSignup from "../Assets/accidentSignup.png";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserData } from "../interface/interface";
import { UseAppDispach } from "../Global/Store";
import { User } from "../Global/ReduxState";
import { signup } from "../Api/Api";
import { Link } from "react-router-dom";

const ConsultantSignUp = () => {
const dispatch = UseAppDispach();
  const navigate = useNavigate();
  const schema = yup
    .object({
      name: yup.string().required(),
      email: yup.string().required(),
      password: yup.string().min(9).required(),
    })
    .required();

  type formData = yup.InferType<typeof schema>;

  const posting = useMutation({
    mutationKey: ["lifecareUser"],
    mutationFn: signup,

    onSuccess: (myData) => {
      dispatch(User(myData.data));
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
    navigate("/dashboardhome");
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
                  color: "#039EE6",
                  fontWeight: "700",
                  marginBottom: "20px",
                  textAlign: "center",
                }}>
                User Sign Up
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
            <RightImg src="/images/accidentSignin.svg" />
          </Right>
        </Hold>
      </Body>
    </>
  )
}

export default ConsultantSignUp