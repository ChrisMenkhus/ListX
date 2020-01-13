import React, {useState, useEffect, useRef} from 'react';
import {Redirect} from 'react-router-dom';
import {Button} from '../components'
import styled from 'styled-components'
import Container from '../components/Container.js'
import {primary, aqua} from '../components/Colors.js'

const Style = styled.div`
	background-color: ${props => props.bg ? props.bg : 'transparent'};
  border: 1px solid ${props => props.bg ? props.bg : 'transparent'};
/*  &:nth-child(1) {
    background-color: red;
    border-color: red;
  }*/
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  margin: 6px;
  padding: 0px;
  height: 180px; width: 180px;
  color: #333;
  
  .row {
    flex-direction: row;
  }

  h1 {
    font-size: 2rem;
    text-align: center;
    color: #333;
  }

  p {
    font-size: 2rem;
    color: white;
    margin-top: 30%;
    width: 100%;
    display: inline-block;
  }

  .buttons {
    display: none;
    height: 100%;
    flex-direction: row;
    width: 100%;   
    margin: 0px; padding: 0px;
    button {
      margin-left: auto; margin-right: auto; 
      padding: 5px 5px 5px 5px;
      margin-top: 80px;
      text-align: center;
      width: 70%;
      height: 30px;
    }
  }

  input {
    display: block;
    background-color: transparent;
    border: none;
    border-bottom: solid 1px #DCDCDC;
    font-size: 1.5rem;
    width: 80%;
    text-align: center;
   
    color: black;

    ::placeholder {
      color: #D2D2D2;
    }
  }


  transition: all 0.2s;
  &:hover {
    transform: scale(1.5);
    .buttons {
      background-color: rgba(255,255,255,0.2);
      display: flex;
    }

    .content {
      display: none;
    }
  }

`;

function ListCard(props) {
  return (
    <Style bg={props.bg}>
      {props.children}
    </Style>
  );
}
export default ListCard;
