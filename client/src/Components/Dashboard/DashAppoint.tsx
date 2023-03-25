/** @format */

import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

const DashAppointment = () => {
  const [quick, setQuick] = React.useState(false);

  const toggle2 = () => {
    setQuick(!quick);
  };

  return (
    <div style={{ position: "relative" }}>
      {quick ? (
        <>
          <Bodyy>
            <div></div>

            <Quickk>
              <div
                style={{
                  zIndex: "500",
                  fontSize: "25px",
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  cursor: "pointer",
                }}
                onClick={toggle2}>
                <AiOutlineClose />
              </div>

              <Topp>
                <Save>Book</Save>
                <Enter>Enter an amount and a destination</Enter>

                {/* <Tap>
                <Label>Full Name</Label>

                <Here type="" placeholder=''/>
            </Tap>

            <Tap>
                <Label>Email</Label>

                <Here type="" placeholder=''/>
            </Tap> */}

                <Label>Select Specialist</Label>
                <Select name="" id="">
                  <option value="">Click To Select</option>
                </Select>

                <Label>Select Doctor</Label>
                <Select name="" id="">
                  <option value="">Click To Select</option>
                </Select>

                <Tap>
                  <Label>Complaint (Brief)</Label>

                  <Here1 placeholder="" />
                </Tap>

                <Tap>
                  <Label>Date</Label>

                  <Here type="date" placeholder="" />
                </Tap>
              </Topp>

              <Proceed>Make Appointment</Proceed>
            </Quickk>
          </Bodyy>
        </>
      ) : null}

      <Body>
        <Contain>
          <Fund>
            <div></div>

            <Button>
              <Pay onClick={toggle2}>Book Appointment</Pay>
            </Button>
          </Fund>

          <div
            style={{
              fontSize: "18px",
              fontWeight: "700",
              marginTop: "20px",
              marginLeft: "20px",
            }}>
            Appointments
          </div>

          <Top>
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              S/N
            </Names>
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              Doctor
            </Names>
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              Doctor's Name
            </Names>
            {/* <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Email</Names> */}
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              Specialist
            </Names>
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              Date
            </Names>
            <Names
              style={{ fontSize: "14px", fontWeight: "700", color: "#000000" }}>
              Time
            </Names>
          </Top>

          <Top>
            <Names>1</Names>
            <Names>
              <Name src="/images/avatar.png" />
            </Names>
            <Names>Allison Jordan</Names>
            <Names>Dentist</Names>
            <Names>01:00am</Names>
            <Names>Mar. 10, 2023</Names>
          </Top>

          <Top>
            <Names>2</Names>
            <Names>
              <Name src="/images/avatar.png" />
            </Names>
            <Names>Bola Akin</Names>
            <Names>Optician</Names>
            <Names>02:30am</Names>
            <Names>Mar. 12, 2023</Names>
          </Top>
        </Contain>
      </Body>
    </div>
  );
};

export default DashAppointment;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

const Name = styled.img`
  width: 40px;
  height: 40px;
  // border: 1px solid rgba(123, 126, 126, 0.992);
  border-radius: 50%;
`;

const Select = styled.select`
  width: 100%;
  height: 47px;
  border-radius: 7px 7px 7px 0;
  padding-left: 10px;
`;

const Proceed = styled.button`
  cursor: pointer;
  width: 100%;
  height: 40px;
  color: white;
  background-color: #000000;
  margin-bottom: 30px;
  border: none;
  border-radius: 7px 7px 7px 0;
  font-weight: 700;
`;

const Here1 = styled.textarea`
  width: 96%;
  height: 100px;
  border-radius: 7px 7px 7px 0;
  padding-left: 10px;
`;

const Here = styled.input`
  width: 96%;
  height: 42px;
  border-radius: 7px 7px 7px 0;
  padding-left: 10px;
`;

const Label = styled.div`
  margin-top: 20px;
  margin-bottom: 7px;
  font-size: 12px;
  font-weight: 700;
  // color: gray;
`;

const Tap = styled.div`
  /* display: flex;
flex-direction: column; */
`;

const Enter = styled.div`
  font-size: 12px;
  color: gray;
  margin-bottom: 15px;
`;

const Save = styled.div`
  // color: #a8ff37;
  font-size: 23px;
  font-weight: 700;
`;

const Topp = styled.div`
  margin-top: 30px;
  width: 100%;
`;

const Quickk = styled.div`
  width: 300px;
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  background-color: white;
  z-index: 100;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Black = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #0000005b;
`;

const Bodyy = styled.div`
  width: calc(100% - 250px);
  height: calc(100vh - 70px);
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: #00000095;
  z-index: 300;
  transition: all 350ms ease-in-out;
`;

const Pay = styled.button`
  padding: 13px 13px;
  // background-color: #a8ff37;
  background-color: #f4511e;
  font-weight: 700;
  border-radius: 5px;
  cursor: pointer;
  border: none;
  color: white;
`;

const Button = styled.div`
  gap: rem;
`;

const Fund = styled.div`
  width: 90%;
  margin-left: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const See = styled.div`
  font-size: 12px;
  font-weight: 700;
  // font-weight: 650;
  // color: rgba(123, 126, 126, 0.992);
  // color: white;
  cursor: pointer;
  margin-left: 20px;
  margin-top: 20px;
`;

const Names = styled.div`
  font-size: 12px;
  font-weight: 700;
  color: rgba(123, 126, 126, 0.992);
  width: 12%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Top = styled.div`
  width: 95%;
  margin-top: 15px;
  margin-left: 20px;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
`;

const Contain = styled.div`
  width: 95%;
  height: 100%;
  background-color: white;
  border-radius: 10px 0 10px 0;
  display: flex;
  gap: 1rem;
  flex-direction: column;
  // justify-content: center;
  margin-top: 20px;
  padding-bottom: 30px;
`;

const Body = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  // align-items: center;
`;
