import { useCallback, useState } from 'react';

import debounce from 'lodash/debounce';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Value = any;
type SetDebounceType = (value: Value) => void;
type UseDebounceStateType = (initialValue: Value, wait: number) => [Value, SetDebounceType];

export const useDebounceState: UseDebounceStateType = (initialValue = null, wait = 1000) => {
  const [state, setState] = useState(initialValue);

  const debounced = useCallback(
    debounce((value: Value) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setState(value);
    }, wait),
    [],
  );

  const setDebouncedState: SetDebounceType = (value) => {
    debounced(value);
  };

  return [state, setDebouncedState];
};
