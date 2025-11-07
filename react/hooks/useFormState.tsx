import { useCallback, useState, useMemo } from 'react';

export declare type UseFormStateProps<InitialStateType> = {
  initialState: InitialStateType;
};

export declare type UseFormStateReturn<InitialStateType> = {
  hasValuesChanged: boolean;
  values: InitialStateType;
  valuesDelta: Partial<InitialStateType>;
  handleSetValue: <Key extends keyof InitialStateType>(key: Key, value: InitialStateType[Key]) => void;
  handleSetValues: (newValues: Partial<InitialStateType>) => void;
  handleReset: () => void;
  hasValueChanged: (key: keyof InitialStateType) => boolean;
};

export default <InitialStateType,>({
  initialState,
}: UseFormStateProps<InitialStateType>): UseFormStateReturn<InitialStateType> => {
  const [values, setValues] = useState(initialState);

  const handleSetValue: UseFormStateReturn<InitialStateType>['handleSetValue'] = useCallback((key, value) => {
    setValues((previousValues) => ({
      ...previousValues,
      [key]: value,
    }));
  }, []);

  const handleSetValues: UseFormStateReturn<InitialStateType>['handleSetValues'] = useCallback((newValues) => {
    setValues((previousValues) => ({
      ...previousValues,
      ...newValues,
    }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(initialState);
  }, []);

  const valuesDelta = useMemo(
    () =>
      (Object.keys(initialState) as Array<keyof InitialStateType>).reduce((obj, key) => {
        const initialValue = initialState[key];
        const newerValue = values[key];

        if (initialValue === null && Array.isArray(newerValue) && newerValue.length === 0) {
          // Edge case: An empty newValue array is the same as a null initial value
          return obj;
        }

        if (Array.isArray(initialValue) && Array.isArray(newerValue)) {
          // if some of the values are not included in the other array, they don't match
          const isAnyValuesDifferent =
            initialValue.some((item) => !newerValue.includes(item)) ||
            newerValue.some((item) => !initialValue.includes(item));

          if (isAnyValuesDifferent) {
            Object.assign(obj, { [key]: newerValue });
          }
        } else if (newerValue !== initialValue) {
          Object.assign(obj, { [key]: newerValue });
        }

        return obj;
      }, {} as Partial<InitialStateType>),
    [initialState, values],
  );

  const hasValuesChanged = Object.keys(valuesDelta).length > 0;

  const hasValueChanged: UseFormStateReturn<InitialStateType>['hasValueChanged'] = useCallback(
    (key) => Boolean(valuesDelta[key]),
    [valuesDelta],
  );

  return {
    hasValuesChanged,
    hasValueChanged,
    values,
    valuesDelta,
    handleSetValue,
    handleSetValues,
    handleReset,
  };
};
