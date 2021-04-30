import * as Yup from 'yup';

// We can let typescript infer return type safely
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function makeNullable(schema: Yup.AnySchema) {
  return Yup.lazy((val) => (val === null ? Yup.string().nullable() : schema));
}

export default makeNullable;
