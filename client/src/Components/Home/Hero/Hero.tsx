import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
// import pic from '../Images/4.jpg'
import pic from '../../Images/42.png'
const Hero = () => {
  return (
    <Container>
      <Wrapper>
        <ImgTextHold>
          <TextDiv>
            <Title>
              <div>Safe guarding</div>
              <div>against Health Emergencies</div>
              {/* <div>In Emergency Situations</div> */}
            </Title>

            <Content>
              Save with us today to cater for advance payments in cases 
              of health emergency. <br />
            </Content>
            <p style={{fontWeight: "bold"}}>LIFECARE... Giving lifeline to your deadline!!!</p>
            
            <ButtonHold>
              <NavLink
                to="/signup"
                style={{
                  textDecoration: "none",
                }}
              >
                <Button>Sign up</Button>
              </NavLink>
              
              <NavLink
                to="/pricing"
                style={{
                  textDecoration: "none",
                }}
              >
                {/* <Button>View Prices</Button> */}
              </NavLink>
            </ButtonHold>
          </TextDiv>

          <ImageDiv>
            <img src={pic} alt="" />
          </ImageDiv>
        </ImgTextHold>
      </Wrapper>
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 350ms;
  margin-bottom: 70px;
`;
const Wrapper = styled.div`
  min-height: 85vh;
  width: 95%;
  background-color: #f3f7f5;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ImgTextHold = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-top: 10px;
  @media (max-width: 800px) {
    width: 95%;
    justify-content: center;
  }
`;
const ImageDiv = styled.div`
  width: 500px;
  @media (max-width: 510px) {
    width: 100%;
  }
  img {
    width: 100%;
  }
`;
const TextDiv = styled.div`
  width: 530px;
  @media (max-width: 800px) {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 510px) {
    width: 100%;
  }
`;

const Title = styled.div`
  font-family: Montserrat;
  font-size: 55px;
  font-weight: 900;
  line-height: 1;
  margin-bottom: 20px;
  @media (max-width: 510px) {
    width: 100%;
    font-size: 33px;
  }
`;

const Content = styled.div`
  width: 450px;
  font-size: 14px;
  margin-bottom: 15px;
  @media (max-width: 510px) {
    width: 100%;
    font-size: 12px;
  }
`;
const ButtonHold = styled.div`
  display: flex;
  @media (max-width: 510px) {
    justify-content: center;
  }
`;
const Button = styled.button`
  /* padding: 7px 10px; */
  padding:10px;
    display: block;
    justify-content: center;
    :hover {
      transform: scale(0.94);
    }
    font-family: poppins;
    background-color: #a8ff37;
    border: none;
    outline: none;
    color: black;
    font-weight: 600;
    border-radius: 15px;
  @media (max-width: 510px) {
    margin: 0 5px;
    width: 120px;
    border-radius: 2px;
  }
  cursor: pointer;
  :hover {
    transform: scale(0.94);
  }
`;
