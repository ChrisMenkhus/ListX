import styled from 'styled-components';

export default styled.div`
  	height: 45px;
  	width: 100%;
  	top: 0;
  	position: relative;
  	display: flex;
  	flex-direction: row;
  	padding: 0;
  	margin: 0;
  	user-select: none;
    box-shadow: 0px 0px 24px 2px rgba(0,0,0,0.2);

  	img {
  		margin: 0px; padding: 0px;
  		margin-top: auto; margin-bottom: auto;
  		height: 28px;
  		margin-left: 40px;
  	}

  	.left {
  		color: #444;
  		margin-top: 3px;
  		margin-left: 10px;
  		
      background-color: transparent;
      border: 0px;
  	}

    .right {
      color: #444;
      margin-top: 3px;
      margin-left: auto;
      margin-right: 10px;
      background-color: transparent;
      border: 0px;
    }

  	.blue {
  		color: #47FFC4;
  	}

	Button {
		margin-right: 40px;
	}


`;
