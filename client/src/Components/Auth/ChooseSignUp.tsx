import React from "react";
import styled from "styled-components";
import pic from "../Images/undraw_medical_care_movn.svg";
import { NavLink } from "react-router-dom";

const ChooseSignUp = () => {

  
  return (
    <Container>
      <Head>LifeCare Is all you need for your health insurance</Head>
      <Wrapper>
        <Right>
          <Box>
            <p>A platform for All</p>

            <Input to="/signuser">Sign Up as a User</Input>

            <Input to="/signconsultant">Sign up as a Consultant</Input>

            <Input to="/signhospital">Sign up as a Hospital</Input>

          </Box>
        </Right>
        <Left>
          <Img src={pic} />
        </Left>
      </Wrapper>
    </Container>
  );
};

export default ChooseSignUp;

const Input = styled(NavLink)`
  height: 40px;
  width: 250px;
  border: 1px light gray;
  border-radius: 5px;
  font-weight: 500;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7bb136;
  cursor: pointer;
  text-decoration: none;

  :hover {
    cursor: pointer;
    transition: all 350ms;
    transform: scale(0.9);
  }
`;
const Box = styled.div`
  height: 300px;
  width: 300px;
  box-shadow: rgba(209, 101, 101, 0.2) 0px 2px 8px 0px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  flex-direction: column;
  border: 1px solid #a7fd3784;

  p {
    font-size: 20px;
    color: black;
    margin-bottom: 20px;
  }
`;
const Right = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  height: 300px;
`;
const Left = styled.div`
  height: 100%;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
 
 @media screen and (max-width: 768px) {
  display: none;
 }
`;
const Wrapper = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  justify-content: space-between;
`;

const Head = styled.div`
  height: 30vh;
  width: 100%;
  background-color: #518f00;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: 500;
  color: #ffffff;
  border-bottom-left-radius: 30%;
`;
const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 768px) {
    justify-content: center;
  }
`;
