/** @format */

import React from "react";
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

const Signup = () => {
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
    // navigate("/signin");
  });

  //
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
  );
};

export default Signup;

const RightImg = styled.img`
  width: 500px;
  color: #039ee6;
`;

const Right = styled.div`
  width: 50%;
`;

const Already = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: #039ee6;
  margin-top: 15px;
  text-align: center;
`;

const Button = styled.button`
  width: 105%;
  height: 40px;
  background: #039ee6;
  color: white;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  transition: all 350ms;
  :hover {
    background-color: #039ee6c7;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border: none;
  box-shadow: 0 0 2px #039ee6;
  margin-bottom: 20px;
  border-radius: 7px;
  padding-left: 10px;
`;

const Form = styled.form`
  width: 270px;
  height: 450px;
  box-shadow: 0 0 3px #039ee6;
  border-radius: 10px 0 10px 0;
  padding: 30px;
  padding-bottom: 30px;
  padding-right: 40px;
  margin-top: 40px;

  p {
    color: red;
    font-size: 12px;
  }
`;

const Left = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Hold = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Body = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
