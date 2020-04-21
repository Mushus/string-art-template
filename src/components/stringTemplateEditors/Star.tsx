import React from 'react';
import EasyInput from '~/components/EasyInput';
import { PropsStar } from '~/modules/canvas';
import {
  isUnsignedFloat,
  isUnsigindIntWithoutZero,
} from '~/components/stringTemplateEditors/utils';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CreateHandlerFunc } from './types';
import ControlWrapper from '~/components/stringTemplateEditors/ControlWrapper';

interface Props {
  props: PropsStar;
  createHandler: CreateHandlerFunc<PropsStar>;
}

const Star = ({ props, createHandler }: Props) => {
  const onChangeOuterRadius = createHandler('outerRadius', Number);
  const onChangeInnerRadius = createHandler('innerRadius', Number);
  const onChangeVertexNum = createHandler('vertexNum', Number);
  const onChangepinNum = createHandler('pinNum', Number);
  return (
    <>
      <ControlWrapper>
        <EasyInput
          label="大きさ1(外接円の半径)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.outerRadius}
          onChange={onChangeOuterRadius}
          validator={isUnsignedFloat}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
        />
      </ControlWrapper>
      <ControlWrapper>
        <EasyInput
          label="大きさ2(内接円の半径)"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.innerRadius}
          onChange={onChangeInnerRadius}
          validator={isUnsignedFloat}
          InputProps={{
            endAdornment: <InputAdornment position="end">mm</InputAdornment>,
          }}
        />
      </ControlWrapper>
      <ControlWrapper>
        <EasyInput
          label="頂点数"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.vertexNum}
          onChange={onChangeVertexNum}
          validator={isUnsigindIntWithoutZero}
          InputProps={{
            endAdornment: <InputAdornment position="end">角形</InputAdornment>,
          }}
        />
      </ControlWrapper>
      <ControlWrapper>
        <EasyInput
          label="1辺のピン数"
          type="number"
          variant="outlined"
          size="small"
          fullWidth
          value={props.pinNum}
          onChange={onChangepinNum}
          validator={isUnsigindIntWithoutZero}
        />
      </ControlWrapper>
    </>
  );
};

export default Star;
