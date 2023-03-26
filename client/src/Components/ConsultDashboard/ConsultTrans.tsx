import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";


const ConsultTransactions = () => {

    return(
        <>

            <Body>

                <Contain>

                    <div style={{fontSize:"18px", fontWeight:"700", marginTop:"30px", marginLeft:"30px"}}>History</div>

                    <Top>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>S/N</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Amount</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans ID</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Patient</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Scenario</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Time</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Date</Names>
                    </Top>

                    <Top>
                        <Names>1</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>James Dayo</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>

                    <Top>
                        <Names>2</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>Bimbo Ada</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>

                    <Top>
                        <Names>3</Names>
                        <Names>20,000.00</Names>
                        <Names>234rg567yhfxx1235</Names>
                        <Names>Musa Ali</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                    </Top>


                </Contain>

            </Body>

        </>
    )
}

export default ConsultTransactions;

const See = styled.div`
font-size: 12px;
font-weight: 700;
// font-weight: 650;
// color: rgba(123, 126, 126, 0.992);
// color: white;
cursor: pointer;
margin-left: 30px;
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
