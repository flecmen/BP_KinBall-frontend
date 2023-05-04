import emailRegex from './emailRegex';
import { i18n } from 'src/utils/i18n';

export default {
  required: (value: string) => !!value || i18n.t('formRules.required'),
  isEmail: (value: string) =>
    emailRegex.test(value) || i18n.t('formRules.isEmail'),
};
