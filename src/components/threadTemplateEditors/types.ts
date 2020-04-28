import { ChangeEvent } from 'react';

export type CreateHandlerFunc<T> = <
  PropType extends T,
  PropName extends keyof Omit<Omit<T, 'type'>, 'id'>
>(
  propName: PropName,
  transformer: (value: string) => PropType[PropName]
) => (e: ChangeEvent<HTMLInputElement>) => void;
