import React from 'react';
import EasyInput from '~/components/EasyInput';
import { PropsPolygon } from '~/modules/data/current';
import {
  isUnsignedFloat,
  isUnsigindIntWithoutZero,
} from '~/components/stringTemplateEditors/utils';
import InputAdornment from '@material-ui/core/InputAdornment';
import { CreateHandlerFunc } from './types';
import ControlWrapper from '~/components/stringTemplateEditors/ControlWrapper';

interface Props {
  props: PropsPolygon;
  createHandler: CreateHandlerFunc<PropsPolygon>;
}

const Polygon = ({ props, createHandler }: Props) => {
  const onChangeRadius = createHandler('radius', Number);
  const onChangeVertexNum = createHandler('vertexNum', Number);
  const onChangepinNum = createHandler('pinNum', Number);
  return (
    <>
      <ControlWrapper>
        <EasyInput
          label="大きさ(外接円の半径)"
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

export default Polygon;
