import styled from 'styled-components';

export default styled.div`
	padding: ${props => props.padding ? props.padding : '0px'};
  	background: ${props => props.bg ? props.bg : null};
  	color: #222;
  	text-align: center;
  	font-size: 2rem;
  	font-weight: bold;
  	width: 100vw;
  	height: ${props => props.height ? props.height : null};
  	
  
  display: flex;
  flex-direction: ${props => props.flexdirection ? props.flexdirection : 'column'};
  flex-wrap: wrap;
  align-items: center;
    justify-content: center;

  padding: ${props => props.padding ? props.padding : '20px'}; 
  margin: ${props => props.margin ? props.margin : '25px auto 25px auto'}; 
  width: ${props => props.width ? props.width : 'auto'};
  height: ${props => props.height ? props.height : 'auto'};
  background-color: ${props => props.bg ? props.bg : 'transparent'};
  color: white;
  text-align: ${props => props.align ? props.align : 'center'};

  font-size: 0.4rem;


`;
