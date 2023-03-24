import React from 'react'
import styled from "styled-components"
import hackcare from '../../Images/hackcare.jpg'
// import hackAmb from '../Images/hackAmb.jpg'
import doctorImg from '../../Images/doctorImg.jpg'
import care from '../../Images/care.jpg'
import saveCash from '../../Images/saveCash.jpg'
import donor from '../../Images/donate.png'
import Hmo from '../../Images/Hmo.jpg'

const ExclusiveService = () => {
  return (
    <Container>
    <Wrapper>
      <Title>Our Exclusive Services</Title>
      <Sub>Try out our exclusive services today</Sub>

      <CardHold>
        
          <Card>
            <ImgDiv>   
              <Img src={saveCash} />
            </ImgDiv>
            <ImgTitle> Save against Emergencies </ImgTitle>
          </Card>

          <Card>
            <ImgDiv>   
              <Img src={hackcare} />
            </ImgDiv>
            <ImgTitle> Patient undergoes treatment  </ImgTitle>
          </Card>

          <Card>
            <ImgDiv>   
              <Img src={doctorImg} />
            </ImgDiv>
            <ImgTitle> Speak with specialists </ImgTitle>
          </Card>
        
          <Card>
            <ImgDiv>   
              <Img src={care} />
            </ImgDiv>
            <ImgTitle> Care for a friend </ImgTitle>
          </Card>

          <Card>
            <ImgDiv>   
              <Img src={Hmo} />
            </ImgDiv>
            <ImgTitle> Buy HMO plans</ImgTitle>
          </Card>

          <Card>
            <ImgDiv>   
              <Img src={donor} />
            </ImgDiv>
            <ImgTitle> Donate Blood </ImgTitle>
          </Card>
      </CardHold>
    </Wrapper>
  </Container>
  )
}

export default ExclusiveService

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
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  @media (max-width: 500px) {
    width: 95%;
  }
`;
const Title = styled.div`
  font-size: 30px;
  font-weight: 900;
  /* font-family: nunito; */
  text-align: center;
`;
const Sub = styled.div`
  font-size: 13px;
  margin-bottom: 20px;
  color: #64a70d;
  font-weight: bold;
`;
const CardHold = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Card = styled.div`
  margin: 10px;
  cursor: pointer;

    :hover {
      transform: scale(0.94);
    }

  @media (max-width: 500px) {
    margin: 10px 0;
  }
`;
const ImgDiv = styled.div`
  height: 200px;
  width: 300px;
  margin-bottom: 10px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const ImgTitle = styled.div`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
`;
