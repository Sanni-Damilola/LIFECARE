import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";


const DashHMO = () => {

    return(
        <div>


            <Body>

                <Contain>

                    <Plan>An Health Plan that provide the flexibility and affordability you desire, while offering increasing level of benefits.</Plan>

                    <Plan2>CHOOSE FROM OUR VARIOUS HMO PLANS</Plan2>

                    <Cards>

                        <Card>
                            <CardImg src="/images/individual.jpg" />

                            <Text>Individual</Text>
                        </Card>

                        <Card>
                            <CardImg src="/images/couple.jpg" />

                            <Text>Couples</Text>
                        </Card>

                        <Card>
                            <CardImg src="/images/family.jpg" />

                            <Text>Family</Text>
                        </Card>

                    </Cards>

                </Contain>

            </Body>

        </div>
    )
}

export default DashHMO;

// const Fund = styled.div``;

// const Fund = styled.div``;

// const Fund = styled.div``;

const Plan2 = styled.div`
font-size: 17px;
font-weight: 700;
margin-top: 20px;
// margin-left: 30px;
color: #F4511E;
`;

const Text = styled.div`
font-size: 14px;
font-weight: 700;
color: white;
// color: #000000;
position: absolute;
top: 20px;
left: 15px;

:hover{
    color: #000000;
}
`;

const CardImg = styled.img`
width: 100%;
height: 100%:
`;

const Plan = styled.div`
font-size: 14px;
font-weight: 700;
text-align: center;
width: 50%;
margin-top: 40px;
`;

const Card = styled.div`
// width: 260px;
width: 31%;
height: 260px;
border-radius: 10px 10px 10px 0;
box-shadow: 0 0 3px gray;
overflow: hidden;
position: relative;
cursor: pointer;
`;

const Cards = styled.div`
width: 93%;
display: flex;
flex-wrap: wrap;
margin-top: 20px;
// margin-left: 20px;
justify-content: space-between;
// gap: 2rem;
`;

const Contain = styled.div`
width: 95%;
height: 100%;
background-color: white;
border-radius: 10px 0 10px 0;
display: flex;
gap: 1rem;
flex-direction: column;
align-items: center;
margin-top: 20px;
padding-bottom: 30px; 
`;

const Body = styled.div`
width: 100%;
display: flex;
justify-content: center;
// align-items: center;
`;
