import React, {useState} from 'react';
import styled from 'styled-components'
import {Container, BackgroundImage, BigText, Card, InfoSelectorBar, InfoSelectorItem, Signup, Button} from '../components';
import bg2 from '../bg2.png'; 

const Style = styled.div`
 // user-select: none;
  
  .bottomButton {
    margin-top: 40px;
    padding: 10px 50px 10px 50px;
  }

  p {
    font-size: 1.5rem;
  }

  footer {
    background-color: #111;
    .scrollItem {
      margin-left: auto; margin-right: auto;      
      padding-top: 10px;
      padding-bottom: 10px;
      
    }
    p {
      font-size: 0.8rem;
      color: white;
      text-align: center;
      line-height: 10px;
    }
    .email {
      user-select: all;
      color: #47FFC4;
      text-decoration: underline;
    }
  }
`;

function Home(props) {
  const [infoToShow, setInfo] = useState('experience');

  return (
  	<Style>
      
      {/* Top Welcome Page */}
      <Container height='95vh' padding='0px' margin='0px'>
        <BackgroundImage bg={bg2}>
          
          <Container margin='auto' flexdirection='row' width='100vw' padding='0px'>
            <Container padding='20px' margin='0px' flexdirection='column'>
              <BigText align='center' fontsize='3rem'>
                welcome to ListX
              </BigText>   
              <p>Dealing with lists is a hassle. ListX eases the strug.</p><br/>
              <a href='#info'>more info</a>
            </Container>
            {props.isLogged ? 
              <Container id='signup' height='auto' margin='100px' padding='0px 0px 0px 0px'>
                <BigText align='center' fontsize='3rem'>
                you are signed in!
                </BigText> 
                <p>Go to your lists page to start making stacks!</p><br/>
                <Button onClick={()=>{props.toLists()}}>My Lists</Button>
              </Container>
              :
              <Container id='signup' height='auto' margin='100px' padding='0px 0px 0px 0px'>
                <Signup signIn={props.signIn} loadUser={props.loadUser} toHome={props.toHome} toLists={props.toLists}/>
              </Container>
            }            
          </Container>      
        </BackgroundImage>
      </Container>

      {/* Information Selector */}
      <Container className='scrollItem' margin='0px' id='info' padding='0px'>
        <InfoSelectorBar>
        <div className='infoSection'>
          <InfoSelectorItem 
            onClick={()=>{setInfo('experience')}}
            onMouseOver={()=>{setInfo('experience')}}
            active={infoToShow === 'experience' ? true : false}>
            <h1>Why ListX?</h1>
            <p>Lists should be fun.</p>
          </InfoSelectorItem>
          <InfoSelectorItem 
            onClick={()=>{setInfo('explore')}}
            onMouseOver={()=>{setInfo('explore')}}
            active={infoToShow === 'explore' ? true : false}>
            <h1>About Us</h1>
            <p>and our pursuit of world domination.</p>
          </InfoSelectorItem>
        </div>
        </InfoSelectorBar>
      </Container>

      {/* Company Information */}
      <Container height='auto' bg='transparent' padding='20px 0px 200px 0px' margin='0px'>
          {infoToShow === 'experience' ? 
            <div>
              {/* <BigText align='center' fontsize='3rem'>Why ListX?</BigText> */}
              <Card align='center'>
                <div className='row'>
                <h2>Manage hundreds of lists easily using CRUD functions</h2></div>
              </Card>
              <Card align='center'>                
                <div className='row'>
                <h2>Sort through the lists and entries effortlessly using search powered by PSQL</h2>
                </div>
              </Card>
              <Card align='center'>                
                <div className='row'>
                <h2>Enjoy a better way to view your lists with cards</h2>
                </div>
              </Card>
            </div>            
          : infoToShow === 'explore' ?
            <div>
              {/* <BigText align='center' fontsize='3rem'>About ListX</BigText> */}
              <Card align='center'>
                <div className='row'>
                <h2>I started ListX as a simple list application using react state hooks to store data and create lists.</h2>
                </div>
              </Card>
            <Card align='center'>
                <div className='row'>           
                <h2>The lists were not stored though so it wasn't really functional. That's when I added a postgres database</h2>
                </div>
              </Card>
              <Card align='center'>
                <div className='row'>
                <h2>Finally I connected an express server to run the back end.</h2>
                </div>
              </Card>
            </div>                         
            :
            'none'
            }
            <div>
          </div>
      </Container>
      {/* logo */}
      {/* <Container height='auto' bg='white' padding='40px 0px 40px 0px' margin='0px'>    */}
      {/*   <div>      */}
      {/*     <Img src={portalX_badge} height='auto' width='auto'/> */}
      {/*   </div>          */}
      {/* </Container> */}


      
      
    </Style>
  );
}

export default Home;
