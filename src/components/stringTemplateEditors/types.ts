import { ChangeEvent } from 'react';

export type CreateHandlerFunc<T> = <
  PropType extends T,
  PropName extends keyof Omit<T, 'type'>
>(
  propName: PropName,
  transformer: (value: string) => PropType[PropName]
) => (e: ChangeEvent<HTMLInputElement>) => void;
