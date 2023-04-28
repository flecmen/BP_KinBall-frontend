import { Event_extended } from 'src/types/dbTypes';

export default function openGoogleCalendar(event: Event_extended, window: Window & typeof globalThis) {
  let startDate = new Date(event.time).toISOString();
  const endDate = new Date(new Date(startDate).getTime() + 2 * 60 * 60 * 1000)
    .toISOString()
    .replace(/\D/g, '') // remove non-digits
    .slice(0, -3) // remove last three digits (milliseconds)
    .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3T$4$5$6Z');

  startDate = startDate
    .replace(/\D/g, '') // remove non-digits
    .slice(0, -3) // remove last three digits (milliseconds)
    .replace(/(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/, '$1$2$3T$4$5$6Z');
  const description = event.description ?? '';

  const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    event.type
  )}&dates=${startDate}/${endDate}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(event.address)}`;
  // Open Google Maps in a new window
  window.open(url, '_blank');
}
