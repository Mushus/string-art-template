import isInt from 'validator/lib/isInt';
import isFloat from 'validator/lib/isFloat';
import { useDispatch } from 'react-redux';
import { useCallback, ChangeEvent } from 'react';
import { actions } from '~/modules/editor';
import { splitCalcuratableArray, createFunctionArray } from '~/logic';

const NumberArrayRegexp = /^\s*-?([1-9][0-9]*|0)(\s*,\s*-?([1-9][0-9]*|0))*\s*$/;

export const isUnsignedInt = (v: string) => isInt(v, { min: 0 });
export const isUnsigindIntWithoutZero = (v: string) => isInt(v, { min: 1 });
export const isUnsignedFloat = (v: string) => isFloat(v, { min: 0 });
export const isNumberArray = (v: string) => NumberArrayRegexp.test(v);
export const isCalcuratableArray = (v: string) => {
  const ary = splitCalcuratableArray(v);
  return createFunctionArray(ary) !== undefined;
};

export const usePropHandlerCreator = <
  PropType extends any,
  PropName extends keyof Omit<PropType, 'type'>
>(
  index: number,
  props: PropType
) => {
  const dispatch = useDispatch();
  return (
    propName: PropName,
    transformer: (v: string) => PropType[PropName] = (v) => v
  ) =>
    useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        dispatch(
          actions.updateShape({
            index,
            props: { ...props, [propName]: transformer(value) },
          })
        );
      },
      [dispatch, index, props]
    );
};
