import styled from "styled-components";

export const FormLabel = styled.label`
  margin:5px;

`;

export const FormStyle = styled.form`
  margin:20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap:5px;
  font-weight: 700;
`;
export const FormInput = styled.input`
  background-color: ${(props)=>props.theme.secondaryBackground};
  color: ${(props)=>props.theme.text};
  height: 35px;
  width:100%;
  border-radius: 5px;
  padding-inline-start:10px;
  border:1px solid black;
`;

export const FormSelect = styled.select`
  background-color: ${(props)=>props.theme.secondaryBackground};
  color: ${(props)=>props.theme.text};
  height: 35px;
  width:100%;
  border-radius: 5px;
  padding-inline-start:10px;
  border:1px solid black;
`;


export const FormButton = styled.button`
  background-color: ${(props)=>props.theme.accent};
  color: ${(props)=>props.theme.white};
  border: none;
  border-radius: 2px;
  min-width: 50%;
  height:30px;
  margin: 10px;
  &:hover{
    background-color: ${(props)=>props.theme.secondaryAccent};
  }
`;


const FormError = styled.div`
  color: ${(props)=>props.theme.error};
  font-size: 12px;
  margin-top: 5px;
`;

export default FormError;
