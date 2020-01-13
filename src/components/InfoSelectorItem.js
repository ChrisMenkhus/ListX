import styled from 'styled-components';

export default styled.div`
    
      h1 {
        color: #444;
      }

      width: 200px;
      height: 150px;
      padding: 5px;
      margin-top: 10px;
      margin-bottom: 30px;
      margin-left: 20px; margin-right: 20px;      
      border-bottom: 8px solid #47FFC4;
      border-radius: 0px;
      transition: all 0.5s;

      border-color: ${props => props.active ? '#363636' : '#47FFC4'}
    

    &:hover {
      border-color: #363636;
      cursor: pointer;
    }

    P {
      display: block;
      color: #444;
    }

  @media screen and (max-width: 1100px) {
      margin-right: auto; margin-left: auto;
      margin-bottom: 0px;
      height: 20px;
      h1 {
        margin: 0px;
        line-height: 12px;
        font-size: 1rem;
      }
      p {
        display: none;
      }
  }

  @media screen and (max-width: 500px) {
      margin-right: auto; margin-left: auto;
      margin-bottom: 0px;
      height: 20px;
      h1 {
        margin: 0px;
        line-height: 12px;
        font-size: 1rem;
      }
      p {
        display: none;
      }
  }
  
`;
