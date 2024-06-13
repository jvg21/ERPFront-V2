import styled from "styled-components";

export const ModuleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
`;
export const Modal = styled.div`
   position: fixed;
   z-index: 1;
   left: 0;
   top: 0;
   width: 100%;
   height: 100%;
   overflow: auto;
   background-color: rgba(0, 0, 0, 0.4);
`;

export const ModalContent = styled.div`
  color: ${(props)=>props.theme.text};
  background-color: ${(props)=>props.theme.background};
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  max-width: 500px;
  border-radius: 15px;

`;

export const CloseButton = styled.span`
   color: #aaa;
   float: right;
   position: absolute;
   font-size: 28px;
   font-weight: bold;

   &:hover {
     color: black;
     cursor: pointer;
   }
 `;