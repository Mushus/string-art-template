import React, {
  useState,
  useCallback,
  ChangeEvent,
  FocusEvent,
  useEffect,
} from 'react';
import TextField, { TextFieldProps } from '@material-ui/core/TextField';

type Props = TextFieldProps & {
  validator?: (v: string) => boolean;
};

const EasyInput = (props: Props) => {
  const { validator, ...textFieldProps } = props;
  const validateFunc = validator || (() => true);

  const [value, setValue] = useState<string>('');
  useEffect(() => setValue(String(textFieldProps.value)), []);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      if (validateFunc(input) && textFieldProps.onChange) {
        textFieldProps.onChange(e);
      }
      setValue(input);
    },
    [setValue, textFieldProps.onChange]
  );

  const handleBlur = useCallback(
    (e: FocusEvent<HTMLInputElement>) => {
      setValue(String(textFieldProps.value));
      textFieldProps.onBlur && textFieldProps.onBlur(e);
    },
    [textFieldProps.value, setValue]
  );

  return (
    <TextField
      {...textFieldProps}
      value={value}
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
};

export default EasyInput;
