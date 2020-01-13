import React, {useState} from 'react';
import SignUpForm from './SignUpForm.js'
import Button from './Button.js'
import styled from 'styled-components'
import Container from '../components/Container.js'
import { aqua} from '../components/Colors.js'

const Style = styled.div`
  
`;


function Signup(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [guest, setGuest] = useState('');

  	const handleSubmit = (isGuest) => {
    console.log('submiting form'); 
		fetch('http://localhost:3000/register', {
			method: 'post',
			headers: {'Content-type': 'application/json'},
			body: JSON.stringify({
				email: email,
				password: password,
				guest: isGuest
			})
		})
		.then(response => response.json())
		.then(user => {
      console.log(user)		
			if (user.user_id) {
        console.log(user);
 				props.signIn();
				props.loadUser(user);	
				props.toLists();
			} else {
        console.log('NO USER_ID')
      }
		})	
  	};

    const setAsGuest = () => {

    }

  	return (
    <Style className="Signup">
	    <Container>
	    	<SignUpForm>
          	<h1>Sign up</h1>
          	<div id='form'>
          	<div>

            <div className='row'>
            <label>Email address</label>
            <input onChange={(e)=>{setEmail(e.target.value)} } type="email" placeholder="Enter email" ></input>
            </div>
            <div className='row'>
            <label>Password</label>
            <input onChange={(e)=>{setPassword(e.target.value)}} placeholder="Password"></input>
            </div>
            <div className='row'>
            <Button onClick={()=>{ handleSubmit(false)}}>signup</Button>
            </div>
            <div className='row'>
            <Button bg={aqua} onClick={()=>{ handleSubmit(true) }}>continue as guest</Button>
            </div>
            <div className='row'>
            <p>Already have an account? <a href='/login'>Login</a></p>
            </div>            
         	</div>
          	</div>
        	</SignUpForm>
		</Container>
    </Style>
  );
}

export default Signup;
