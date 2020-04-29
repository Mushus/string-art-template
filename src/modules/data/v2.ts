import Ajv from 'ajv';
import { parseData as parseOldFormatData, Data as V1 } from '~/modules/data/v1';

const currentVersion: 2 = 2;

export interface Thread {
  color: string;
  patterns: string[];
  start: number;
  loopCount: number;
}

export interface PropsNone {
  type: 'none';
  name?: string;
}

export interface PropsCircle {
  type: 'circle';
  name?: string;
  radius: number;
  pinNum: number;
  intervalRatio: number;
  threads: Thread[];
}

export interface PropsPolygon {
  type: 'polygon';
  name?: string;
  radius: number;
  vertexNum: number;
  pinNum: number;
  threads: Thread[];
}

export interface PropsStar {
  type: 'star';
  name?: string;
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
      const: currentVersion,
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
                name: {
                  type: 'string',
                },
              },
              required: ['type'],
            },
            {
              properties: {
                type: {
                  const: 'circle',
                },
                name: {
                  type: 'string',
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
                'threads',
              ],
            },
            {
              properties: {
                type: {
                  const: 'polygon',
                },
                name: {
                  type: 'string',
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
                name: {
                  type: 'string',
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

export const parseData = (obj: any) => {
  if ('version' in obj) {
    const version = obj.version;
    console.log(`version: ${version}`);
    if (version == currentVersion) {
      if (validate(obj)) {
        return obj as Data;
      }
      console.error(validate.errors);
    }
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

const migrate = (obj: V1): Data => {
  return {
    version: currentVersion,
    templates: obj.templates.map((t) => {
      switch (t.type) {
        case 'none':
          return {
            type: 'none',
            name: '',
          };
        case 'circle':
          return {
            type: 'circle',
            name: '',
            radius: t.radius,
            pinNum: t.pinNum,
            intervalRatio: t.intervalRatio,
            threads: t.auxiliaryLines,
          };
        case 'polygon':
          return {
            type: 'polygon',
            name: '',
            radius: t.radius,
            vertexNum: t.vertexNum,
            pinNum: t.pinNum,
            threads: t.auxiliaryLines,
          };
        case 'star':
          return {
            type: 'star',
            name: '',
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
