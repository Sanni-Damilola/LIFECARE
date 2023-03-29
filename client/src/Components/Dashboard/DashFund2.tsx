import React from "react";
import styled from "styled-components";
import { BsFillCreditCardFill, BsQuestionCircleFill } from "react-icons/bs";
import { RiLock2Fill } from "react-icons/ri";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { UserData } from "../interface/interface";
import { UseAppDispach, useAppSelector } from "../Global/Store";
import { User } from "../Global/ReduxState";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { fundFromBank } from "../Api/Api";
import { useDispatch } from "react-redux";
import  Swal  from "sweetalert2";
import axios from "axios";

interface iData {
  name: string;
  amount: number;
  number: string;
  cvv: string;
  expiry_month: string;
  expiry_year: string;
}

const lifeUrl = "https://codecrusaderslifecare.onrender.com/api";

const DashFund = () => {
  const dispatch = UseAppDispach();
  const User = useAppSelector((state: any) => state?.currentUser);

  const schema = yup
    .object({
      amount: yup.number().required(),
      number: yup.string().required(),
      cvv: yup.string().required(),
      expiry_month: yup.string(),
      expiry_year: yup.string(),
      name: yup.string(),
    })
    .required();

  type formData = yup.InferType<typeof schema>;

  // const posting = useMutation({
  //   mutationKey: ["lifecareUser"],
  //   // mutationFn: fundFromBank(User?._id),

  //   onSuccess: (myData: any) => {
  //     dispatch(User(myData.data));
  //     console.log(myData.data)
  //   },
  // });

  // const {
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  //   register,
  // } = useForm<formData>({
  //   resolver: yupResolver(schema),
  // });

  // const pay = () => {

  // }
  
    const {
      handleSubmit,
      formState: { errors },
      reset,
      register,
    } = useForm<formData>({
      resolver: yupResolver(schema),
    });

  const posting = useMutation({
    mutationFn: (data: iData) => {
      return fundFromBank(data, User._id)
    },

    onSuccess: (myData: any) => {
      console.log("yo",myData);
      
    },
  });

  const Submit = handleSubmit((data) => {
    
    posting.mutate(data);

    // console.log("nowm",data);
      Swal.fire({
        title: "successful",
        icon: "success"
    })
    .catch((err) => {
        Swal.fire({
            title: "an error occured",
            icon: "error",
            text: `${err.response?.data?.message}`,
        })
    })
    reset();
    // navigate("/dashboardhome");
  });



 
  return (
    <div>
      <Head>
        <Side>
          <Pay>PAYMENT</Pay>

          <Form onSubmit={Submit} >
            <Icon>
              <BsFillCreditCardFill />
            </Icon>

            <Ngn>Pay</Ngn>

            <Enter>Enter your card information to complete this payment</Enter>

            <Info >
              <Inp>
                <Label>Card Number</Label>
                <Master>
                  <Input value = "5188513618552975" type="number" {...register("number")} />
                  <MasterCard src="/images/master.png" />
                </Master>
              </Inp>

              <Inp
              
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Lab style={{}}>
                  <Label>Expiry Date</Label>
                  <Hold>
                    <Input
                    value = "09"
                    maxLength={2}
                      placeholder="Month"
                      {...register("expiry_month")}
                      style={{
                        width: "50%",
                        backgroundColor: "white",
                        height: "35px",
                        border: "1px solid #4acfb2",
                        borderRadius: "7px 0 0 7px",
                        borderRight: "none",
                      }}
                    />

                    <Input
                    value = "30"
                              maxLength={2}
                      placeholder="year"
                      {...register("expiry_year")}
                      style={{
                        width: "50%",
                        backgroundColor: "white",
                        height: "35px",
                        border: "1px solid #4acfb2",
                        borderLeft: "none",
                      }}
                    />
                  </Hold>
                </Lab>

                <Lab style={{}}>
                  <Label>CVV</Label>
                  <Ques>
                    <Input
                    value = "123"
                      {...register("cvv")}
                      style={{ width: "70%", outline: "none", border: "none" }}
                    />
                    <Iconn>
                      <BsQuestionCircleFill />
                    </Iconn>
                  </Ques>
                </Lab>
              </Inp>

              <Inp>
                <Label>Amount</Label>
                <Master>
                  <Input

                    {...register("amount")}
                    type="number"
                    placeholder="i.e. 50000"
                  />
                  <MasterCard src="" />
                </Master>
              </Inp>
            </Info>

            <But type="submit">
              <Ico>
                <RiLock2Fill />
              </Ico>
              <ButText>Pay</ButText>
            </But>
          </Form>
        </Side>
      </Head>
    </div>
  );
};

export default DashFund;

// const User = styled.div``;

const Hold = styled.div`
  width: 100;
  display: flex;
`;

const ButText = styled.div`
  font-size: 12px;
  font-weight: 800;
`;

const Ico = styled.div`
  font-size: 17px;
  margin-right: 7px;
  margin-top: 3px;
`;

const But = styled.button`
  width: 85%;
  background-color: #4acfb2;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  margin-top: 15px;
  border-radius: 7px;
  color: white;
cursor: pointer
`;

const Iconn = styled.div`
  color: #a7bdcb;
  margin-right: 7px;
  cursor: pointer;
`;

const Ques = styled.div`
  width: 100%;
  background-color: white;
  height: 37px;
  border: 1px solid #4acfb2;
  border-radius: 0 7px 7px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Input = styled.input`
  width: 80%;
  border: none;
  outline: none;
  padding-left: 5px;
`;

const Lab = styled.div`
  width: 50%;
`;

const MasterCard = styled.img`
  width: 11%;
  margin-right: 6px;
`;

const Master = styled.div`
  width: 100%;
  background-color: white;
  height: 37px;
  border-radius: 7px;
  border: 1px solid #4acfb2;
  display: flex;
  justify-content: sapce-between;
  align-items: center;
`;

const Label = styled.div`
  font-size: 13px;
  color: #b2c4ce;
  font-weight: 700;
  margin-bottom: 7px;
`;

const Inp = styled.div`
  width: 85%;
  margin-top: 20px;
`;

const Info = styled.form`
  width: 85%;
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: #f1f6fa;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  // justify-content: space-around;
  align-items: center;
`;

const Enter = styled.div`
  font-size: 12px;
  font-weight: 700;
  text-align: center;
  width: 90%;
  line-height: 19px;
  margin-bottom: 10px;
`;

const Ngn = styled.div`
  font-size: 23px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Icon = styled.div`
  font-size: 35px;
  color: #a76ece;
  margin-top: 20px;
  margin-bottom: 10px;
`;

const Form = styled.form`
  height: calc(100% - 20px);
  background-color: white;
  width: 100%;
  border-radius: 10px;
  z-index: 200;
  margin-top: 27px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  padding-bottom: 40px;
`;

const Pay = styled.div`
  width: 100%;
  background-color: #ff9145;
  height: 30px;
  border-radius: 10px 10px 0 0;
  font-size: 12px;
  color: white;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  padding-bottom: 20px;
`;

const Side = styled.div`
  width: 330px;
  height: 530px;
  // background-color: white;
  // border-radius: 10px 0 10px 0;
  position: relative;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // margin-right: 30px;
  // margin-left: 30px;

  @media screen and (max-width: 330px) {
    width: 300px;
  }
`;

const Head = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  margin-top: 40px;
  justify-content: center;
  // align-items: center;
`;
