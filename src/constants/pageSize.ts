const PageSize: {
  [k: string]: {
    name: string;
    width: number;
    height: number;
    css: string;
  };
} = {
  a2p: {
    name: 'A2縦',
    width: 420,
    height: 594,
    css: 'A2 portrait',
  },
  a2l: {
    name: 'A2横',
    width: 594,
    height: 420,
    css: 'A2 landscape',
  },
  a3p: {
    name: 'A3縦',
    width: 297,
    height: 420,
    css: 'A3 portrait',
  },
  a3l: {
    name: 'A3横',
    width: 420,
    height: 297,
    css: 'A3 landscape',
  },
  a4p: {
    name: 'A4縦',
    width: 210,
    height: 297,
    css: 'A4 portrait',
  },
  a4l: {
    name: 'A4横',
    width: 297,
    height: 210,
    css: 'A4 landscape',
  },
  a5p: {
    name: 'A5縦',
    width: 148,
    height: 210,
    css: 'A5 portrait',
  },
  a5l: {
    name: 'A5横',
    width: 210,
    height: 148,
    css: 'A5 landscape',
  },
  a6p: {
    name: 'A6縦',
    width: 105,
    height: 148,
    css: 'A6 portrait',
  },
  a6l: {
    name: 'A6横',
    width: 148,
    height: 105,
    css: 'A6 landscape',
  },
  b2p: {
    name: 'B2縦',
    width: 515,
    height: 728,
    css: 'B2 portrait',
  },
  b2l: {
    name: 'B2横',
    width: 728,
    height: 515,
    css: 'B2 landscape',
  },
  b3p: {
    name: 'B3縦',
    width: 364,
    height: 515,
    css: 'B3 portrait',
  },
  b3l: {
    name: 'B3横',
    width: 515,
    height: 364,
    css: 'B3 landscape',
  },
  b4p: {
    name: 'B4縦',
    width: 257,
    height: 364,
    css: 'B4 portrait',
  },
  b4l: {
    name: 'B4横',
    width: 364,
    height: 257,
    css: 'B4 landscape',
  },
  b5p: {
    name: 'B5縦',
    width: 182,
    height: 257,
    css: 'B5 portrait',
  },
  b5l: {
    name: 'B5横',
    width: 257,
    height: 182,
    css: 'B5 landscape',
  },
  b6p: {
    name: 'B6縦',
    width: 128,
    height: 182,
    css: 'B6 portrait',
  },
  b6l: {
    name: 'B6横',
    width: 182,
    height: 128,
    css: 'B6 landscape',
  },
};

export default PageSize;
