import { useQuasar } from 'quasar';
import { QNotifyUpdateOptions } from 'quasar';
import { i18n } from 'src/utils/i18n';


export default function useNotify() {
  const $q = useQuasar();
  const success = (message: string) => {
    $q.notify({
      type: 'positive',
      message: i18n.t(message)
    })
  }

  const fail = (message: string) => {
    $q.notify({
      type: 'negative',
      message: i18n.t(message)
    })
  }

  const warning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: i18n.t(message)
    })
  }

  const info = (message: string) => {
    $q.notify({
      type: 'info',
      message: i18n.t(message)
    })
  }

  const wait = (message: string) => {
    // we need to get the notification reference
    // otherwise it will never get dismissed ('ongoing' type has timeout 0)
    const notif = $q.notify({
      type: 'ongoing',
      message: i18n.t(message)
    })

    return notif;
  }

  const resolve_wait = (notif: (props?: QNotifyUpdateOptions | undefined) => void) => {
    notif();
    $q.notify({
      type: 'positive',
      message: i18n.t('success')
    })
  }

  return {
    success,
    fail,
    warning,
    info,
    wait,
    resolve_wait,
  }
}
