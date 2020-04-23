import Ajv from 'ajv';
import { TemplatePropsArray } from './types';

const auxiliaryLinesSchema = {
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
            auxiliaryLines: auxiliaryLinesSchema,
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
            auxiliaryLines: auxiliaryLinesSchema,
          },
          required: ['type', 'radius', 'vertexNum', 'pinNum', 'auxiliaryLines'],
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
            auxiliaryLines: auxiliaryLinesSchema,
          },
          required: [
            'type',
            'outerRadius',
            'innerRadius',
            'vertexNum',
            'pinNum',
            'auxiliaryLines',
          ],
        },
      ],
    },
  ],
};
const ajv = new Ajv();
const validate = ajv.compile(schema);

const parseTemplates = (v: string) => {
  const obj = JSON.parse(v);
  if (!validate(obj)) {
    console.error(validate.errors);
    throw new Error(`validation error`);
  }
  return obj as TemplatePropsArray;
};

export default parseTemplates;
