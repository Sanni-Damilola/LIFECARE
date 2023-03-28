import React from "react";
import { useRoutes } from "react-router";
import styled from "styled-components";
import ConsultAppointment from "../ConsultDashboard/ConsultAppoint";
import ConsultHeader from "../ConsultDashboard/ConsultHeader";
import ConsultHomeComp from "../ConsultDashboard/ConsultHome/ConsultHomeComp";
import ConsultSideBar from "../ConsultDashboard/ConsultSideBar";
import ConsultTransactions from "../ConsultDashboard/ConsultTrans";
import ConsultWithdraw from "../ConsultDashboard/ConsultWithdraw";


const ConsultRoutes = () => {

    
    // const agentSelector = useAppSelector((state) => state.Agent)

    const element = useRoutes([
        {
            path: "/consulthome",
            element: <ConsultHomeComp />,
        },
        {
            path: "/consultappointment",
            element: <ConsultAppointment />,
        },
        {
            path: "/consulttransactions",
            element: <ConsultTransactions />,
        },
        {
            path: "/consultwithdraw",
            element: <ConsultWithdraw />,
        },
        // {
        //     path: "/settings",
        //     element: <DashSettings />,
        // },
    ])

    return (
        <>

            

                    <Body>
                        <Head>
                         <ConsultHeader />
                        </Head>
                        
                        <Bottom>

                        <Side>
                            <ConsultSideBar />
                        </Side>

                        <DashRoute>
                            {element}
                        </DashRoute>

                        </Bottom>

                    </Body>

        </>
    )
}

export default ConsultRoutes;


// const DashHead = styled.div``;

const DashRoute = styled.div`
width: calc(100% - 275px);
height: 100%;

@media screen and (max-width: 768px) {
    width: 100%;
}
`;

const Side = styled.div`
width: 250px;
height: 100vh;
/* postition: fixed; */

@media screen and (max-width: 768px) {
    display: none;
}
`;

const Bottom = styled.div`
width: 100%;
display: flex;
`;

const Head = styled.div`
width: 100%;
height: 65px;
`;

const Body = styled.div`
width: 100%;
min-height: 100vh;
overflow: hidden;
background-color: #eaeaea;
`;



