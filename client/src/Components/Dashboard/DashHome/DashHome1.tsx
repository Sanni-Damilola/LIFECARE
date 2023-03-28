/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineDollar, AiFillEyeInvisible, AiFillEye, AiFillStar } from "react-icons/ai";
import { MdBloodtype, MdOutlineBloodtype } from "react-icons/md";
import { useAppSelector } from "../../Global/Store";
import { useQuery } from "@tanstack/react-query";
import { GetOneUser } from "../../Api/Api";
import { useParams } from "react-router-dom";
import { TbCurrencyNaira } from "react-icons/tb"


const DashHome1 = () => {
  const getUser = useAppSelector((state: any) => state?.currentUser);

    const {data} = useQuery({
      queryKey: ["post"],
      queryFn: () => GetOneUser(getUser?._id),
    })
    console.log(data)

  const [see, setSee] = useState(false)
  const [walletSee, setWalletSee] = useState(false)

  const invisible = () => {
    setSee(!see)
  }

  const seeWallet = () => {
    setWalletSee(!walletSee)
  }

  return (
    <>
      <Body>
        <Contain>
          <Left>
            <Up>
              <Bal>


                <Acct>Balance
                </Acct>

                  { 
                  see ?  (
                    
                   <Icn onClick={invisible}>
                      <AiFillEyeInvisible />
                    </Icn>
                  ) : (
                    <Icn onClick={invisible}>
                      <AiFillEye />
                   </Icn>
                  )
                  } 

                {
                      see ? (

                        <Acct1><TbCurrencyNaira />
                          {
                            data?.data?.wallet[0]?.balance
                          }
                        </Acct1>)

                         : 

                         (
                          <Star>
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                          <AiFillStar />
                      </Star>
                        )
                    }

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
                <Acct2>
                  Wallet ID
                  <Ico>
                    <AiOutlineDollar />
                  </Ico>
                </Acct2>

                { 
                  walletSee ?  (
                    
                   <Icnn onClick={seeWallet}>
                      <AiFillEyeInvisible />
                    </Icnn>
                  ) : (
                    <Icnn onClick={seeWallet}>
                      <AiFillEye />
                   </Icnn>
                  )
                  } 

                {
                      walletSee ? (
                        <Acct3 style={{marginTop:"0", marginLeft:"20px"}}>
                          {
                          data?.data?.accountNumber
                        }
                        </Acct3>
                      )
                         : 

                         (
                          <Star style={{marginLeft:"20px"}}>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                          </Star>
                        )
                    }
              </Wall>

              <Wall1>
                <Acct2>
                  Eco Bank
                  <Ico style={{ backgroundColor: "#a8ff37" }}>
                    <AiOutlineDollar />
                  </Ico>
                </Acct2>

                

                <Acct3>2023456789</Acct3>
              </Wall1>
            </Top>

            <Top>
              <Wall2>
                <Blood>
                  <Blood1>Blood Type</Blood1>

                  <Ico style={{ backgroundColor: "#a8ff37" }}>
                    <MdBloodtype />
                  </Ico>
                </Blood>

                <Blood2>
                  {
                    data?.data?.bloodGroup.toUpperCase()
                  }
                  </Blood2>
              </Wall2>

              <Wall3>
                <Blood>
                  <Blood1>Genotype</Blood1>

                  <Ico style={{ backgroundColor: "#a8ff37" }}>
                    <MdOutlineBloodtype />
                  </Ico>
                </Blood>

                <Blood2>
                  {
                    data?.data?.genotype.toUpperCase()
                  }
                </Blood2>
              </Wall3>
            </Top>
          </Right>
        </Contain>
      </Body>
    </>
  );
};

export default DashHome1;

// const Body = styled.div``;

const Icnn = styled.div`
font-size: 25px;
color: white;
margin-left: 20px;
width: 25px;
`;

const Star = styled.div`
font-size: 18px;
`;

const Icn = styled.div`
font-size: 25px;
color: #86ea03;
margin-left: 10px;
margin-top: 5px;
cursor: pointer;
margin-left: -1px;
`;

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

@media screen and (max-width: 768px) {
    margin-left: 15px;
}
`;

const Blood1 = styled.div`
font-weight: 700;

  @media screen and (max-width: 375px) {
    font-size: 13px;
  }
`;

const Blood = styled.div`
margin-left: 20px;
margin-right: 20px;
margin-top: 10px;
width: 90%;
display: flex;
justify-content: space-between;
align-items: center;

@media screen and (max-width: 768px) {
    margin-left: 15px;
    margin-right: 10px;
}

@media screen and (max-width: 375px) {
    width: 85%;
}
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

  @media screen and (max-width: 375px) {
font-size: 20px;
width: 30px;
height: 30px;
  }
`;

const Acct3 = styled.div`
// color: white;
margin-left: 15px;
margin-top: 30px;
font-weight: 700;
font-size: 22px;

  @media screen and (max-width: 375px) {
    font-size: 17px;
  }

  @media screen and (max-width: 320px) {
    font-size: 15px;
  }
`;

const Acct2 = styled.div`
// color: white;
margin-left: 20px;
margin-right: 20px;
margin-top: 15px;
font-weight: 700;
display: flex;
justify-content: space-between;

  @media screen and (max-width: 375px) {
    font-size: 13px;
    margin-right: 10px;
  }
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

  @media screen and (max-width: 375px) {
    height: 120px;
  }
`;

const Wall = styled.div`
width: 49%;
height: 140px;
background-color: #a8ff37;
// background-color: cyan;
// background-color: rgb(0, 33, 37);
border-radius: 10px 0 10px 0;

  @media screen and (max-width: 375px) {
    height: 120px;
  }
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

@media screen and (max-width: 425px) {
    width: 90%;
}
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
font-size: 25px;
font-weight: 700;
color: rgb(0, 33, 37);

@media screen and (max-width: 425px) {
  font-size: 20px;
}
`;

const Acct = styled.div`
font-size: 20px;
font-weight: 700;
margin-bottom: 10px;
display: flex;
align-items: center;
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

@media screen and (max-width: 425px) {
    width: 85%;
    margin-bottom: 15px;
}
`;

const Contain = styled.div`
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
flex-wrap: wrap;

@media screen and (max-width: 425px) {
    justify-content: center;
}
`;

const Body = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
margin-top: 30px;
`;
