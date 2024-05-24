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
  height: 35px;
  width:100%;
  border-radius: 5px;
  padding-inline-start:10px;
  border:1px solid lightgray;
`;

export const FormSelect = styled.select`
  height: 35px;
  width:100%;
  border-radius: 5px;
  padding-inline-start:10px;
  border:1px solid lightgray;
`;


export const FormButton = styled.button`
  min-width: 50%;
  height:30px;
  margin: 10px;
`;