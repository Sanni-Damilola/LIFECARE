/** @format */

import React from "react";
import styled from "styled-components";
import { FaHome, FaCloudUploadAlt } from "react-icons/fa";
import { MdPointOfSale } from "react-icons/md";
import { AiFillMessage, AiOutlineLogout, AiOutlineFund } from "react-icons/ai";
import { FaAmbulance } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { MdHealthAndSafety } from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAppDispach } from "../Global/Store";
import { logout } from "../Global/ReduxState";

const SideBar = () => {
  const dispatch = UseAppDispach();

  const navigate = useNavigate();

  return (
    <>
      <Body>
        <Contain>
          <Top>
            <Admin>USER</Admin>

            <NavLink
              to="/dashboardhome"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <FaHome />
                </Icon>

                <HomeText>Home</HomeText>
              </Home>
            </NavLink>

            <NavLink
              to="/transactions"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <MdPointOfSale />
                </Icon>

                <HomeText>Transactions</HomeText>
              </Home>
            </NavLink>

            <NavLink
              to="/makeappointment"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <GoPerson />
                </Icon>

                <HomeText>Appointment</HomeText>
              </Home>
            </NavLink>

            <NavLink
              to="/hmo"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <MdHealthAndSafety />
                </Icon>

                <HomeText>HMO <br /> <span style={{color:"#a8ff37", fontWeight:"700", fontSize:"12px"}}>coming soon!</span></HomeText>
              </Home>
            </NavLink>

            <NavLink
              to="/fund"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <AiOutlineFund />
                </Icon>

                <HomeText>Fund Wallet</HomeText>
              </Home>
            </NavLink>

            

            <NavLink
              to="/dashboardhome"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <FaAmbulance />
                </Icon>

                <HomeText>Ambulance Services <br /> <span style={{color:"#a8ff37", fontWeight:"700", fontSize:"12px"}}>Coming Soon!</span></HomeText>
              </Home>
            </NavLink>

            <NavLink
              to="/settings"
              style={({ isActive }) => {
                return {
                  textDecoration: isActive ? "none" : "none",
                  color: isActive ? "#a8ff37" : "white",
                };
              }}>
              <Home>
                <Icon>
                  <AiFillMessage />
                </Icon>

                <HomeText>Settings</HomeText>
              </Home>
            </NavLink>
          </Top>

          <Bottom>
            <Home>
              <Icon>
                <AiOutlineLogout />
              </Icon>

              <HomeText
                onClick={() => {
                  dispatch(logout());
                  navigate("/");
                }}>
                Logout
              </HomeText>
            </Home>
          </Bottom>
        </Contain>
      </Body>
    </>
  );
};

export default SideBar;

// const DashHead = styled.div``;

// const DashHead = styled.div``;

// const DashHead = styled.div``;

const Bottom = styled.div``;

const HomeText = styled.div`
  font-size: 16px;
  // color: #e4e932;
  font-weight: 700;
`;

const Icon = styled.div`
  font-size: 17px;
  margin-right: 10px;
  color: #a8ff37;
`;

const Home = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  cursor: pointer;
`;

const Admin = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 30px;
  color: #a8ff37;
`;

const Top = styled.div``;

const Contain = styled.div`
  width: 90%;
  height: 90%;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  // align-items: center;
  margin-left: 30px;
`;

const Body = styled.div`
  width: 250px;
  height: calc(100vh - 65px);
  display: flex;
  /* justify: content; */
  align-items: center;
  position: fixed;
  background-color: #1f1f1f;
  // background-color: rgb(0, 33, 37);
`;
