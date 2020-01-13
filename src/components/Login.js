import React, {useState} from 'react';
import SignUpForm from './SignUpForm.js'
import Button from './Button.js'
import styled from 'styled-components'
import Container from '../components/Container.js'

const Style = styled.div`

`;


function Login(props) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

    const handleSubmit = event => {
    fetch('http://localhost:3000/signin', {
      method: 'post',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.user_id) {
        props.signIn();
        props.loadUser(user); 
        props.toLists();      
      }
    })  
    };


  	return (
    <Style className="Login">
	    <Container>
	    	<SignUpForm>
          	<h1>Login</h1>
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
            <Button onClick={()=>{handleSubmit()}}>login</Button>
            </div>
            <div className='row'>
            <p>dont have an account? <a href='/'>create one</a></p>
            </div>            
         	</div>
          	</div>
        	</SignUpForm>
		</Container>
    </Style>
  );
}

export default Login;
