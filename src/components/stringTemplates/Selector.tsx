import React from 'react';
import { TemplateProps } from '~/modules/canvas/types';
import Circle from '~/components/stringTemplates/Circle';
import Polygon from '~/components/stringTemplates/Polygon';
import Star from '~/components/stringTemplates/Star';

const Selector = (props: TemplateProps) => {
  switch (props.type) {
    case 'circle':
      return <Circle guideWidth={0.1} pointWidth={0.3} {...props} />;
    case 'polygon':
      return <Polygon guideWidth={0.1} pointWidth={0.3} {...props} />;
    case 'star':
      return <Star guideWidth={0.1} pointWidth={0.3} {...props} />;
    default:
      return null;
  }
};

export default Selector;
