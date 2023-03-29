import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserData } from "../interface/interface";
import { UseAppDispach, useAppSelector } from "../Global/Store";
import { User } from "../Global/ReduxState";
import { payTobank, sendToSpecialist } from "../Api/Api";
import axios from "axios";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import { GetOneUser } from "../Api/Api";
import { TbCurrencyNaira } from "react-icons/tb"
import { useQueryClient } from "@tanstack/react-query";


const lifeUrl = "https://codecrusaderslifecare.onrender.com/api";


const DashTransPage = () => {

    const [showWallet, setShowWallet] = useState(false);
    const [showWithdraw, setShowWithdraw] = useState(false);

    const walletShow = () => {
        setShowWallet(!showWallet)
    }

    const withdrawShow = () => {
        setShowWithdraw(!showWithdraw)
    }

    const userOne = useAppSelector((state) => state?.currentUser);
  
    const {data} = useQuery({
        queryKey: ["post"],
        queryFn: () => GetOneUser(userOne?._id),
      })
    //   console.log(data)

    const schema = yup
      .object({
        accountNumber: yup.number().required(),
        amount: yup.number().required()
      })
      .required();
  
    type formData = yup.InferType<typeof schema>;

    const {
        handleSubmit,
        formState: { errors },
        reset,
        register,
    } = useForm<formData>({
        resolver: yupResolver(schema),
    });

    const [quick, setQuick] = React.useState(false)

    const toggle2 = () => {
        setQuick(!quick)
    }

    const onSubmit = handleSubmit(async (data) => {
        await axios
            // .patch(`${lifeUrl}/sendtospecialist/${user?._id}/${user?._id}`, data)
            .patch(`${lifeUrl}/sendtospecialist/${userOne?._id}/${userOne?._id}`, data)
            .then((res) => {
                    Swal.fire({
                    title: "successful",
                    icon: "success"
                });
                // console.log(res.data)
            })
            .catch((err) => {
                Swal.fire({
                    title: "an error occured",
                    icon: "error",
                    text: `${err.response?.data?.message}`,
                })
            })
            reset();
    })

    const sendToFriend = handleSubmit(async (data) => {
        await axios
            // .patch(`${lifeUrl}/sendtospecialist/${user?._id}`, data)
            .patch(`${lifeUrl}/transfer/${userOne?._id}`, data)
            .then((res) => {
                    Swal.fire({
                    title: "successful",
                    icon: "success"
                });
                // console.log(res.data)
            })
            .catch((err) => {
                Swal.fire({
                    title: "an error occured",
                    icon: "error",
                    text: `${err.response?.data?.message}`,
                })
            })
            reset();
    })


    interface iData {
        amount: number;
    
      }

  const User = useAppSelector((state: any) => state?.currentUser);

      const queryClient = useQueryClient();
   
    const posting = useMutation({
      mutationFn: (data: iData) => {
        return payTobank(data, User._id)
      },
  
      onSuccess: (myData: any) => {
        
        queryClient.invalidateQueries(["post"]);
        ;
        
      },
    });

    const [amount, setAmount] = React.useState(0)
    const handleSubit2 = () => {
        posting.mutate(
            {
                amount
            }
        );
        Swal.fire({
        title: "withdrawal successful",
        icon: "success"
    })
    .catch((err) => {
        Swal.fire({
            title: "an error occured",
            icon: "error",
            text: `${err.response?.data?.message}`,
        })
    });
    reset();

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

                <Here type=""
                {...register("accountNumber")}  
                placeholder='Tap here and enter .. (e.g 0123456789)'/>
            </Tap>

            <Tap>
                <Label>Enter Amount</Label>

                <Here type=""
                {...register("amount")} 
                placeholder='Tap here and enter .. (e.g 5000)'/>
            </Tap>

        </Topp>

        <Proceed onClick={() => {
            onSubmit()
        }}>Make Payment</Proceed>

    </Quickk>

</Bodyy>

</>

: null }


            <Body>

                <Contain>

                    <Fundd>
                        <div></div>

                        <Button>
                            <Pay onClick={toggle2}>Pay Hospital</Pay>
                            <Pay style={{marginLeft
                            :"15px", backgroundColor:"#000000", color:"white"}} onClick={toggle2}>Pay Consultant</Pay>
                            <Pay style={{marginLeft
                            :"15px"}} onClick={walletShow}>Send To Friend</Pay>
                            <Pay style={{marginLeft
                            :"15px", backgroundColor:"#000000", color:"white"}} onClick={withdrawShow}>Withdraw</Pay>
                        </Button>
                    </Fundd>

                    {
                        showWithdraw ? 

                        <Fundy >
                        <div></div>

                        <Button>
                            {/* <Pay2 type="text"   
                            {...register("accountNumber")}placeholder="Account Number" /> */}

                            <Pay2 onChange={(e) => {
                                setAmount(parseInt(e.target.value))
                                // console.log(parseInt(e.target.value));
                                
                            }} type="number"   
            
                            placeholder="Amount" />

                            <PayBut onClick={handleSubit2} style={{background: 'green'}} >Send</PayBut>
                        </Button>
                    </Fundy>
                    :
                    null
                    }

                    {
                        showWallet ? 

                        <Fund onSubmit={sendToFriend}>
                        <div></div>

                        <Button>
                            <Pay2 type="text"   
                            {...register("accountNumber")}placeholder="Account Number" />

                            <Pay2  type="number"   
                            {...register("amount")}  
                            placeholder="Amount" />
                            <PayBut type="submit">Send</PayBut>
                        </Button>
                    </Fund>
                    :
                    null
                    }

                    <div style={{fontSize:"18px", fontWeight:"700", marginTop:"20px", marginLeft:"20px"}}>History</div>

                    <Top>
                        {/* <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>S/N</Names> */}
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Amount</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans ID</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans Type</Names>
                        {/* <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Scenario</Names> */}
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Time</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Date</Names>
                    </Top>

                    {
                    data?.data?.history?.map((el: any) => (
                    <Top key={el._id} >
                    {/* <Names style={{width:"3%"}}>1</Names> */}
                    <Names><TbCurrencyNaira />
                        {/* {
                        data?.data?.history[0].
                        }  */}
                        20,000
                    </Names>
                    <Names>
                        {/* {
                        data?.data?.history[0].transactionRefrence
                        } */}
                        {
                        el.transactionRefrence
                        }
                    </Names>
                    <Names>
                        {
                        el.transactionType
                        }
                    </Names>
                    <Names>
                        {
                        el.time
                        }
                    </Names>
                    <Names>
                        {
                        el.date
                        }
                    </Names>
                    </Top>
                    ))
                    }

                    

{
                    data?.data?.history?.map((el: any) => (

                    <MobTop key={el._id} 
                    // style={{backgroundColor:"#a8ff37"}}
                    >
                        <Amount>
                            <Trans><TbCurrencyNaira />
                                {/* {
                                data?.data?.history[0].
                                }  */}
                                20,000
                            </Trans>
                            <Trans>
                                {
                                el.transactionRefrence
                                }
                            </Trans>
                        </Amount>

                        <Amount>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>
                                {
                                el.transactionType
                                }
                            </Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>
                                {
                                el.date
                                }
                            </Trans>
                        </Amount>
                    </MobTop>
                    ))
                    }

                    

                    {/* <MobTop 
                    // style={{backgroundColor:"#a8ff37"}}
                    >
                        <Amount>
                            <Trans>N10,000</Trans>
                            <Trans>shdg212jc89u8</Trans>
                        </Amount>

                        <Amount>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>01:13pm</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>Mar. 02, 2023</Trans>
                        </Amount>
                    </MobTop> */}


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

const PayBut = styled.button`
height: 40px;
width: 100px;
border-radius: 5px;
border: none;
background-color: #000000;
color: white;
cursor: pointer;
`;

const Pay2 = styled.input`
height: 40px;
width: 160px;
margin-bottom: 6px;
border-radius: 8px;
margin-right: 7px;
padding-left: 5px;
cursor:pointer;
`;

const Trans = styled.h5`
font-size: 13px;
font-weight: 700;
`;

const Amount = styled.div`
width: 90%;
height: 25px;
display: flex;
justify-content: space-between;
align-items: center;
margin-left: 20px;
`;

const MobTop = styled.div`
display: none;

@media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    border: none;
    border-radius: 12px;
    // border-bottom: 2px solid #a8ff37;
    border-bottom: 1px solid #000000;
    // border-top: 1px solid #000000;
    margin-bottom: 20px;
}
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

@media screen and (max-width: 768px) {
    width: 260px;
}
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

@media screen and (max-width: 768px) {
    width: 100%;
}
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

@media screen and (max-width: 375px) {
    font-size: 12px;
}
`;

const Button = styled.div`
gap: rem;
margin-top: 10px;
`;

const Fundd = styled.div`
width: 90%;
margin-left: 20px;
margin-top: 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`;

const Fundy = styled.div`
width: 90%;
margin-left: 20px;
margin-top: 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
`;

const Fund = styled.form`
width: 90%;
margin-left: 20px;
margin-top: 20px;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
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

@media screen and (max-width: 768px) {
    width: 15%;
    font-size: 11px;
}
`;

const Top = styled.div`
width: 95%;
margin-top: 10px;
margin-left: 20px;
display: flex;
justify-content: space-around;
align-items: flex-start;
background-color: #eaeaea;
padding-top: 10px;
padding-bottom: 10px;
 
@media screen and (max-width: 425px) {
    display: none;
}
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
 
@media screen and (max-width: 425px) {
    width: 85%;
}
`;

const Body = styled.div`
width: 100%;
display: flex;
justify-content: center;
// align-items: center;
`;