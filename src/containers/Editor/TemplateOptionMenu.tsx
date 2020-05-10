import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { RootState } from '~/reducer';
import { actions } from '~/modules/editor';

const selector = ({ editor: { templateEditorMenu } }: RootState) =>
  templateEditorMenu;

const TemplateOptionMenu = () => {
  const templateEditorMenu = useSelector(selector);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => dispatch(actions.closeMenu()), [
    dispatch,
  ]);

  const handleFlipUp = useCallback(() => {
    dispatch(
      actions.moveShape({
        templateID: templateEditorMenu?.templateID || '',
        moveTo: -1,
      })
    );
    handleClose();
  }, [templateEditorMenu, handleClose, dispatch]);

  const handleFlipDown = useCallback(() => {
    dispatch(
      actions.moveShape({
        templateID: templateEditorMenu?.templateID || '',
        moveTo: 1,
      })
    );
    handleClose();
  }, [templateEditorMenu, handleClose, dispatch]);

  const handleDeleteShape = useCallback(() => {
    dispatch(actions.removeShape(templateEditorMenu?.templateID || ''));
    handleClose();
  }, [templateEditorMenu, handleClose, dispatch]);

  const anchorEl = templateEditorMenu?.elem;

  return (
    <Menu
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(templateEditorMenu)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleFlipUp}>上へ移動</MenuItem>
      <MenuItem onClick={handleFlipDown}>下へ移動</MenuItem>
      <Divider />
      <MenuItem onClick={handleDeleteShape}>削除</MenuItem>
    </Menu>
  );
};

export default TemplateOptionMenu;
