# makeNullable

`makeNullable` is a Yup validation helper. It allows the value `null` to be considered a valid value. This is specifically helpful when working with an enums of values via the `.oneOf()` since `.oneOf()` doesn't permit null values out of the box.

## Example Usage

```
const genders = ['Male', 'Female', 'Other'];
const genderSchema = Yup.string().oneOf(
  genders,
  'Gender must be a valid selection',
);

genderSchema.isValid('Female') // => true
genderSchema.isValid(null) // => false

const genderSchemaNullable = makeNullable(genderSchema);

genderSchemaNullable.isValid('Female') // => true
genderSchemaNullable.isValid(null) // => true

```

A long hand alternate without this helper:
```
const genders = ['Male', 'Female', 'Other'];
const genderSchemaNullable = Yup.string()
 .nullable()
 .oneOf(
  [...genders, null],
  'Gender must be a valid selection',
);

genderSchemaNullable.isValid('Female') // => true
genderSchemaNullable.isValid(null) // => true

```

## Parameters

### `schema`
A Yup schema that needs to allow `null` as a value.

## Returns

### `schema`
A Yup schema that now allows `null`.
