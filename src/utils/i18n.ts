import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';

const instance = createI18n({
  locale: 'en-US',
  messages,
});

export default instance;

export const i18n = instance.global;
