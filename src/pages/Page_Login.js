import React from 'react';
import Container from '../components/Container.js'
import {Login} from '../components'


function Page_login(props) {
  	return (
    	<Container flexdirection='column' margin='0px' >
    		<Login signIn={props.signIn} loadUser={props.loadUser} toHome={props.toHome} toLists={props.toLists}/>
    	</Container>
  );
}

export default Page_login;
