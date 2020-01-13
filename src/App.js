import React, {useState,  useEffect} from 'react'
import {Container, Navbar} from './components';
import {BrowserRouter as Router, Switch, Route, Link, Redirect} from 'react-router-dom';
import styled from 'styled-components';
import Cookies from 'js-cookie'
import {Home, Lists, Login} from './pages'
import portalX_badge from './portalX_badge.png'

const Style = styled.div`
  .scrollContainer {
    height: 100vh;
    scroll-behavior: smooth;
    overflow-y: scroll;
    scroll-snap-type: instant;
    .scrollItem {
      scroll-snap-align: start;
    }

    footer {
      p {
        font-size: 1rem;
      }

      .email {
        background-color: transparent; border: none; margin: 0; padding: 0; font-size: 1rem; color: white;
      }      
    }
  }
`;

function App() {

  const [isLogged, setLogged] = useState();
  const [user_id, setUserId] = useState();
  const [email, setEmail] = useState();
  const [redirect, setRedirect] = useState();
 
  const loadUser = (user) => {
    setUserId(user.user_id);
    setEmail(user.email);
    Cookies.set('user_id', user.user_id);
  }

  const signIn = () => {
    setLogged(true);
    console.log('SIGNED IN')
  }

  const signOut = () => {
    setLogged(false);
    setUserId('');
    setEmail('');
    Cookies.set('user_id', '');
  }

  const toHome = () => {
    setRedirect('home');
  }

  const toLists = () => {
    setRedirect('lists');
  }

  const cookie_user_id = Cookies.get('user_id');
  
  useEffect(()=>{
    if (cookie_user_id.length > 0) {
      setUserId(cookie_user_id);
      signIn();
    }
  },[cookie_user_id])

  return (
    <Router>
    <Style className="App">
      { redirect === 'home' ? <Redirect to='/'/> : 
      redirect === 'lists' ? <Redirect to ='/lists'/> : '' }
      <div className='scrollContainer'>
      <Navbar className='scrollItem'>
        <img src={portalX_badge} alt='logo'/>
        <Link className='left' to='/'>List<span className='blue'>X</span></Link>     
        {isLogged ? <Link className='left' to='/lists'>Lists</Link>  : null}          
        {isLogged ?
        <a className='right' onClick={()=>{signOut()}}>Logout</a> 
        :    
        <Link className='right' to='/login'>Login</Link>    
        }       
      </Navbar>

      

      <Switch>
        <Route path='/' exact>
          <Home isLogged={isLogged} signIn={signIn} loadUser={loadUser} toHome={toHome} toLists={toLists}/>
        </Route> 
        <Route path='/lists' >
          <Lists user_id={user_id} isLogged={isLogged} signIn={signIn} loadUser={loadUser}/>
        </Route>
        <Route path='/login'>          
          <Login signIn={signIn} loadUser={loadUser} toHome={toHome} toLists={toLists}/>
        </Route>
      </Switch>

      {/* <footer> */}
      {/* <Container  bg='#111' height='auto' margin='0px'> */}
      {/*     <p>Contact @ <a className='email' href='menkhus.chris@gmail.com'>ChrisMenkhus</a></p> */}
      {/* </Container> */}
      {/* </footer> */}

      </div>
    </Style>
    </Router>
  );
}

export default App;
