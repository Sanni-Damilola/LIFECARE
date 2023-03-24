import React from "react";
import styled from "styled-components";
import {AiOutlinePhone} from 'react-icons/ai'
import {AiOutlineMail} from 'react-icons/ai'

const Footer = () => {
  return (
    <Container>
      <Wrapper>
        <AbtBag>
          <Logo>LIFECARE.</Logo>
          <Text>
            LIFECARE is founded with the passion to safe lives, eliminating the excuse of no money in the case of health emergency
          </Text>
          <Icn>
            <AiOutlinePhone />
            <Number>+2347015961501, +2349029903813 </Number>
          </Icn>

          <Icn>
            <AiOutlineMail />
            <Number>lifecare428@gmail.com</Number>
          </Icn>

          <button style={{color: "black"}}>Get Started</button>
        </AbtBag>


        <OtherNav>
          <Holder>
            <Title>Menu</Title>
            <span>Home</span>
            <span>Contact</span>
          </Holder>
          <Holder>
            <Title>Help</Title>
            <span>FAQ</span>
            <span>Privacy Policy</span>
            <span>Terms and Conditions</span>
          </Holder>
          <Holder>
            <Title>Socials</Title>
            <span>Facebook</span>
            <span>Twitter</span>
            <span>Instagram</span>
            <span>Whatsapp</span>
          </Holder>
        </OtherNav>
      </Wrapper>
      <small>Developed by Team Code Crusaders</small>
    </Container>
  );
};

export default Footer;


const Icn = styled.div`
display: flex
`
const Number = styled.div`
margin-left: 10px;
`

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: 50vh;
  background-color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  flex-direction: column;
  font-family: montserrat;
  small {
    font-size: 8px;
    margin-bottom: 10px;
  }
`;
const Wrapper = styled.div`
  width: 85%;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin: 20px 0;

  @media (max-width: 500px) {
    justify-content: center;
  }
`;
const AbtBag = styled.div`
  margin-bottom: 10px;
  @media (max-width: 500px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
  }
  button {
    height: 30px;
    width: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: poppins;
    color: black;
    background-color: #a8ff37;
    border: none;
    outline: none;
    color: #fff;
    font-weight: 600;
    border-radius: 4px;
    transition: all 350ms;
    margin: 10px 0;
    cursor: pointer;
    :hover {
      transform: scale(0.94);
    }
  }
`;
const Logo = styled.div`
  font-size: 30px;
  font-weight: 900;
  margin-bottom: 10px;
`;
const Text = styled.div`
  width: 250px;
  font-size: 12px;
  margin-bottom: 15px;
`;
const OtherNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 500px) {
    justify-content: center;
    flex-direction: column;
  }
`;
const Holder = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 20px;
  font-size: 15px;

  @media (max-width: 500px) {
    align-items: center;
    margin-bottom: 20px;
  }

  span {
    margin: 10px 0;
    font-weight: lighter;
  }
`;
const Title = styled.div`
  margin-bottom: 10px;
  font-weight: 600;
  color: #a7fd37;
`;
