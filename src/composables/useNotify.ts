import { useQuasar } from 'quasar';
import { QNotifyUpdateOptions } from 'quasar';


export default function useNotify() {
  const $q = useQuasar();
  const success = (message: string) => {
    $q.notify({
      type: 'positive',
      message: message
    })
  }

  const fail = (message: string) => {
    $q.notify({
      type: 'negative',
      message: message
    })
  }

  const warning = (message: string) => {
    $q.notify({
      type: 'warning',
      message: message
    })
  }

  const info = (message: string) => {
    $q.notify({
      type: 'info',
      message: message
    })
  }

  const wait = (message: string) => {
    // we need to get the notification reference
    // otherwise it will never get dismissed ('ongoing' type has timeout 0)
    const notif = $q.notify({
      type: 'ongoing',
      message: message
    })

    return notif;
  }

  const resolve_wait = (notif: (props?: QNotifyUpdateOptions | undefined) => void) => {
    notif();
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
