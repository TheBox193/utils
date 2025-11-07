import * as Yup from 'yup';

import useFormState, { UseFormStateReturn } from './useFormState';
import useYupValidation, { UseYupStateReturn } from './useYupValidation';

export declare type UseFormValidationReturn<InitialStateType> = UseFormStateReturn<InitialStateType> &
  UseYupStateReturn<InitialStateType>;

export default <InitialStateType,>({
  dataSchema,
  initialState,
}: {
  dataSchema: Yup.AnySchema;
  initialState: InitialStateType;
}): UseFormValidationReturn<InitialStateType> => {
  const formState = useFormState({ initialState });

  const validationState = useYupValidation({
    dataSchema,
    values: formState.values,
  });

  return {
    ...formState,
    ...validationState,
  };
};
