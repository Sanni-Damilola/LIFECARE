import React from "react";
import styled from "styled-components";

const ChooseSignUp = () => {
  return (
    <Container>
      <Head>LifeCare Is all you need for your health insurance</Head>
      <Wrapper>
        <Right>
          <Box>
            <p>A platform for All</p>
            <Input>Sign Up as a Patient</Input>
            <Input>Sign up as a Consultant</Input>
            <Input>Sign up as a Hospital</Input>
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
