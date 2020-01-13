import styled from 'styled-components';

export default styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
    justify-content: center;
    margin-top: 33px;
	padding: 20px;
	background-color: #222;
	width: fit-content;
	border: 2px solid #232323;
	border-radius: 12px;
	text-align: center;
	color: white;
	margin-left: auto;
	margin-right: auto;





	h1 {
		text-align: ${props => props.align ? props.align : 'center'};
		width: 100%;				
	}



	h3 {
		text-align: ${props => props.align ? props.align : 'center'};
		width: 100%;				
	}



	.row {
		display: flex; 
		flex-direction: row;
		line-height: 25px;
		margin: 10px;
		font-size: 1rem;
		align-items: left;
  		justify-content: left;
  		width: 100%;
  		
	}

	h2 {
		font-size: 1.5rem;
		text-align: ${props => props.align ? props.align : 'center'};
	}

	h3 h4 {
		margin: 0px;
		padding: 0px;
		font-size: 1rem;
		margin-left: auto;
	}
	p {
		padding: 20px;
	}
`;
