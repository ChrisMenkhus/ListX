import styled from 'styled-components';

export default styled.div`
    display: flex; flex-direction: column;
    flex-wrap: wrap;
    font-size: 1rem;
    background-color: #222;
    color: white;
    margin-bottom: 200px;
    padding-top: 40px;
    padding-bottom: 40px;
    width: 400px;
    margin-left: auto; margin-right: auto;
    border-radius: 3px;
    box-shadow: 0px 0px 24px 2px rgba(0,0,0,0.2);
    align-items: center;
    justify-content: center;

    h1 {
    	color: #EFEFEF;
    	font-weight: bold;
    	font-size: 2rem;
    }

    #form {
	    .row {
	    	width: 100%;
	    	display: flex; flex-direction: row;
	    	margin-bottom: 20px;
	    }  	
    	label {
    		
    		margin-left: 10px;
    	}
    	input {
    		background-color: #333;
    		border: 0px;
    		margin-left: auto;
    		color: white;
    		text-align: center;
            width: 200px;
    	}
    	Button {
    		margin-left: auto; margin-right: auto;
    		margin-top: 20px;
    		font-size: 1.2rem;
            width: 80%;
    	}
        a {
            background-color: transparent;
            border: none;
            font-size: 1rem;
            color: #47FFC4;
            margin: 0px; padding: 0px;
        }
        p {
            text-align: center;
            margin-left: auto; margin-right: auto;
        }
    }
`;
