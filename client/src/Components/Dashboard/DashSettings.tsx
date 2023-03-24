import React from "react";
import styled from "styled-components";
import { FaUserAlt } from "react-icons/fa";

const DashSettings: React.FC = () => {
  return (
    <Container>
        

      <Right>
        <Head></Head>
        <Identity>
          <Image>
            <FaUserAlt />
          </Image>
          <Hold>
            <Name>Favour Yusuf</Name>
            <Email>favouryusuf45@gmail.com</Email>
          </Hold>
        </Identity>
        <Content>
          <Profile>
            <p>Profile</p>
            <Input>
              <input type="text" placeholder="FullName" />
              <input type="text" placeholder="Email" />
              <input type="text" placeholder="Password" />
            </Input>
          </Profile>
          <Profile>
            <p>Health</p>
            <Input>
              <select>
                {/* <option>Blood-group</option> */}
                <option disabled>select blood group</option>
                <option value="">AA</option>
                <option value="">B</option>
                <option value="">AB</option>
                <option value="">O</option>
              </select>
              <select>
                <option disabled>select Rhesus Factor</option>
                <option value="">Positive</option>
                <option value="">Negative</option>
              </select>
              <select>
                <option disabled>Select blood genotype</option>
                <option value="">AA</option>
                <option value="">AS</option>
                <option value="">AC</option>
                <option value="">SC</option>
                <option value="">SS</option>
              </select>
            </Input>
          </Profile>
          <Profile>
            <p>Change Password</p>
            <Input>
              <input type="text" placeholder="Old-Password" />
              <input type="text" placeholder="New-Password" />
              <input type="text" placeholder="Confirm-password" />
            </Input>
          </Profile>
        </Content>
      </Right>
    </Container>
  );
};

export default DashSettings;

const Input = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 300px;
  border-radius: 5px;
  margin-right: 20px;

  input {
    border: none;
    height: 40px;
    width: 300px;
    margin-bottom: 15px;
    background-color: #dbdbdb;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
    padding-left: 10px;
  }

  select {
    border: none;
    height: 42px;
    width: 315px;
    margin-bottom: 15px;
    background-color: #dbdbdb;
    outline: none;
    border-radius: 5px;
    font-size: 15px;
  }
`;
const Hold = styled.div`
  margin-left: 10px;
`;
const Img = styled.div``;

const Name = styled.div`
  font-size: 25px;
  font-weight: 700;
  margin-bottom: 15px;
`;
const Email = styled.div`
  color: #a8ff37;
  //   margin-right: 10px;
  font-weight: 700px;
  background: #000000;
  padding: 10px;
  border-radius: 20px;
`;
const Image = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: -10px;
  border-radius: 360px;
  background-color: #c2bdbd;
  margin-left: 5px;
  color: #868686;
  font-size: 60px;
`;

const Identity = styled.div`
  min-height: 100px;
  width: 100%;
  display: flex;
`;

const Profile = styled.div`
  height: 400px;
//   margin-left: 5px;

  p {
    font-size: 20px;
    // color: #00000032;
    font-weight: bold;
  }
`;

const Right = styled.div`
  width: 95%';
  min-height: 100vh;
`;

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Head = styled.div`
//   height: 170px;
  width: 100%;
//   border-top-left-radius: 15px;
//   border-top-right-radius: 15px;
//   background-image: linear-gradient(120deg, #fce579, #9a1ce4);
margin-top: 80px;
`;

const Container = styled.div`
width: 100%;
display: flex;
justify-content: center;
// align-items: center;
`;
