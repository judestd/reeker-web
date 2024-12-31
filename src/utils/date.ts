import dayjs from 'dayjs';

export const formatDate = (date?: string) => {
  if (!date) return '-';
  return dayjs(date).format('YYYY-MM-DD');
};

export const formatDateForApi = (date: dayjs.Dayjs) => {
  return date.format('YYYY-MM-DD');
};