import React, { useMemo, useCallback } from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '~/modules/editor';
import { actions as dialogActions } from '~/modules/presetDialog';
import { TemplateProps } from '~/modules/data/current';
import styled from '@emotion/styled';
import { RootState } from '~/reducer';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

const templates: Array<TemplateProps> = [
  {
    type: 'circle',
    name: 'シンプル円',
    visible: true,
    radius: 75,
    pinNum: 24,
    intervalRatio: 1,
    threads: [
      {
        color: '#3f51b5',
        patterns: ['5'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#00bcd4',
        patterns: ['7'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#cddc39',
        patterns: ['11'],
        start: 0,
        loopCount: 1000,
      },
    ],
  },
  {
    type: 'polygon',
    name: 'ひしがた',
    visible: true,
    radius: 75,
    vertexNum: 4,
    pinNum: 20,
    threads: [
      {
        color: '#ffc107',
        patterns: ['20', '-20', '1'],
        start: 0,
        loopCount: 60,
      },
      {
        color: '#ffc107',
        patterns: ['20', '-20', '1'],
        start: 40,
        loopCount: 60,
      },
      {
        color: '#8bc34a',
        patterns: ['20', '-20', '1'],
        start: 20,
        loopCount: 60,
      },
      {
        color: '#8bc34a',
        patterns: ['20', '-20', '1'],
        start: 60,
        loopCount: 60,
      },
    ],
  },
  {
    type: 'circle',
    name: 'くじゃく',
    visible: true,
    radius: 75,
    pinNum: 60,
    intervalRatio: 1.8,
    threads: [
      {
        color: '#cddc39',
        patterns: ['25', '-24'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#4caf50',
        patterns: ['22', '-21'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#009688',
        patterns: ['19', '-18'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#00bcd4',
        patterns: ['16', '-15'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#2196f3',
        patterns: ['13', '-12'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#673ab7',
        patterns: ['10', '-9'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#e91e63',
        patterns: ['7', '-6'],
        start: 0,
        loopCount: 1000,
      },
    ],
  },
  {
    type: 'circle',
    name: 'うず',
    visible: true,
    radius: 75,
    pinNum: 60,
    intervalRatio: 1,
    threads: [
      {
        color: '#f44336',
        patterns: ['1+n', '-n'],
        start: 0,
        loopCount: 1000,
      },
      {
        color: '#ffc107',
        patterns: ['1+n', '-n'],
        start: 10,
        loopCount: 1000,
      },
      {
        color: '#cddc39',
        patterns: ['1+n', '-n'],
        start: 20,
        loopCount: 100,
      },
      {
        color: '#00bcd4',
        patterns: ['1+n', '-n'],
        start: 30,
        loopCount: 100,
      },
      {
        color: '#2196f3',
        patterns: ['1+n', '-n'],
        start: 40,
        loopCount: 100,
      },
      {
        color: '#673ab7',
        patterns: ['1+n', '-n'],
        start: 50,
        loopCount: 1000,
      },
    ],
  },
  {
    type: 'circle',
    name: 'さくら',
    visible: true,
    radius: 75,
    pinNum: 60,
    intervalRatio: 1,
    threads: [
      {
        color: '#e91e63',
        patterns: ['n', '-n', '1'],
        start: 1,
        loopCount: 1000,
      },
      {
        color: '#3f51b5',
        patterns: ['n', '-n', '1'],
        start: 13,
        loopCount: 1000,
      },
      {
        color: '#00bcd4',
        patterns: ['n', '-n', '1'],
        start: 25,
        loopCount: 1000,
      },
      {
        color: '#8bc34a',
        patterns: ['n', '-n', '1'],
        start: 37,
        loopCount: 1000,
      },
      {
        color: '#ffc107',
        patterns: ['n', '-n', '1'],
        start: 49,
        loopCount: 1000,
      },
    ],
  },
  {
    type: 'circle',
    name: 'ほし',
    visible: true,
    radius: 75,
    pinNum: 200,
    intervalRatio: 1,
    threads: [
      {
        color: '#9c27b0',
        patterns: ['n', '-n', '1'],
        start: 0,
        loopCount: 270,
      },
      {
        color: '#2196f3',
        patterns: ['n', '-n', '1'],
        start: 40,
        loopCount: 270,
      },
      {
        color: '#8bc34a',
        patterns: ['n', '-n', '1'],
        start: 80,
        loopCount: 270,
      },
      {
        color: '#ffc107',
        patterns: ['n', '-n', '1'],
        start: 120,
        loopCount: 270,
      },
      {
        color: '#ff5722',
        patterns: ['n', '-n', '1'],
        start: 160,
        loopCount: 270,
      },
      {
        color: '#2196f3',
        patterns: ['-n', '+n', '-1'],
        start: 30,
        loopCount: 270,
      },
      {
        color: '#8bc34a',
        patterns: ['-n', '+n', '-1'],
        start: 70,
        loopCount: 270,
      },
      {
        color: '#ffc107',
        patterns: ['-n', '+n', '-1'],
        start: 110,
        loopCount: 270,
      },
      {
        color: '#ff5722',
        patterns: ['-n', '+n', '-1'],
        start: 150,
        loopCount: 270,
      },
      {
        color: '#9c27b0',
        patterns: ['-n', '+n', '-1'],
        start: 190,
        loopCount: 270,
      },
    ],
  },
];

const List = styled.ul`
  list-style: none;
  margin: 10px;
  width: 300px;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 20px;
  display: flex;
`;

const ListItemText = styled.div`
  flex: 1 1 auto;
  line-height: 36px;
  height: 36px;
`;

const selector = (state: RootState) => state.presetDialog;

const PresetDialog = () => {
  const { isOpen } = useSelector(selector);

  const dispatch = useDispatch();

  const templatesAttrs = useMemo(
    () =>
      templates.map((t) => ({
        name: t.name,
        handler: () => dispatch(actions.addShape(t)),
      })),
    [dispatch, templates]
  );

  const handleClose = useCallback(() => dispatch(dialogActions.close()), [
    dispatch,
  ]);

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>プリセットから追加</DialogTitle>
      <DialogContent>
        <List>
          {templatesAttrs.map(({ name, handler }, index) => (
            <ListItem key={index}>
              <ListItemText>{name}</ListItemText>
              <Tooltip title="テンプレートを追加する">
                <Button
                  className="button-icon"
                  variant="contained"
                  color="primary"
                  onClick={handler}
                >
                  <AddIcon />
                </Button>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PresetDialog;
