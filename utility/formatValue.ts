const formatValue = (value: string | number): string => {
    const numValue = typeof value === 'string' ? Number(value) : value;
    const currency = new Intl.NumberFormat([], {
      style: 'currency',
      currency: 'BRL',
    });
  
    return currency.format(numValue);
  };
  
  export default formatValue;