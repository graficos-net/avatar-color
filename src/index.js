// @ts-check

const available16Chars = 'abcdef1234567890'

/**
 * @param {number} number
 */
function getNumberIn360Cycles(number) {
  if (number > 360) {
    return getNumberIn360Cycles(Math.ceil((number / 360) * 20 + 16))
  }
  return number
}

const getHexChar =
  /**
   * @param {string} string
   */
  (string) => {
    const parsed = parseInt(`0x${string}`, 16)
    return parsed
  }

/**
 * @param {string} string
 */
function getNumerIn360RangeFromString(string) {
  const sample = string.length > 16 ? string.substring(0, 16) : string
  // console.log({sample})
  const arrayOfNumbers = [...sample]
    .filter((char) => char !== ' ' || !char)
    .map(getHexChar)
    .reduce(
      (acc, currentNumber, i) => [
        ...acc,
        isNaN(currentNumber) ? getHexChar(available16Chars[i]) : currentNumber,
      ],
      []
    )
  const total = arrayOfNumbers.reduce((a, b) => a + b * 10, 0)
  return getNumberIn360Cycles(total)
}

/**
 * @param {string} string
 */
function getCharHex(string) {
  if (!string || !string.length || typeof string !== 'string') {
    return '0'
  }
  try {
    return '' + getNumerIn360RangeFromString(string)
  } catch (error) {
    console.log({ error })
  }
}

/**
 * Returns HSL/HSLA format color as a astring
 * @param {string} entryString
 * @param {45} [saturation]
 * @param {50} [light]
 * @param {1} [alpha]
 */
export default function gGetAvatarColor(
  entryString,
  saturation = 45,
  light = 50,
  alpha = 1
) {
  let color = `hsl${alpha !== 1 ? 'a' : ''}(`
  entryString = '' + entryString || ' '
  color += getCharHex(entryString)
  color += `, ${saturation}%, ${light}%${alpha !== 1 ? ', ' + alpha : ''})`
  return color
}
