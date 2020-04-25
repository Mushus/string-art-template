import React, { useState, useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import AuxiliaryLineColors from '~/constants/threadColors';
import Dialog from '@material-ui/core/Dialog';

const DefaultSize = 40;
const ColorPadding = 3;

const createSizeFunc = (padding: number = 0) => ({ size }: { size?: number }) =>
  (size !== undefined && size > 0 ? size : DefaultSize) - padding * 2;

const Wrapper = styled.div<{ size?: number }>`
  display: inline-block;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #ccc;
  padding: 2px;
  width: ${createSizeFunc()}px;
  height: ${createSizeFunc()}px;
`;

const SelectedColor = styled.div``;

const SelectableColor = styled.div<{ isSelected: boolean }>`
  border 2px solid ${({ isSelected }) =>
    isSelected ? 'black' : 'transparent'};
  padding: 2px;
`;

const Color = styled.div<{ size?: number; color: string }>`
  width: ${createSizeFunc(ColorPadding)}px;
  height: ${createSizeFunc(ColorPadding)}px;
  background-color: ${({ color }) => color};
`;

const DialogBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  width: 416px;
  padding: 4px;
`;

interface Props {
  size?: number;
  value: string;
  onUpdate?: (color: string) => void;
}

const ColorSelector = ({ size, value, onUpdate }: Props) => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = useCallback(() => setOpen(true), [setOpen]);
  const onClose = useCallback(() => setOpen(false), [setOpen]);

  return (
    <>
      <Wrapper size={size}>
        <SelectedColor onClick={onOpen}>
          <Color size={size} color={value} />
        </SelectedColor>
      </Wrapper>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogBody>
          {AuxiliaryLineColors.map((color) => {
            const onClick = () => {
              onUpdate && onUpdate(color);
              setOpen(false);
            };
            return (
              <SelectableColor
                key={color}
                onClick={onClick}
                isSelected={color === value}
              >
                <Color size={50} color={color} />
              </SelectableColor>
            );
          })}
        </DialogBody>
      </Dialog>
    </>
  );
};

export default ColorSelector;
