import React, { ChangeEvent } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PageSize from '~/constants/pageSize';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import styled from '@emotion/styled';

const ControllerWrapper = styled.div`
  margin-left: 10px;
`;
const PaperSizeSelectorWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-content: center;
`;

const Text = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface Props {
  zoomFactor: number;
  currentSize: string;
  onChangeSize: (e: ChangeEvent<{ value: unknown }>) => void;
  onClickZoomIn: () => void;
  onClickZoomOut: () => void;
}

const label = '用紙サイズ';

export const PaperSizeSelector = ({
  zoomFactor,
  currentSize,
  onChangeSize,
  onClickZoomIn,
  onClickZoomOut,
}: Props) => {
  return (
    <PaperSizeSelectorWrapper>
      <Text>{Math.round(zoomFactor * 100)} %</Text>
      <ControllerWrapper>
        <Button variant="contained" color="primary" onClick={onClickZoomIn}>
          <ZoomInIcon />
        </Button>
      </ControllerWrapper>
      <ControllerWrapper>
        <Button variant="contained" color="primary" onClick={onClickZoomOut}>
          <ZoomOutIcon />
        </Button>
      </ControllerWrapper>
      <ControllerWrapper>
        <FormControl variant="outlined" size="small">
          <InputLabel>{label}</InputLabel>
          <Select
            native
            value={currentSize}
            onChange={onChangeSize}
            label={label}
          >
            {Object.entries(PageSize).map(([key, { name }]) => (
              <option key={key} value={key}>
                {name}
              </option>
            ))}
          </Select>
        </FormControl>
      </ControllerWrapper>
    </PaperSizeSelectorWrapper>
  );
};

export default PaperSizeSelector;
