import Ajv from 'ajv';
import { parseData as parseOldFormatData, Data as V0 } from '~/modules/data/v0';

export interface Thread {
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
  threads: Thread[];
}

export interface PropsPolygon {
  type: 'polygon';
  radius: number;
  vertexNum: number;
  pinNum: number;
  threads: Thread[];
}

export interface PropsStar {
  type: 'star';
  outerRadius: number;
  innerRadius: number;
  vertexNum: number;
  pinNum: number;
  threads: Thread[];
}

export type TemplateProps = PropsNone | PropsCircle | PropsPolygon | PropsStar;

export interface Data {
  version: 1;
  templates: TemplateProps[];
}

const threadsSchema = {
  type: 'array',
  items: [
    {
      type: 'object',
      properties: {
        color: {
          type: 'string',
        },
        patterns: {
          type: 'array',
          items: [
            {
              type: 'string',
            },
          ],
        },
        start: {
          type: 'number',
        },
        loopCount: {
          type: 'number',
        },
      },
    },
  ],
};

const schema = {
  type: 'object',
  properties: {
    version: {
      const: 1,
    },
    templates: {
      type: 'array',
      items: [
        {
          type: 'object',
          oneOf: [
            {
              properties: {
                type: {
                  const: 'none',
                },
              },
              required: ['type'],
            },
            {
              properties: {
                type: {
                  const: 'circle',
                },
                radius: {
                  type: 'number',
                  minimum: 0,
                },
                pinNum: {
                  type: 'integer',
                  minimum: 1,
                },
                intervalRatio: {
                  type: 'number',
                  exclusiveMinimum: 0,
                },
                threads: threadsSchema,
              },
              required: [
                'type',
                'radius',
                'pinNum',
                'intervalRatio',
                'auxiliaryLines',
              ],
            },
            {
              properties: {
                type: {
                  const: 'polygon',
                },
                radius: {
                  type: 'number',
                  minimum: 0,
                },
                vertexNum: {
                  type: 'integer',
                  minimum: 1,
                },
                pinNum: {
                  type: 'integer',
                  minimum: 1,
                },
                threads: threadsSchema,
              },
              required: ['type', 'radius', 'vertexNum', 'pinNum', 'threads'],
            },
            {
              properties: {
                type: {
                  const: 'star',
                },
                outerRadius: {
                  type: 'number',
                  minimum: 0,
                },
                innerRadius: {
                  type: 'number',
                  minimum: 0,
                },
                vertexNum: {
                  type: 'integer',
                  minimum: 1,
                },
                pinNum: {
                  type: 'integer',
                  minimum: 1,
                },
                threads: threadsSchema,
              },
              required: [
                'type',
                'outerRadius',
                'innerRadius',
                'vertexNum',
                'pinNum',
                'threads',
              ],
            },
          ],
        },
      ],
    },
  },
};

const ajv = new Ajv();
const validate = ajv.compile(schema);

export const parseData = (obj: object) => {
  if (!validate(obj)) {
    try {
      const oldformat = parseOldFormatData(obj);
      return migrate(oldformat);
    } catch {
      console.error(validate.errors);
      throw new Error(`validation error`);
    }
  }
  return obj as Data;
};

const migrate = (obj: V0): Data => {
  return {
    version: 1,
    templates: obj.map((t) => {
      switch (t.type) {
        case 'none':
          return t;
        case 'circle':
          return {
            type: 'circle',
            radius: t.radius,
            pinNum: t.pinNum,
            intervalRatio: t.intervalRatio,
            threads: t.auxiliaryLines,
          };
        case 'polygon':
          return {
            type: 'polygon',
            radius: t.radius,
            vertexNum: t.vertexNum,
            pinNum: t.pinNum,
            threads: t.auxiliaryLines,
          };
        case 'star':
          return {
            type: 'star',
            outerRadius: t.outerRadius,
            innerRadius: t.innerRadius,
            vertexNum: t.vertexNum,
            pinNum: t.pinNum,
            threads: t.auxiliaryLines,
          };
      }
    }),
  };
};
