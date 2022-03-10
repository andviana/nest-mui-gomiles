import format from 'date-fns/format';

const formatDate = (date: string | Date): string => {
  const dateValue = typeof date === 'string' ? Date.parse(date) : date;
  return format(dateValue, 'dd-MM-yyyy');
};

export default formatDate;