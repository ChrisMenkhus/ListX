import styled from 'styled-components';

export default styled.img`
  width: ${props => props.width ? props.width : null};
  height: ${props => props.height ? props.height : null}; 	

  height: 350px;

  background-size: cover;
`;
