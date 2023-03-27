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

const HospitalSignUp = () => {
  return <div>HospitalSignUp</div>;
};

export default HospitalSignUp;
