export default (vehicle) => {
  const {
    manufacturer: make,
    model: variant,
    fuelType: fuel_type, // eslint-disable-line
    engineSize,
    registrationDate,
  } = vehicle;
  const splitVariant = variant.split(' ');
  const model = splitVariant.shift();
  const date = new Date(registrationDate);

  return {
    make,
    model,
    variant: splitVariant.join(' '),
    fuel_type,
    // transmission: 'Manual',
    engine_capacity:
      engineSize && (Math.round(~~engineSize.replace('cc', '') / 100) / 10).toFixed(1), // eslint-disable-line
    year: date.getFullYear(),
    month: date.getMonth(),
    milage: 0,
  };
};
