import emailRegex from './emailRegex';
import { i18n } from 'src/composables/i18n';

export default {
  required: (value: string) => !!value || i18n.t('form.rules.required'),
  isEmail: (value: string) =>
    emailRegex.test(value) || i18n.t('form.rules.isEmail'),
};
