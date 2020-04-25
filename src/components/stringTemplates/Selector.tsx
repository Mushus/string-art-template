import React from 'react';
import { TemplateProps } from '~/modules/data/current';
import Circle from '~/components/stringTemplates/Circle';
import Polygon from '~/components/stringTemplates/Polygon';
import Star from '~/components/stringTemplates/Star';
import { DrawOptions } from './types';

type Props = TemplateProps & {
  drawOptions: DrawOptions;
};

const Selector = (props: Props) => {
  switch (props.type) {
    case 'circle':
      return <Circle {...props} />;
    case 'polygon':
      return <Polygon {...props} />;
    case 'star':
      return <Star {...props} />;
    default:
      return null;
  }
};

export default Selector;
