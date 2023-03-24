import React from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import save from "../../Images/saveMoney.jpg"

const Elite = () => {
  return (
    <Container>
      <Wrapper>
        <Text>
          <small>Elites</small>
          <Title>Worry Not About Your Savings</Title>
          <Content>
            <p>
              We ensure that your money is safe and secure. We process your savings for payment to your doctor in good
              time, no delays!!!
            </p>
            <p>
                Booking a session with our specialists is so seemless, you can pay for consultations with your savings. <br />
                You can purchase various HMO plans with your savings.  <br /><br />
                You can either make a quick save, weekly or monthly save....All you have to do is to click.
            </p>
          </Content>
          <Visit to="/signup">
            <span style =  {{color: "#64a70d"}} >Sign up today </span>
            <HiArrowNarrowRight size="20px"  style =  {{color: "#a8ff37"}} />
          </Visit>
        </Text>

        <Image>
          <Img src = {save} />
        </Image>
      </Wrapper>
    </Container>
  );
};

export default Elite;

const Img = styled.img``

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
    flex-direction: column-reverse;
  }
`;
const Image = styled.div`
  height: 350px;
  width: 500px;
  margin-bottom: 20px;
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
    color: #15c381;
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
  :hover {
      transform: scale(0.94);
    }

  span {
    margin-right: 20px;
  }
  @media (max-width: 500px) {
    justify-content: center;
  }
`;
