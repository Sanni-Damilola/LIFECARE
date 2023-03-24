import React from "react";
import styled from "styled-components";

const DashBoardHome = () => {
	return (
		<Container>
			<Content>Dashboard home</Content>
		</Container>
	);
};

export default DashBoardHome;

const Content = styled.div`
	margin-top: 40px;
	margin-left: 20px;
`;

const Container = styled.div`
	width: calc(100% - 275px);
	min-height: 100vh;
	// background-color: #6C63FF;
`;
