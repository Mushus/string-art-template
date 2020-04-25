import React, { useCallback, ChangeEvent } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '~/reducer';
import { actions } from '~/modules/printOptions';
import styled from '@emotion/styled';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

const selector = (state: RootState) => state.printOptions;

const Wrapper = styled.div`
  margin: 20px 10px;
`;

const ControlWapper = styled.div`
  :not(:last-child) {
    margin-bottom: 20px;
  }
`;

const PrintOptions = () => {
  const { withPinNumber, pinSize, withProcedure } = useSelector(selector);
  const dispatch = useDispatch();

  const handleChangeWithPinNumber = useCallback(
    (_, checked: boolean) => dispatch(actions.updateWithPinNumber(checked)),
    [dispatch]
  );

  const handleChangeWithProcedure = useCallback(
    (_, checked: boolean) => dispatch(actions.updateProcedure(checked)),
    [dispatch]
  );

  const handleChangePinSize = useCallback(
    (e: ChangeEvent<HTMLInputElement>) =>
      dispatch(actions.updatePinSize(Number(e.target.value))),
    [dispatch]
  );

  return (
    <Wrapper>
      <ControlWapper>
        <FormControlLabel
          control={
            <Switch
              checked={withPinNumber}
              onChange={handleChangeWithPinNumber}
            />
          }
          label="ピン番号を表示する"
        />
      </ControlWapper>
      <ControlWapper>
        <FormControlLabel
          control={
            <Switch
              checked={withProcedure}
              onChange={handleChangeWithProcedure}
            />
          }
          label="糸シミュレーションの手順を表示する"
        />
      </ControlWapper>
      <ControlWapper>
        <TextField
          label="ピンの大きさ"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={pinSize}
          onChange={handleChangePinSize}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
          inputProps={{
            min: 0,
            step: 0.1,
          }}
        />
      </ControlWapper>
    </Wrapper>
  );
};

export default PrintOptions;
