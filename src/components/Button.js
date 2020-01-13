import styled from 'styled-components';

export default styled.button`
	background-color: ${props => props.bg ? props.bg : '#FAFAFA'};
	border: 2px solid #FFFFFF;
	border-color: ${props => props.bg ? props.bg : '#FAFAFA'};
	color: #393939;
	font-size: 1rem;
	font-weight: bold;
	padding: 5px 10px 5px 10px;
	height: auto;
	border-radius: 5px;
	margin-top: auto; margin-bottom: auto;
	transition: all 1s;

	&:hover {
		background-color: #00FFB7;
		border-color:#00FFAF
		cursor: pointer;		
	}
`;
