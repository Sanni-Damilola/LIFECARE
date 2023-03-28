import React, { useState } from "react";
import styled from "styled-components";
import pics from "../Assets/Medical-logo.png";
import { AiOutlineMail } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCloudUploadAlt }  from "react-icons/fa";
import { MdPointOfSale  } from "react-icons/md";
import { AiFillMessage, AiOutlineLogout, AiOutlineFund } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { UseAppDispach, useAppSelector } from "../Global/Store";
import { logout } from "../Global/ReduxState";

const ConsultHeader = () => {
  const dispatch = UseAppDispach();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const menu = () => {
    setShow(!show)
  }

  const getConsult = useAppSelector((state) => state?.consultUser)

  return (
    <div>
      <Head>

        {
          show ? 
          <Drop>

          <Contain>

              <Top>

                  {/* <Admin>CONSULTANT</Admin> */}

                  <NavLink to="/consulthome" style={({isActive}) => { return {
                      textDecoration: isActive ? "none" : "none",
                      color: isActive ? "#a8ff37" : "white",
                  }}}><Home>
                      <Icon>
                          <FaHome />
                      </Icon>

                      <HomeText>Home</HomeText>
                  </Home></NavLink>

                  <NavLink to="/consulttransactions" style={({isActive}) => { return {
                      textDecoration: isActive ? "none" : "none",
                      color: isActive ? "#a8ff37" : "white",
                  }}}><Home>
                      <Icon>
                          <MdPointOfSale />
                      </Icon>

                      <HomeText>Transactions</HomeText>
                  </Home></NavLink>

                  <NavLink to="/consultappointment" style={({isActive}) => { return {
                      textDecoration: isActive ? "none" : "none",
                      color: isActive ? "#a8ff37" : "white",
                  }}}><Home>
                      <Icon>
                          <FiUsers />
                      </Icon>

                      <HomeText>Appointments</HomeText>
                  </Home></NavLink>

                  <NavLink to="/consultwithdraw" style={({isActive}) => { return {
                      textDecoration: isActive ? "none" : "none",
                      color: isActive ? "#a8ff37" : "white",
                  }}}><Home>
                      <Icon>
                          <AiOutlineFund />
                      </Icon>

                      <HomeText>Withdraw</HomeText>
                  </Home></NavLink>

                  <NavLink to="/" style={({isActive}) => { return {
                      textDecoration: isActive ? "none" : "none",
                      color: isActive ? "#a8ff37" : "white",
                  }}}><Home>
                      <Icon>
                          <AiFillMessage />
                      </Icon>

                      <HomeText>Settings</HomeText>
                  </Home></NavLink>

              </Top>

              <Bottom>
                  <Home
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}>
                      <Icon>
                          <AiOutlineLogout />
                      </Icon>

                      <HomeText>Logout</HomeText>
                  </Home>
              </Bottom>

          </Contain>

          </Drop>
          : null
        }

        <Logo>LIFE CARE.</Logo>

        <User>

          <Icon>
            <AiOutlineMail />
          </Icon>

          <UserLetter>
              {
                getConsult?.name.charAt(0).toUpperCase()
              }
          </UserLetter>

          <Username>
              {
                getConsult?.name
              }
          </Username>
          
          <Iconn style={{color:"#000000"}} onClick={menu}>
            <FiMenu />
          </Iconn>

        </User>
      </Head>
    </div>
  );
};

export default ConsultHeader;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

// const User = styled.div``;

const Bottom = styled.div``;

const HomeText = styled.div`
font-size: 16px;
// color: #e4e932;
font-weight: 700;
margin-top: 10px;

  @media screen and (max-width: 375px) {
    margin-top: 5px;
  }
`;

const Home = styled.div`
display: flex;
align-items: center;
margin-bottom: 10px;
cursor: pointer;
`;

const Admin = styled.div`
font-size: 20px;
font-weight: 700;
margin-bottom: 30px;
color: #a8ff37;
`;

const Top = styled.div`
`;

const Contain = styled.div`
width: 90%;
height: 90%;
color: white;
display: flex;
flex-direction: column;
justify-content: space-between;
// align-items: center;
margin-left: 30px;
margin-top: 20px;
`;

const Drop = styled.div`
display: none;
transition: all 350ms ease-in-out;
z-index: 300;

@media screen and (max-width: 768px) {
  display: flex;
width: 300px;
height: 450px;
// background-color: #1f1f1f;
background-color: #1f1f1f;
position: absolute;
top: 70px;
right: 20px;
// backdrop-filter: 2px;
border-radius: 10px 0 10px 0;
// box-shadow: 0 0 2px white;
}

  @media screen and (max-width: 375px) {
    width: 250px;
    height: 370px;
    right: 15px;
  }

  @media screen and (max-width: 320px) {
    right: 10px;
  }
`;

const Iconn = styled.div`
display: none;

@media screen and (max-width: 768px) {
display: flex;
color: #a8ff37;
margin-right: 15px;
font-weight: 700;
margin-top: 10px;
font-size: 30px;
}

@media screen and (max-width: 375px) {
font-size: 20px;
}
`;

const Icon = styled.div`
    font-size: 25px;
color: #a8ff37;
margin-right: 15px;
font-weight: 700;
margin-top: 10px;

@media screen and (max-width: 375px) {
    font-size: 20px;
}
`;

const Username = styled.div`
font-weight: 700;
font-size: 18px;
// color: white;

@media screen and (max-width: 768px) {
    display: none;
}
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

@media screen and (max-width: 768px) {
  width: 20px;
  height: 20px;
  font-size: 13px;
  margin-top: 5px;
  margin-left: 6px;
}
`;

const User = styled.div`
display: flex;
align-items: center;
margin-right: 25px;
margin-bottom: 8px;

@media screen and (max-width: 375px) {
  margin-right: 10px;
}
`;

const Logo = styled.h5`
  font-size: 25px;
  // color: #a8ff37;
  font-weight: 700;
  margin-left: 25px;

  @media screen and (max-width: 375px) {
    font-size: 17px;
  }
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
