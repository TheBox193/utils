import * as Yup from 'yup';

function makeRequired(schema: Yup.AnySchema, message: string): Yup.AnySchema {
  return schema.typeError(message).required(message);
}

export default makeRequired;
