import { useState, useEffect, useCallback } from 'react';

import * as Yup from 'yup';

export type ErrorsType<ValuesType> = {
  [key in keyof ValuesType]?: Yup.ValidationError;
};
// export type ErrorsType<ValuesType> = Record<
//   keyof ValuesType,
//   Yup.ValidationError
// >;

export declare type UseYupStateProps<ValuesType> = {
  dataSchema: Yup.AnySchema;
  values: ValuesType;
};

export declare type UseYupStateReturn<ValuesType> = {
  hasErrors: boolean;
  errors: ErrorsType<ValuesType>;
};

// legacy, try to avoid using this
// use `useLazyAsyncYupValidation` instead
const useYupValidation = <ValuesType,>({
  dataSchema,
  values,
}: UseYupStateProps<ValuesType>): UseYupStateReturn<ValuesType> => {
  const [errors, setErrors] = useState({} as ErrorsType<ValuesType>);

  useEffect(() => {
    dataSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        setErrors({});
      })
      .catch((yupErrors) => {
        const results = yupErrors.inner.reduce(
          (result: ErrorsType<ValuesType>, error: { path: keyof typeof values }) => ({
            ...result,
            [error.path]: error,
          }),
          {} as ErrorsType<ValuesType>,
        );
        setErrors(results);
      });
  }, Object.values(values));

  const hasErrors = Object.keys(errors).length > 0;

  return {
    hasErrors,
    errors,
  };
};

export class LazyYupValidationError<ValuesType> extends Error {
  value: Record<string, ValuesType>;

  path?: string;

  type?: string;

  errors: Record<string, Yup.ValidationError>;

  constructor(validationError: Yup.ValidationError) {
    super();

    this.name = 'LazyYupValidationError';
    this.value = validationError.value;
    this.path = validationError.path;
    this.type = validationError.type;

    this.errors = validationError.inner.reduce(
      (acc, error) => ({
        ...acc,
        ...(error?.path && { [error.path]: error }),
      }),
      {},
    );
  }
}

/**
 * @example
 *  const { validate } = useLazyAsyncYupValidation(aSchema);
 *
 *  const handleSubmit = async (values) => {
 *    try {
 *      const hasErrors = await validate(values)
 *      doSomethingWithValidValues();
 *    }
 *    catch(error) {
 *      setErrors( error.errors )
 *      error.errors.forEach( ({ message }) => t(message)  )
 *    }
 *
 *    // we can also do something generic after the try catch:
 *    if(!hasErrors) {
 *      setSuccessMessage('Success!')
 *    } else {
 *      setGenericMessage('Something went wrong?')
 *    }
 *  }
 */
export const useLazyAsyncYupValidation = <ValuesType extends unknown>({
  schema,
}: {
  schema: Yup.AnySchema;
}): {
  validate: (values: ValuesType) => Promise<null | LazyYupValidationError<ValuesType>>;
} => ({
  validate: useCallback(
    async (values: ValuesType) => {
      try {
        await schema.validate(values, { abortEarly: false });
        return null;
      } catch (yupErrors) {
        throw new LazyYupValidationError(yupErrors);
      }
    },
    [schema],
  ),
});

export default useYupValidation;
