import React from "react";
import styled from "styled-components";
import { HiArrowNarrowRight } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import pic from "../../Images/hackAmb.jpg"

const AboutUs = () => {
  return (
    <Container>
      <Wrapper>
        <Image>
          <img src= {pic} />
        </Image>

        <Text>
          <small style={{color: "#64a70d"}}>About Us</small>

          <Title>We Give The Best Of Services</Title>
          
          <Content>
            <p>
            We are a team of dedicated individuals who believe that everyone should have access to affordable healthcare.
            Our app is designed to help you save money for unexpected medical expenses, giving you peace of mind and the 
            ability to focus on your health without worrying about the financial burden.
            </p>
            <p>
            At our core, we are passionate about improving the lives of people in our communities. 
            We believe that access to quality healthcare is a basic human right, and we are committed to doing our part to make that a reality. 
            Join us on this journey and let us help you build a healthier, happier future.
            </p>
          </Content>

          <Visit to="/signup">
            <span style =  {{color: "#64a70d"}}>Click here to register </span>
            <HiArrowNarrowRight size="20px" style = {{color:"#64a70d"}} />
          </Visit>
        </Text>
      </Wrapper>
    </Container>
  );
};

export default AboutUs;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 70px;
`;
const Wrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  @media (max-width: 800px) {
    justify-content: center;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
`;
const Image = styled.div`
  height: 350px;
  width: 500px;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  @media (max-width: 500px) {
    width: 100%;
    height: 300px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 2px;
    object-fit: cover;
  }
`;
const Text = styled.div`
  width: 500px;
  @media (max-width: 500px) {
    width: 100%;
    text-align: center;
  }
  small {
    font-size: 11px;
    color: #fcc101;
    font-weight: 700;
  }
`;
const Title = styled.div`
  font-size: 22px;
  font-weight: 900;
  font-family: Montserrat;
`;
const Content = styled.div``;
const Visit = styled(NavLink)`
  display: flex;
  text-decoration: none;

  align-items: center;
  font-size: 13px;
  font-weight: 700;
  margin-top: 40px;
  cursor: pointer;
  color: #409efb;
  span {
    margin-right: 20px;
  }
  @media (max-width: 500px) {
    justify-content: center;
  }
`;
