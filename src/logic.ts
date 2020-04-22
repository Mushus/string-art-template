export const splitCalcuratableArray = (v: string) => {
  const ary: string[] = [];
  let text = v;
  let nest = 0;
  while (text !== '') {
    let i = 0;
    for (; i < text.length; i++) {
      const char = text[i];
      if (char === '(') nest++;
      if (char === ')') nest--;
      if (nest < 0) return undefined;
      if (char === ',') {
        break;
      }
    }
    const column = text.slice(0, i);
    ary.push(column);
    text = text.slice(i + 1, text.length);
  }
  return ary;
};

export const createFunctionArray = (ary: string[] | undefined) => {
  if (!ary) return undefined;
  try {
    const funcs = ary.map((v) => new Function('n', `return ${v};`));
    console.log(funcs);
    return funcs;
  } catch (e) {
    return undefined;
  }
};
