import React, { useState } from "react";
import styled from "styled-components";
import pics from "../Assets/Medical-logo.png";
import { useAppSelector } from "../Global/Store";
import { FiMenu } from "react-icons/fi";
import { AiOutlineMail } from "react-icons/ai";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaCloudUploadAlt }  from "react-icons/fa";
import { MdPointOfSale  } from "react-icons/md";
import { AiFillMessage, AiOutlineLogout, AiOutlineFund } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { MdHealthAndSafety } from "react-icons/md";
import { UseAppDispach } from "../Global/Store";
import { logout } from "../Global/ReduxState";

const DashHeader = () => {
  const dispatch = UseAppDispach();

  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const menu = () => {
    setShow(!show)
  }

  const user = useAppSelector((state) => state?.currentUser)

  return (
    <div>
      <Head>

{
  show ? 
  <Drop>
    
    <Containn>

    <Top>

<NavLink to="/dashboardhome" style={({isActive}) => { return {
textDecoration: isActive ? "none" : "none",
color: isActive ? "#a8ff37" : "white",
}}}><Home>
<Icon>
<FaHome />
</Icon>

<HomeText>Home</HomeText>
</Home></NavLink>

<NavLink to="/transactions" style={({isActive}) => { return {
textDecoration: isActive ? "none" : "none",
color: isActive ? "#a8ff37" : "white",
}}}><Home>
<Icon>
<MdPointOfSale />
</Icon>

<HomeText>Transactions</HomeText>
</Home></NavLink>

<NavLink to="/makeappointment" style={({isActive}) => { return {
textDecoration: isActive ? "none" : "none",
color: isActive ? "#a8ff37" : "white",
}}}><Home>
<Icon>
<GoPerson />
</Icon>

<HomeText>Appointment</HomeText>
</Home></NavLink>

<NavLink to="/hmo" style={({isActive}) => { return {
textDecoration: isActive ? "none" : "none",
color: isActive ? "#a8ff37" : "white",
}}}><Home>
<Icon>
<MdHealthAndSafety />
</Icon>

<HomeText>HMO</HomeText>
</Home></NavLink>

<NavLink to="/fund" style={({isActive}) => { return {
textDecoration: isActive ? "none" : "none",
color: isActive ? "#a8ff37" : "white",
}}}><Home>
<Icon>
<AiOutlineFund />
</Icon>

<HomeText>Fund Wallet</HomeText>
</Home></NavLink>

<NavLink to="/settings" style={({isActive}) => { return {
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
                  navigate("/");}}>
<Icon>
<AiOutlineLogout />
</Icon>

<HomeText>Logout</HomeText>
</Home>
</Bottom>

    </Containn>

  </Drop>

  : null
}



          <Logo>LIFECARE.</Logo>

        <User>

          <Icon style={{color:"#000000"}}>
            <AiOutlineMail />
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
          
          <Iconn style={{color:"#000000"}} onClick={menu}>
            <FiMenu />
          </Iconn>

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

const Iconn = styled.div`
display: none;

@media screen and (max-width: 768px) {
display: flex;
color: #a8ff37;
margin-right: 15px;
font-weight: 700;
margin-top: 10px;
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

const Containn = styled.div`
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

const Icon = styled.div`
    // font-size: 30px;
color: #a8ff37;
margin-right: 15px;
font-weight: 700;
margin-top: 10px;

@media screen and (max-width: 768px) {
  display: flex;
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
}
`;

const User = styled.div`
display: flex;
align-items: center;
margin-right: 25px;

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

