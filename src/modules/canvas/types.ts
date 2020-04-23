export interface AuxiliaryLine {
  color: string;
  patterns: string[];
  start: number;
  loopCount: number;
}

export interface PropsNone {
  type: 'none';
}

export interface PropsCircle {
  type: 'circle';
  radius: number;
  pinNum: number;
  intervalRatio: number;
  auxiliaryLines: AuxiliaryLine[];
}

export interface PropsPolygon {
  type: 'polygon';
  radius: number;
  vertexNum: number;
  pinNum: number;
  auxiliaryLines: AuxiliaryLine[];
}

export interface PropsStar {
  type: 'star';
  outerRadius: number;
  innerRadius: number;
  vertexNum: number;
  pinNum: number;
  auxiliaryLines: AuxiliaryLine[];
}

export type TemplateProps = PropsNone | PropsCircle | PropsPolygon | PropsStar;

export type TemplatePropsArray = Array<TemplateProps>;

export interface State {
  templates: TemplatePropsArray;
  auxiliaryLineDialog: {
    isOpen: boolean;
    templateIndex: number;
    auxiliaryLineIndex: number;
  };
  page: {
    key: string;
    width: number;
    height: number;
    zoom: number;
    zoomFactor: number;
  };
}
