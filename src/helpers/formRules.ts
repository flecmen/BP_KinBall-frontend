import emailRegex from './emailRegex';

export default {
  required: (value: string) => !!value || 'required',
  isEmail: (value: string) =>
    emailRegex.test(value) || 'must be email !',
};
