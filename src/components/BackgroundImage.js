import styled from 'styled-components';

export default styled.div`
  	background-image: url(${props => props.bg ? props.bg : null});
  	background-attachment: ${props => props.fixed ? 'fixed' : null};
  	background-position: center;
  	background-size: cover;
  	height: 100%;	
    width: auto;
    padding: 0px;
  	display: flex;
  	flex-direction: column;
    box-shadow: inset 0px -44px 24px -37px rgba(0,0,0,0.05);
    margin: 0px;
  	Button {
  		margin-top: auto; margin-bottom: auto;
  	}

    @media screen and (max-width: 500px) {

    }


`;
