import React from 'react';
import { TemplateProps } from '~/modules/canvas/types';
import { usePropHandlerCreator } from './utils';
import Polygon from '~/components/stringTemplateEditors/Polygon';
import Circle from '~/components/stringTemplateEditors/Circle';
import Star from '~/components/stringTemplateEditors/Star';

interface Props {
  index: number;
  props: TemplateProps;
}

const Selector = ({ index, props }: Props) => {
  switch (props.type) {
    case 'circle':
      return (
        <Circle
          createHandler={usePropHandlerCreator(index, props)}
          props={props}
        />
      );
    case 'polygon':
      return (
        <Polygon
          createHandler={usePropHandlerCreator(index, props)}
          props={props}
        />
      );
    case 'star':
      return (
        <Star
          createHandler={usePropHandlerCreator(index, props)}
          props={props}
        />
      );
    default:
      return null;
  }
};

export default Selector;
