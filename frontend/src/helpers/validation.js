import { isObject } from './utils';

const availableRules = {
  required(value) {
    return !value ? 'Field is required!' : '';
  },
  minLength(value, length) {
    return value.length < length ? `Min. ${length} signs required!` : '';
  },
  maxLength(value, length) {
    return value.length > length ? `Max. ${length} signs allowed!` : '';
  },
};

// eslint-disable-next-line consistent-return
export const validate = (rules = {}, value) => {
  if (!isObject(rules)) throw new Error(`rules must to be an object`); // e.g. { required: true, maxLength: 100 }

  const rulesNames = Object.keys(rules);

  for (let i = 0; i < rulesNames.length; i += 1) {
    const rule = rulesNames[i];
    const validationRule = availableRules[rule];

    if (!validationRule) {
      throw new Error(`There is not such rule as "${rule}" in available rules!`);
    }
    const ruleArg = rules[rule];
    const err = validationRule(value, ruleArg);
    if (err) {
      return err;
    }
  }
};
