import React from "react";
import styled from "styled-components";

const DashFundWallet = () => {
  return (
    <div>
      <Head>

        <Side>

            <Tap>
                <Label>Enter Amount</Label>

                <Here type="" placeholder='Tap here and enter .. (e.g 5000)'/>
            </Tap>

            <Proceed>Fund Now</Proceed>

        </Side>

        <Save>

            <Save1>You can select from our plans that allows you to save automatically from you Bank account.</Save1>

            <Select1>
                <Label>Select Savings Plan</Label>
                <Select>
                    <option value="">--Select--</option>
                    <option value="">Monthly</option>
                    <option value="">Weekly</option>
                    <option value="">Daily</option>
                </Select>
            </Select1>

            <Tap>
                <Label>Enter Amount</Label>

                <Here type="" placeholder='Tap here and enter .. (e.g 5000)'/>
            </Tap>

            {/* <Tap>
                <Label>Select</Label>

                <Here type="time" placeholder=''/>
            </Tap> */}

            <Start>Quick Save</Start>

        </Save>

      </Head>
    </div>
  );
};

export default DashFundWallet;

// const User = styled.div``;

// const User = styled.div``;

const Start = styled.button`
width: 85%;
height: 45px;
border-radius: 7px 7px 7px 0;
margin-top: 25px;
border: none;
background-color: #a8ff37;
// color: white;
font-weight: 700;
`;

const Save1 = styled.div`
font-size: 13px;
font-weight: 700;
text-align: center;
width: 90%;
`;

const Select = styled.select`
width: 100%;
height: 44px;
border-radius: 7px 7px 7px 0;
border: none;
border-bottom: 1px solid #000000;
border-right: 1px solid #000000;
outline: none;
`;

const Select1 = styled.div`
width: 84%;
`;

const Save = styled.form`
width: 300px;
height: 350px;
background-color: white;
border-radius: 10px 0 10px 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
padding: 30px;
`;

const Proceed = styled.button`
cursor: pointer;
width: 85%;
height: 40px;
// color: white;
color: #000000;
background-color: #a8ff37;
margin-bottom: 15px;
margin-top: 15px;
border: none;
border-radius: 7px 7px 7px 0;
font-weight: 700;
`;

const Here = styled.input`
width: 100%;
height: 40px;
border-radius: 7px 7px 7px 0;
border: none;
border-bottom: 1px solid #000000;
border-right: 1px solid #000000;
outline: none;
// padding-left: 5px;
`;

const Label = styled.div`
margin-top: 30px;
margin-bottom: 7px;
font-size: 12px;
font-weight: 700;
// color: #a8ff37;
// color: gray;
`;

const Tap = styled.div`
display: flex;
flex-direction: column; 
width: 80%;
`;

const UserInput = styled.input``;

const Side = styled.form`
width: 300px;
height: 200px;
background-color: white;
border-radius: 10px 0 10px 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-right: 30px;
margin-left: 30px;
`;

const Head = styled.div`
width: 100%;
height: 100vh;
display: flex;
margin-top: 40px;
// justify-content: center;
// align-items: center;
`;
