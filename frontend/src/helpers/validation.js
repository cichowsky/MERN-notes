import { isObject } from './utils';

export function validateEmail(text) {
  const regexp =
    // eslint-disable-next-line no-useless-escape
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regexp.test(text);
}

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
  email(value) {
    return validateEmail(value) ? '' : 'Invalid email!';
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
