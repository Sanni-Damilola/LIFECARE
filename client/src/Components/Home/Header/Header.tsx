import React, { useState } from "react";
import styled from "styled-components";
import { RiHomeSmileFill } from "react-icons/ri";
import { IoMdPricetags, IoMdContact } from "react-icons/io";
import { NavLink } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

const Header = () => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };

  return (
    <>
      <Container>
        <Wrapper>
          <NavLink style={{ textDecoration: "none", color: "black" }} to="/">
            <Logo>LIFECARE.</Logo>
          </NavLink>

          <Navigations>
            <Navs to="/">
              <RiHomeSmileFill />
              <span>Home</span>
            </Navs>
            
            <Navs to="/footer">
              <IoMdContact />
              <span>Contact us</span>
            </Navs>

            <Navs to="/donateblood">
              <IoMdPricetags />
              <span>Donate Blood</span>
            </Navs>

            <Navs to="/signup">
              <Button>Sign Up</Button>
            </Navs>
            <Navs to="/signin">
              <Button>Sign In</Button>
            </Navs>
          </Navigations>

          <BurgerMenu onClick={toggle}>
            <GiHamburgerMenu />
          </BurgerMenu>

          {show ? (
            <DropDown>
              <Holder>
                <SideNavs to="/">Home</SideNavs>
                <SideNavs to="/about">About</SideNavs>
                <SideNavs to="footer">Contact us</SideNavs>
                <SideNavs to="/donateblood">Donate Blood</SideNavs>
                <SideNavs to="/signuser">Sign Up</SideNavs>
                <SideNavs to="/signin">Sign In</SideNavs>
              </Holder>
            </DropDown>
          ) : null}
        </Wrapper>
      </Container>
    </>
  );
};
export default Header;

const SideNavs = styled(NavLink)`
  text-decoration: none;
  width: 100%;
  margin-top: 10px;
  color: #fff;
  display: flex;
  font-size: 16px;
  justify-content: center;
  align-items: center;

  :hover {
    cursor: pointer;
    transition: all 350ms;
    transform: scale(0.9);
  }

  button {
    height: 30px;
    width: 150px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: poppins;
    background-color: #087cc5;
    border: none;
    outline: none;
    color: #fff;
    font-weight: 600;
    transition: all 350ms;
    cursor: pointer;
    :hover {
      transform: scale(0.94);
    }
  }
  :hover {
    color: #ffb400;
  }

  &.active {
    color: #087cc5;
  }

  span {
    margin-left: 5px;
  }
`;
const DropDown = styled.div`
  height: 100vh;
  width: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  /* align-items: center; */
  font-family: poppins;
  font-weight: 600;
  z-index: 10;
  position: absolute;
  top: 16%;
`;

const Holder = styled.div`
  margin-top: 40px;
`;
const Button = styled.div`
  /* padding: 7px 10px; */
  padding: 15px;
  display: block;
  margin-left: 15px;
  justify-content: center;
  :hover {
    transform: scale(0.94);
  }
  /* align-items: center; */
  font-family: poppins;
  background-color: #a8ff37;
  border: none;
  outline: none;
  color: black;
  font-weight: 600;
  border-radius: 20px;
`;

const Container = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 510px) {
    height: 65px;
  }
`;
const Wrapper = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Logo = styled.div`
  color: black;
  /* color: #a8ff37; */
  width: 60px;
  font-weight: bold;
  img {
    width: 100%;
  }
  @media (max-width: 510px) {
    width: 45px;
  }
`;

const Navigations = styled.div`
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;
const Navs = styled(NavLink)`
  color: #000;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 10px;
  cursor: pointer;
  font-size: 14px;
  /* #F3F7F5
  #F3F7F5 */
  span {
    margin-left: 3px;
    font-weight: 600;
  }
`;

const BurgerMenu = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
