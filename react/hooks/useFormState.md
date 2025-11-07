# useFormValidation

## Example Usage
```
  const initialState = {
    firstName: '',
    lastName: 'Smith',
  }

  const {
    hasValuesChanged,
    values,
    valuesDelta,
    handleReset,
    handleSetValue,
  } = useFormState({ initialState });
```

## Parameters

### `initialState`
The object to validate with key / value pairs.
```
  {
    firstName: 'Bob',
    lastName: 'Smith',
  }
```

## Returns

```
{
  handleSetValue: Function,
  values: {
    firstName: 'Mary',
    lastName: 'Smith',
  },
  valuesDelta: {
    firstName: 'Mary',
  },
  hasValuesChanged: true,
  handleReset: Function,
}
```

### `handleSetValue`
Update a value by key.

```
handleSetValue('firstName', 'Mary');
```

### `values`
The most recent updated `values` for the form.
```
  {
    firstName: 'Mary',
    lastName: 'Smith',
  }
```

### `valuesDelta`
The difference / delta between `initialState` and current `values`.
```
  {
    firstName: 'Mary',
  }
```

### `hasValuesChanged`
`true` when at least one value has changed.

`false` when no values have changed.

### `handleReset`
Resets the `values` back to `initialState`

```
handleReset();
```

