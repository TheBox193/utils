/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const safeJsonParse = (string: string) => {
  try {
    return JSON.parse(string);
  } catch (error) {
    return string;
  }
};

export default safeJsonParse;
