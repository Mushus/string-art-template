import { parseData as parseOldFormatData, Data as V2 } from '~/modules/data/v2';

const currentVersion: 2 = 2;

export interface Thread {
  color: string;
  patterns: string[];
  start: number;
  loopCount: number;
}

export interface PropsNone {
  type: 'none';
  name: string;
  visible: boolean;
}

export interface PropsCircle {
  type: 'circle';
  name: string;
  visible: boolean;
  radius: number;
  pinNum: number;
  intervalRatio: number;
  threads: Thread[];
}

export interface PropsPolygon {
  type: 'polygon';
  name: string;
  visible: boolean;
  radius: number;
  vertexNum: number;
  pinNum: number;
  threads: Thread[];
}

export interface PropsStar {
  type: 'star';
  name: string;
  visible: boolean;
  outerRadius: number;
  innerRadius: number;
  vertexNum: number;
  pinNum: number;
  threads: Thread[];
}

export type TemplateProps = PropsNone | PropsCircle | PropsPolygon | PropsStar;

export interface Data {
  version: typeof currentVersion;
  templates: TemplateProps[];
}

export const parseData = (obj: any) => {
  try {
    const oldformat = parseOldFormatData(obj);
    return migrate(oldformat);
  } catch {
    throw new Error(`invalid format`);
  }
};

const migrate = (obj: V2): Data => {
  return {
    version: currentVersion,
    templates: obj.templates.map((t) => ({
      type: 'none',
      ...t,
      name: t.name ?? '',
      visible: t.visible ?? true,
    })),
  };
};
