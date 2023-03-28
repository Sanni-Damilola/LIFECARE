import React from "react";
import styled from "styled-components";

const ComingSoon = () => {
  return (
    <Container>
      <Text>Coming Soon</Text>
      <Div1>
        <Div2>
          <p>87% loading</p>
        </Div2>
      </Div1>
    </Container>
  );
};

export default ComingSoon;

const Text = styled.div`
  font-size: 100px;
  color: white;
`;

const Div1 = styled.div`
  height: 20px;
  width: 180px;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  border-radius: 5px;
  border: 1px solid #354e14;
  margin-top: 30px;
`;
const Div2 = styled.div`
  height: 19px;
  width: 87%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  background-color: #96e72cc7;

  p {
    font-size: 10px;
    font-weight: bold;
  }
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(90deg, #ffd726, #609e10);
`;
