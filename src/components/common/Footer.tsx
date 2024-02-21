import React from 'react';
import styled from 'styled-components';

const Footer = () => {
	return (
		<FooterStyle>
			<p>copyright(c) 2024 hyemin</p>
		</FooterStyle>
	);
};

const FooterStyle = styled.footer`
	width: 100%;
	padding: 1em 0;
	background-color: #333;
	p {
		font-size: 0.8em;
		color: #ccc;
		text-align: center;
	}
`;

export default Footer;
