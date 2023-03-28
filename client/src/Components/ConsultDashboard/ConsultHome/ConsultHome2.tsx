import React from "react";
import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import { GetOneSpecialist } from "../../Api/Api";
import { useAppSelector } from "../../Global/Store";
import { TbCurrencyNaira } from "react-icons/tb";


const ConsultHome2 = () => {
    const getConsult = useAppSelector((state: any) => state?.consultUser);
  
    const {data} = useQuery({
      queryKey: ["post"],
      queryFn: () => GetOneSpecialist(getConsult?._id),
    })
    console.log(data)

    return(
        <>

            <Body>

                <Contain>

                    <div style={{fontSize:"18px", fontWeight:"700", marginTop:"30px", marginLeft:"20px"}}>History</div>

                    <Top>
                        {/* <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000", width:"5%"}}>S/N</Names> */}
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Amount</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Patient</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans Type</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Time</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Date</Names>
                        <Names style={{fontSize:"14px", fontWeight:"700", color:"#000000"}}>Trans ID</Names>
                    </Top>

                        {
                        data?.data?.history?.map((el: any) => (
                        <Top key={el._id} >
                        {/* <Names style={{width:"3%"}}>1</Names> */}
                        <Names><TbCurrencyNaira />
                            {
                                el.amount
                            } 
                        </Names>
                        <Names>
                            {/* {
                                el.transactionRefrence
                            } */}
                            Sender
                        </Names>
                        <Names>
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

                    {/* <Top>
                        <Names style={{ width:"5%"}}>2</Names>
                        <Names>20,000.00</Names>
                        <Names>Bimbo Ada</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                        <Names>234rg567yhfxx1235</Names>
                    </Top>

                    <Top>
                        <Names style={{ width:"5%"}}>3</Names>
                        <Names>20,000.00</Names>
                        <Names>Musa Ali</Names>
                        <Names>Emergency</Names>
                        <Names>12:30am</Names>
                        <Names>Mar. 10, 2023</Names>
                        <Names>234rg567yhfxx1235</Names>
                    </Top> */}

                    
                    <MobTop 
                    // style={{backgroundColor:"#a8ff37"}}
                    >
                        <Amount>
                            <Trans style={{color:"white", padding:"5px", backgroundColor:"black", borderRadius:"5px"}}><span style={{color:"#a8ff37"}}>Amount:</span> 20,000.00</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>Emergency</Trans>
                        </Amount>

                        <Amount>
                            <Trans><span style={{color:"rgba(123, 126, 126, 0.992"}}>Name:</span> James Dayo</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>Mar. 10, 2023</Trans>
                        </Amount>

                        <Amount>
                            <Trans><span style={{color:"rgba(123, 126, 126, 0.992"}}>Trans ID:</span> 234rg567yhfxx1235</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>12:30am</Trans>
                        </Amount>
                    </MobTop>
                    
                    <MobTop 
                    // style={{backgroundColor:"#a8ff37"}}
                    >
                        <Amount>
                            <Trans style={{color:"white", padding:"5px", backgroundColor:"black", borderRadius:"5px"}}><span style={{color:"#a8ff37"}}>Amount:</span> 20,000.00</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>Emergency</Trans>
                        </Amount>

                        <Amount>
                            <Trans style={{}}><span style={{}}>Name:</span> Bimbo Ada</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>Mar. 10, 2023</Trans>
                        </Amount>

                        <Amount>
                            <Trans style={{}}><span style={{}}>Trans ID:</span> 234rg567yhfxx1235</Trans>
                            <Trans style={{color:"rgba(123, 126, 126, 0.992)"}}>12:30am</Trans>
                        </Amount>
                    </MobTop>

                    <NavLink style={{textDecoration:"none", color:""}} to="/consulttransactions"><See>See All Transactions</See></NavLink>


                </Contain>

            </Body>

        </>
    )
}

export default ConsultHome2;

const Trans = styled.h5`
font-size: 13px;
font-weight: 700;

@media screen and (max-width: 320px) {
    font-size: 12px;
}
`;

const Amount = styled.div`
width: 90%;
display: flex;
height: 19px;
justify-content: space-between;
align-items: center;
margin-left: 20px;

@media screen and (max-width: 320px) {
    margin-left: 15px;
}
`;

const MobTop = styled.div`
display: none;

@media screen and (max-width: 425px) {
    display: flex;
    flex-direction: column;
    border: none;
    // border-radius: 12px;
    // border-bottom: 2px solid #a8ff37;
    border-bottom: 1px solid rgba(123, 126, 126, 0.992);
    // border-top: 1px solid #000000;
    // margin-top: 20px;
    padding-bottom: 10px;
}
`;

const See = styled.div`
font-size: 12px;
font-weight: 700;
// font-weight: 650;
// color: rgba(123, 126, 126, 0.992);
// color: white;
cursor: pointer;
margin-left: 30px;
margin-top: 20px;

@media screen and (max-width: 768px) {
    margin-left: 20px;
}
`;

const Names = styled.div`
font-size: 12px;
font-weight: 700;
color: rgba(123, 126, 126, 0.992);
width: 12%;

@media screen and (max-width: 768px) {
    font-size: 11px;
    width: 14%;
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
