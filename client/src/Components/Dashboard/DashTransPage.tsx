import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";


const DashTransPage = () => {

    const [quick, setQuick] = React.useState(false)

    const toggle2 = () => {
        setQuick(!quick)
    }

    return(
        <div style={{position:"relative"}}>

{ quick ?

<> 
    

    <Bodyy>


    <div></div>

    <Quickk>

        <div style={{zIndex:"500", fontSize:"25px", position:"absolute", top:"20px", right:"20px", cursor:"pointer"}} onClick={toggle2}>

            <AiOutlineClose />
        </div>

        <Topp>

            <Save>Pay</Save>
            <Enter>Enter an amount and a destination</Enter>

            <Tap>
                <Label>Enter Account Number</Label>

                <Here type="" placeholder='Tap here and enter .. (e.g 0123456789)'/>
            </Tap>

            <Tap>
                <Label>Enter Amount</Label>

                <Here type="" placeholder='Tap here and enter .. (e.g 5000)'/>
            </Tap>

        </Topp>

        <Proceed>Make Payment</Proceed>

    </Quickk>

</Bodyy>

</>

: null }


            <Body>

                <Contain>

                    <Fund>
                        <div></div>

                        <Button>
                            <Pay onClick={toggle2}>Pay Hospital</Pay>
                            <Pay style={{marginLeft
                            :"15px", backgroundColor:"#000000", color:"white"}} onClick={toggle2}>Pay Consultant</Pay>
                        </Button>
                    </Fund>

                    <div style={{fontSize:"18px", fontWeight:"700", marginTop:"20px", marginLeft:"20px"}}>History</div>

                    <Top>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>S/N</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Amount</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans ID</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Email</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Scenario</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Time</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Date</Names>
                    </Top>

                    <Top>
                        <Names>1</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>jamesdayo@test.com</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>

                    <Top>
                        <Names>2</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>jamesdayo@test.com</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>

                    <Top>
                        <Names>3</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>jamesdayo@test.com</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>


                </Contain>

            </Body>

        </div>
    )
}

export default DashTransPage;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;


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

const Here = styled.input`
width: 96%;
height: 42px;
border-radius: 7px 7px 7px 0;
padding-left: 10px;
`;

const Label = styled.div`
margin-top: 30px;
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
margin-bottom: 40px;
`;

const Save = styled.div`
// color: #a8ff37;
font-size: 23px;
font-weight: 700;
`;

const Topp = styled.div`
margin-top: 60px;
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
background-color: #F4511E;
color: white;
font-weight: 700;
border-radius: 5px;
cursor: pointer;
border: none;
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
