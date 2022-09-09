import { Box, FormControl } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BoxWrapper = styled(Box)`
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;

  border-top: none;
  border-left: 1px solid rgba(163, 163, 163, 0.329);
  border-bottom: 1px solid rgba(163, 163, 163, 0.329);
  border-right: 1px solid rgba(163, 163, 163, 0.329);
`;

export const RangeBox = styled(Box)`
  border: 1px solid #007bff;
  background-color: #007bff;

  border-top-left-radius: 5px;
  border-top-right-radius: 5px;

  padding: 0.5rem 1.2rem;
  font-size: 1.2rem;
  color: #ffffff;
`;

export const ContainerBoxWrapper = styled(Box)`
  padding: 1rem;

  display: grid;
  grid-gap: 20px;

  place-items: left;
`;

export const ContainerRangeBoxInfo = styled(Box)`
  width: 200px;
  margin-left: -20px;
  margin-top: -5px;
  margin-bottom: -9px;
  color: #000;

  border-top-right-radius: 5px;
  padding: 0.5rem 1rem;

  display: grid;
  grid-template-columns: 20px 60px;
  grid-gap: 15px;
  place-items: center;

  background-color: #ffffff;
`;

type FormControlWrapperProps = {
  columns: string;
};

export const FormControlWrapper = styled(FormControl)<FormControlWrapperProps>`
  display: grid;
  width: 70%;
  grid-template-columns: ${(props) => props.columns};
  grid-gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    width: 100%;
  }
`;