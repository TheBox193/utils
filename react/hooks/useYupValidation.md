# useYupValidation

## Example Usage
```
  const values = {
    firstName: '',
    lastName: 'supercalifragilisticexpialidocious',
  }

  const { hasErrors, errors } = useYupValidation({
    dataSchema,
    values,
  });
```

## Parameters

### `dataSchema`
A Yup Schema. See [Yup Docs](https://github.com/jquense/yup#mixedtransformcurrentvalue-any-originalvalue-any--any-schema).

### `values`
The object to validate with key / value pairs.
```
  {
    firstName: '',
    lastName: 'supercalifragilisticexpialidocious',
  }

## Returns

### `hasErrors`
Returns `true` when the there is at least one error.
Returns `false` when there are no errors.

### `errors`

Returns an object of [Yup Validation Errors](https://github.com/jquense/yup#validationerrorerrors-string--arraystring-value-any-path-string) organized by 'path' of the item that errored.

##### Example:
```
{
  hasErrors: true,
  errors: {
    firstName: {
      message: 'First Name is Required',
      ...
    },
    lastName: {
      message: 'Last Name cannot be longer than 30 characters',
      ...
    },
  },
}
```

