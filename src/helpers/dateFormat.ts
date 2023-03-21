export default (date: Date | undefined) => {
  if (!date) return 'CHYBA'
  return new Date(date).toLocaleString([], {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })
}
