import React from "react";
import styled from "styled-components";
import { AiOutlineDollar }  from "react-icons/ai";
import { MdBloodtype, MdOutlineBloodtype } from "react-icons/md";
import {GrUserExpert } from "react-icons/gr";
import { RiPsychotherapyLine } from "react-icons/ri";


const ConsultHome1 = () =>{

    return (
        <>

            <Body>

                <Contain>

                    <Left>

                        <Up>
                            <Bal>
                                <Acct>Balance</Acct>

                                <Acct1>N300,000.00</Acct1>
                            </Bal>

                            <Icon>
                                <AiOutlineDollar />
                            </Icon>
                        </Up>

                        <Down>
                            <DownImg src="/images/chart.svg" /> 
                        </Down>

                    </Left>

                    <Right>

                        <Top>
                            <Wall>
                                <Acct2>Wallet ID 
                                    <Ico>
                                        <AiOutlineDollar />
                                    </Ico>
                                </Acct2>

                                <Acct3>0123456789</Acct3>
                            </Wall>

                            <Wall1>
                                <Acct2>Bank: Eco Bank 
                                    <Ico style={{backgroundColor:"#a8ff37"}}>
                                        <AiOutlineDollar />
                                    </Ico>

                                </Acct2>

                                <Acct3>2023456789</Acct3>
                            </Wall1>
                        </Top>

                        <Top>
                            <Wall2>
                                <Blood>
                                    <Blood1 style={{color:"#a8ff37", fontSize:"16px"}}>Specialist</Blood1>

                                    <Ico style={{backgroundColor:"#a8ff37"}}>
                                        <GrUserExpert />
                                    </Ico>
                                </Blood>

                                <Blood2>Optician</Blood2>
                            </Wall2>

                            <Wall3>
                                <Blood>
                                    <Blood1 style={{color:"#a8ff37", fontSize:"16px"}}>Other Expertise</Blood1>

                                    <Ico style={{backgroundColor:"#a8ff37"}}>
                                        <RiPsychotherapyLine />
                                    </Ico>
                                </Blood>

                                <Blood2>Pharmacist</Blood2>
                            </Wall3>
                        </Top>

                    </Right>

                </Contain>

            </Body>

        </>
    )
}

export default ConsultHome1;

// const Body = styled.div``;

// const Body = styled.div``;

const DownImg = styled.img`
width: 70%;
`;

const Down = styled.div`
height: 50%;
`;

const Up = styled.div`
height: 50%;
display: flex;
width: 100%;
justify-content: space-between;
`;

const Blood2 = styled.div`
margin-left: 20px;
font-weight: 700;
`;

const Blood1 = styled.div`
font-weight: 700;
`;

const Blood = styled.div`
margin-left: 20px;
margin-right: 20px;
margin-top: 10px;
width: 90%;
display: flex;
justify-content: space-between;
align-items: center;
`;

const Ico = styled.div`
background: white;
width: 40px;
height: 40px;
border-radius: 4px;
font-weight: 700;
font-size: 25px;
display: flex;
justify-content: center;
align-items: center;
`;

const Acct3 = styled.div`
// color: white;
margin-left: 15px;
margin-top: 20px;
font-weight: 700;
font-size: 25px;
`;

const Acct2 = styled.div`
// color: white;
margin-left: 20px;
margin-right: 20px;
margin-top: 15px;
font-weight: 700;
display: flex;
justify-content: space-between;
`;

const Wall3 = styled.div`
width: 49%;
height: 85px;
// box-shadow: 0 0 3px #6C63FF;
// box-shadow: 0 0 3px #a8ff37;
background-color: white;
border-radius: 10px 0 10px 0;
margin-top: 15px;
`;

const Wall2 = styled.div`
width: 49%;
height: 85px;
// box-shadow: 0 0 3px #6C63FF;
// box-shadow: 0 0 3px #a8ff37;
background-color: white;
border-radius: 10px 0 10px 0;
margin-top: 15px;
`;

const Wall1 = styled.div`
width: 49%;
height: 140px;
// box-shadow: 0 0 3px #6C63FF;
// box-shadow: 0 0 3px #000000;
background-color: white;
border-radius: 10px 0 10px 0;
display: flex;
flex-direction: column;
`;

const Wall = styled.div`
width: 49%;
height: 140px;
background-color: #a8ff37;
// background-color: cyan;
// background-color: rgb(0, 33, 37);
border-radius: 10px 0 10px 0;
`;

const Top = styled.div`
display: flex;
width: 100%;
justify-content: space-between;
`;

const Right = styled.div`
width: 58%;
display: flex;
flex-direction: column;
`;

// const Body = styled.div``;

const Icon = styled.div`
font-size: 35px;
// color: #6C63FF;
color: rgb(0, 33, 37);
margin-right: 20px;
margin-top: 20px;
width: 50px;
height: 50px;
border-radius: 5px;
background-color: #a8ff37;
display: flex;
justify-content: center;
align-items: center;
`;

const Bal = styled.div``;

const Acct1 = styled.div`
font-size: 35px;
font-weight: 700;
color: rgb(0, 33, 37);
`;

const Acct = styled.div`
font-size: 20px;
font-weight: 700;
margin-bottom: 10px;
// color: #f9e736;
color: #a8ff37;
margin-top: 20px;
`;

const Left = styled.div`
width: 38%;
height: 240px;
// box-shadow: 0 0 3px #6C63FF;
// box-shadow: 0 0 3px rgb(0, 33, 37);
// border-radius: 10px 0 10px 0;
padding-left: 20px;
// padding-top: 20px;
// padding-right: 20px;
background-color: white;
border-radius: 10px 0 10px 0;
display: flex;
flex-direction: column;
justify-content: space-between;
// align-items: center;
`;

const Contain = styled.div`
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
`;

const Body = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`;

