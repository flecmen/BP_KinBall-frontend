export function dateTime(date: Date | undefined) {
  if (!date) return 'CHYBA'
  return new Date(date).toLocaleString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}

export function date(date: Date | undefined) {
  if (!date) return 'CHYBA'
  return new Date(date).toLocaleString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export function time(date: Date | undefined) {
  if (!date) return 'CHYBA'
  return new Date(date).toLocaleString([], {
    hour: 'numeric',
    minute: 'numeric',
  })
}

export default {
  dateTime,
  date,
  time,
}


