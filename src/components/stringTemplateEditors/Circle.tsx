import React from 'react';
import EasyInput from '~/components/EasyInput';
import { PropsCircle } from '~/modules/data/current';
import {
  isUnsignedFloat,
  isUnsignedInt,
} from '~/components/stringTemplateEditors/utils';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CreateHandlerFunc } from './types';
import ControlWrapper from '~/components/stringTemplateEditors/ControlWrapper';

interface CircleEditorProp {
  props: PropsCircle;
  createHandler: CreateHandlerFunc<PropsCircle>;
}

const Circle = ({ props, createHandler }: CircleEditorProp) => {
  const onChangeRadius = createHandler('radius', Number);
  const onChangepinNum = createHandler('pinNum', Number);
  const onChangeIntervalRatio = createHandler('intervalRatio', Number);
  return (
    <>
      <ControlWrapper>
        <EasyInput
          label="大きさ(半径)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.radius}
          onChange={onChangeRadius}
          validator={isUnsignedFloat}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
        />
      </ControlWrapper>
      <ControlWrapper>
        <EasyInput
          label="ピン数"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.pinNum}
          onChange={onChangepinNum}
          validator={isUnsignedInt}
        />
      </ControlWrapper>
      <ControlWrapper>
        <EasyInput
          label="寄せる比率"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.intervalRatio}
          onChange={onChangeIntervalRatio}
          validator={isUnsignedFloat}
        />
      </ControlWrapper>
    </>
  );
};

export default Circle;
