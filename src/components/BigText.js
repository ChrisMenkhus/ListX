import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
  	font-size: ${props => props.fontsize ? props.fontsize : '1rem'};
  	font-weight: bold;
  	color: #F6F6F6;
  	
  	width: auto;
  	margin-left: auto; margin-right: auto;
  	padding:0px 80px 0px 80px;
  	justify-self: center;
  	margin-bottom: 40px;
    text-align: ${props => props.align ? props.align : 'center'};
`;
