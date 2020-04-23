import React, { ChangeEvent, useRef } from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import PageSize from '~/constants/pageSize';
import Button from '@material-ui/core/Button';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import PrintIcon from '@material-ui/icons/Print';
import SaveIcon from '@material-ui/icons/SaveAlt';
import OpenIcon from '@material-ui/icons/OpenInBrowser';
import styled from '@emotion/styled';
import Tooltip from '@material-ui/core/Tooltip';

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
  onClickPrint: () => void;
  onClickLoad: (
    elem: HTMLInputElement,
    e: ChangeEvent<{ files: FileList | null }>
  ) => void;
  onClickSave: () => void;
}

const label = '用紙サイズ';

export const PaperSizeSelector = ({
  zoomFactor,
  currentSize,
  onChangeSize,
  onClickZoomIn,
  onClickZoomOut,
  onClickPrint,
  onClickLoad,
  onClickSave,
}: Props) => {
  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <PaperSizeSelectorWrapper>
      <Text>{Math.round(zoomFactor * 100)} %</Text>
      <ControllerWrapper>
        <Tooltip title="拡大">
          <Button
            className="button-icon"
            variant="contained"
            color="primary"
            onClick={onClickZoomIn}
          >
            <ZoomInIcon />
          </Button>
        </Tooltip>
      </ControllerWrapper>
      <ControllerWrapper>
        <Tooltip title="縮小">
          <Button
            className="button-icon"
            variant="contained"
            color="primary"
            onClick={onClickZoomOut}
          >
            <ZoomOutIcon />
          </Button>
        </Tooltip>
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
      <ControllerWrapper>
        <Tooltip title="印刷">
          <Button
            className="button-icon"
            variant="contained"
            color="primary"
            onClick={onClickPrint}
          >
            <PrintIcon />
          </Button>
        </Tooltip>
      </ControllerWrapper>
      <ControllerWrapper>
        <input
          accept="application/json"
          id="loadFile"
          type="file"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={(e) =>
            fileInput.current && onClickLoad(fileInput.current, e)
          }
        />
        <label htmlFor="loadFile">
          <Tooltip title="読み込み">
            <Button
              className="button-icon"
              variant="contained"
              color="primary"
              component="span"
            >
              <OpenIcon />
            </Button>
          </Tooltip>
        </label>
      </ControllerWrapper>
      <ControllerWrapper>
        <Tooltip title="保存">
          <Button
            className="button-icon"
            variant="contained"
            color="primary"
            onClick={onClickSave}
          >
            <SaveIcon />
          </Button>
        </Tooltip>
      </ControllerWrapper>
    </PaperSizeSelectorWrapper>
  );
};

export default PaperSizeSelector;
