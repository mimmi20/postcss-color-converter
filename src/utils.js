import convert from 'color-convert';
import { DEFAULT_HEX_ALPHA, RGB_COLOR, HSL_COLOR } from './constants.js';

export function parseHEXAColor(color) {
  const newColor = color.slice(1);
  let hexColor;
  let hexAlpha;

  switch (newColor.length) {
    case 4:
      hexAlpha = newColor.slice(-1) + newColor.slice(-1);
      hexColor = newColor.slice(0, -1);
      break;
    case 8:
      hexAlpha = newColor.slice(-2);
      hexColor = newColor.slice(0, -2);
      break;
    case 3:
    case 6:
      hexAlpha = DEFAULT_HEX_ALPHA;
      hexColor = newColor;
      break;
  }

  return {
    hexColor,
    hexAlpha,
  };
}

export function convertHEXAlphaValueToNumber(value) {
  return Number((parseInt(value, 16) / 255).toFixed(2)).toString();
}

export function convertNumberAlphaValueToHEX(value) {
  let result = Math.round(value * 255).toString(16);

  if (result === '0') {
    result = '00';
  }

  return result;
}

export function getHEXColorStr(inputColorFormat, color, alpha) {
  const hexCode = convert[inputColorFormat].hex(color);

  let hex = '#' + hexCode;

  if (alpha) {
    hex = hex + convertNumberAlphaValueToHEX(+alpha);
  }

  return hex.toLowerCase();
}

const getRGBColorArr = (color, inputColorFormat) => (inputColorFormat !== RGB_COLOR ? convert[inputColorFormat].rgb(color) : color);

export function getRGBColorStr(inputColorFormat, color, alpha, isUseModernSyntax) {
  const colorStr = getRGBColorArr(color, inputColorFormat).join(isUseModernSyntax ? ' ' : ', ');

  if (isUseModernSyntax) {
    return `rgb(${colorStr}${alpha ? ` / ${alpha}` : ''})`;
  }

  return alpha ? `rgba(${colorStr}, ${alpha})` : `rgb(${colorStr})`;
}

const getHSLArr = (color, inputColorFormat) => {
  const colorArr = inputColorFormat !== HSL_COLOR ? convert[inputColorFormat].hsl(color) : color;

  return [colorArr[0].toString(), `${colorArr[1]}%`, `${colorArr[2]}%`];
};

export function getHSLColorStr(inputColorFormat, color, alpha, isUseModernSyntax) {
  const colorStr = getHSLArr(color, inputColorFormat).join(isUseModernSyntax ? ' ' : ', ');

  if (isUseModernSyntax) {
    return `hsl(${colorStr}${alpha ? ` / ${alpha}` : ''})`;
  }

  return alpha ? `hsla(${colorStr}, ${alpha})` : `hsl(${colorStr})`;
}
