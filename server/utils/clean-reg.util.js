import config from '../../config';

export default function (reg) {
  const regno = reg && reg.replace(/\s/g, '').toUpperCase();

  if (!regno || !config.validation.reg.test(regno)) {
    return false;
  }
  return config.validation.reg.test(regno) && regno;
}
