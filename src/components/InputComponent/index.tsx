import { TextField } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import { RequiredField } from './styles';

interface InputMaskProps {
  mask?: 'PHONE';
  label: string;
  required: boolean;
  defaultValue?: string;
  helperText?: string;
  value?: string;
  maxLength?: number;
  error?: boolean;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  handleOnKeyUp?: (e: ChangeEvent<HTMLInputElement>) => void;
  InputProps?: any;
  propsInput?: any;
  disabled?: boolean;
}

export const InputComponent = ({
  label,
  mask,
  required,
  defaultValue,
  helperText,
  value,
  error,
  propsInput,
  handleChange,
  handleOnKeyUp,
  maxLength,
  disabled,
  InputProps,
}: InputMaskProps) => {
  const [typeMask, setTypeMask] = useState<string>('');

  useEffect(() => {
    if (mask) {
      switch (mask) {
        case 'PHONE':
          setTypeMask('(99) 99999-9999');
          break;
        default:
          break;
      }
    }
  }, []);

  return (
    <>
      {mask && (
        <>
          <InputMask
            mask={typeMask}
            disabled={disabled}
            defaultValue={defaultValue}
            value={value}
            {...propsInput}
            onChange={handleChange}
            onKeyUp={handleOnKeyUp}
            inputProps={{ maxLength }}
          >
            <TextField
              disabled={disabled}
              style={{ backgroundColor: disabled ? '#E9ECEF' : 'transparent' }}
              error={error}
              value={value}
              inputProps={{ maxLength }}
              InputProps={InputProps}
              label={
                <>
                  {label}
                  {required && <RequiredField> * </RequiredField>}
                </>
              }
              size="small"
              helperText={helperText}
            />
          </InputMask>
        </>
      )}
      {!mask && (
        <TextField
          disabled={disabled}
          style={{ backgroundColor: disabled ? '#E9ECEF' : 'transparent' }}
          onChange={handleChange}
          defaultValue={defaultValue}
          inputProps={{ maxLength }}
          value={value}
          error={error}
          InputProps={InputProps}
          {...propsInput}
          label={
            <>
              {label}
              {required && <RequiredField> * </RequiredField>}
            </>
          }
          size="small"
          helperText={helperText}
        />
      )}
    </>
  );
};
