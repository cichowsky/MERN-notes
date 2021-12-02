import { isObject } from './utils';

const availableRules = {
  required(value) {
    return !value ? 'Field is required!' : '';
  },
  maxLength(value, length) {
    return value.length > length ? `Max. ${length} signs allowed!` : '';
  },
};

const validate = (rules = {}, value) => {
  if (!isObject(rules)) throw new Error(`rules must to be an object`); // e.g. { required: true, maxLength: 100 }

  let errorMessage = '';

  Object.keys(rules).forEach((rule) => {
    const validationRule = availableRules[rule];
    if (!validationRule) {
      throw new Error(`There is not such rule as "${rule}" in available rules!`);
    }
    const ruleArg = rules[rule];

    const err = validationRule(value, ruleArg);
    if (err) errorMessage = err;
  });

  return errorMessage;
};

export default validate;
