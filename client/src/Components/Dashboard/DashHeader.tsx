import React from "react";
import styled from "styled-components";
import pics from "../Assets/Medical-logo.png";
import { useAppSelector } from "../Global/Store";

const DashHeader = () => {

  const user = useAppSelector((state) => state?.currentUser)

  return (
    <div>
      <Head>
        <Logo>LIFE CARE.</Logo>

        <User>

          <Icon>
            {/* < /> */}
          </Icon>

          <UserLetter>
            {
              user?.name.charAt(0).toUpperCase()
            }
          </UserLetter>

          <Username>
            {
              user?.name
            }
          </Username>

        </User>
      </Head>
    </div>
  );
};

export default DashHeader;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

const Icon = styled.div``;

const Username = styled.div`
font-weight: 700;
font-size: 18px;
// color: white;
`;

const UserLetter = styled.div`
width: 30px;
height: 30px;
border-radius: 50%;
font-weight: 700;
// color: white;
border: 2px solid #000000;
margin-right:15px;
margin-left:15px;
text-align: center;
display: flex;
justify-content: center;
align-items: center;
`;

const User = styled.div`
display: flex;
align-items: center;
margin-right: 25px;
`;

const Logo = styled.h5`
  font-size: 25px;
  // color: #a8ff37;
  font-weight: 700;
  margin-left: 25px;
`;

const Side = styled.div``;


const Head = styled.div`
  height: 70px;
  width: 100%;
  // background-color: #6C63FF;
  // background-color: rgb(0, 33, 37);
  // background-color: #1f1f1f;
  background-color: white;
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  position: fixed;
  z-index: 400;
`;
