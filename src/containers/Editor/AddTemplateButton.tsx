import React, { useCallback, useRef, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { RootState } from '~/reducer';
import { actions } from '~/modules/addTemplateMenu';
import { actions as editorActions } from '~/modules/editor';

import { TemplateProps } from '~/modules/data/current';

const Templates: TemplateProps[] = [
  {
    type: 'circle',
    name: '円形',
    visible: true,
    radius: 75,
    pinNum: 24,
    intervalRatio: 1,
    threads: [],
  },
  {
    type: 'polygon',
    name: '多角形',
    visible: true,
    radius: 75,
    vertexNum: 5,
    pinNum: 5,
    threads: [],
  },
  {
    type: 'star',
    name: '星',
    visible: true,
    outerRadius: 75,
    innerRadius: 50,
    vertexNum: 5,
    pinNum: 5,
    threads: [],
  },
];

const selector = ({ addTemplateMenu }: RootState) => addTemplateMenu;

const AddTemplateButton = () => {
  const { isOpen } = useSelector(selector);
  const dispatch = useDispatch();

  const handleOpen = useCallback(() => dispatch(actions.open()), [dispatch]);
  const handleClose = useCallback(() => dispatch(actions.close()), [dispatch]);

  const anchorEl = useRef<HTMLButtonElement>(null);
  const menuItems = useMemo(
    () =>
      Templates.map((t) => ({
        name: t.name,
        handler: () => {
          dispatch(editorActions.addShape(t));
          dispatch(actions.close());
        },
      })),
    [dispatch]
  );

  return (
    <>
      <Tooltip title="テンプレートを追加する">
        <Button
          className="button-icon"
          variant="contained"
          color="primary"
          onClick={handleOpen}
          ref={anchorEl}
        >
          <AddIcon />
        </Button>
      </Tooltip>
      <Menu
        anchorEl={anchorEl.current}
        keepMounted
        open={isOpen}
        onClose={handleClose}
      >
        {menuItems.map(({ name, handler }, i) => (
          <MenuItem key={i} onClick={handler}>
            {name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AddTemplateButton;
