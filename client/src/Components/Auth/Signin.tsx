/** @format */

import React from "react";
import styled from "styled-components";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import accidentSignin from "../Assets/accidentSignin.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UseAppDispach } from "../Global/Store";
import { User } from "../Global/ReduxState";
import { signin } from "../Api/Api";

const Signin = () => {
  const dispatch = UseAppDispach();
  const navigate = useNavigate();
  const schema = yup
    .object({
      email: yup.string().required(),
    })
    .required();

  type formData = yup.InferType<typeof schema>;

  const posting = useMutation({
    mutationKey: ["lifecareUser"],
    mutationFn: signin,

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
        {/* <Black></Black> */}

        <Hold>
          <Right>
            <RightImg src="/images/accidentSignin.svg" />
          </Right>

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
                User Sign in
              </div>

              <Input type="text" placeholder="Email" {...register("email")} />
              <p>{errors?.email && errors?.email?.message}</p>

              <Button type="submit">Sign in</Button>

              <Link style={{ textDecoration: "none" }} to={"/"}>
                <Already>Already have an account? Sign up</Already>
              </Link>
            </Form>
          </Left>
        </Hold>
      </Body>
    </>
  );
};

export default Signin;

const RightImg = styled.img`
  width: 500px;
`;

const Right = styled.div`
  width: 50%;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const Already = styled.div`
  font-size: 13px;
  cursor: pointer;
  color: #6c63ff;
  margin-top: 15px;
  text-align: center;
  @media screen and (max-width: 425px) {
    font-size: 10px;
  }
`;

const Button = styled.button`
  width: 105%;
  height: 40px;
  background: #6c63ff;
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
  box-shadow: 0 0 2px #6c63ff;
  margin-bottom: 20px;
  border-radius: 7px;
  padding-left: 10px;
  @media screen and (max-width: 425px) {
    box-shadow: none;
    border-bottom: 1px solid #6c63ff;
  }
  @media screen and (max-width: 768px) {
    height: 35px;
  }
`;

const Form = styled.form`
  width: 270px;
  height: 300px;
  box-shadow: 0 0 3px #6c63ff;
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
