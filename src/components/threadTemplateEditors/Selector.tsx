import React from 'react';
import { TemplateProps } from '~/modules/data/internal';
import { usePropHandlerCreator } from './utils';
import Polygon from '~/components/threadTemplateEditors/Polygon';
import Circle from '~/components/threadTemplateEditors/Circle';
import Star from '~/components/threadTemplateEditors/Star';

interface Props {
  props: TemplateProps;
}

const Selector = ({ props }: Props) => {
  switch (props.type) {
    case 'circle':
      return (
        <Circle createHandler={usePropHandlerCreator(props)} props={props} />
      );
    case 'polygon':
      return (
        <Polygon createHandler={usePropHandlerCreator(props)} props={props} />
      );
    case 'star':
      return (
        <Star createHandler={usePropHandlerCreator(props)} props={props} />
      );
    default:
      return null;
  }
};

export default Selector;
