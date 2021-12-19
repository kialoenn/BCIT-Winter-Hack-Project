/**
 * This method is from https://stackoverflow.com/questions/9383593/extracting-the-exponent-and-mantissa-of-a-javascript-number
 * @param {number} number to be converted
 * @returns float number in ieee format
 */

function getFloat(number) {
    var float = new Float64Array([number]);
    var bytes = new Uint8Array(float.buffer);

    var sign = bytes[7] >> 7;
    var exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff;

    // Set the exponent to 0 (exponent bits to match bias)
    bytes[7] = 0x3f;
    bytes[6] |= 0xf0;

    return {
        sign: sign,
        exponent: exponent,
        mantissa: float[0]
    };
}

/**
 * The following methods are credited to Olli Etuaho, github: https://github.com/Oletus/float16-simulator.js.
 * We made some modifications so that it matches our need.
 */

/**
 * 
 * @param {exponentBits} exponentBits is the max number of exponent bit.
 * @returns the excess exponent bits
 */
function excessExponent(exponentBits) {
    var possibleExponents = Math.pow(2, exponentBits);
    return possibleExponents / 2 - 1;
}


function maxNormalExponent(exponentBits) {
    var possibleExponents = Math.pow(2, exponentBits);
    var bias = excessExponent(exponentBits);
    var allExponentBitsOne = possibleExponents - 1;
    return (allExponentBitsOne - 1) - bias;
}

/**
 * 
 * @param {*} number to be converted
 * @param {*} exponentBits max exponent bits
 * @param {*} mantissaBits max mantissaBits
 * @returns rounded fraction, for example, if input is 0.3755555555555, the rounded result will be 0.375
 */
function roundFraction(number, exponentBits, mantissaBits) {
    var possibleMantissas = Math.pow(2, mantissaBits);
    var mantissaMax = 2.0 - 1.0 / possibleMantissas;
    var max = Math.pow(2, maxNormalExponent(exponentBits)) * mantissaMax;
    if (number > max) {
        return max;
    }
    if (number < -max) {
        return -max;
    }

    var floatRep = getFloat(number);

    var mantissaRounded = Math.floor(floatRep.mantissa * possibleMantissas) / possibleMantissas;
    if (floatRep.exponent + excessExponent(exponentBits) <= 0) {
        return (floatRep.sign ? -0 : 0);
    }

    return (floatRep.sign ? -1 : 1) * Math.pow(2, floatRep.exponent) * mantissaRounded;
}

/**
 * 
 * @param {*} exponentBits 
 * @param {*} mantissaBits 
 */
function floatContext(number, exponentBits, mantissaBits) {
    var round = roundFraction(number, exponentBits, mantissaBits);
    var result = getFloat(round);
    var exponentBitRepr = (result.exponent + excessExponent(exponentBits)).toString(2);
    var mantissaBitRepr = (result.mantissa * Math.pow(2, mantissaBits)).toString(2).substring(1);
    var isZero = result.exponent === -1023;
    if (isZero) {
        exponentBitRepr = '';
        mantissaBitRepr = '';
    }
    while (exponentBitRepr.length < exponentBits) {
        exponentBitRepr = '0' + exponentBitRepr;
    }
    while (mantissaBitRepr.length < mantissaBits) {
        mantissaBitRepr = '0' + mantissaBitRepr;
    }
    return {
        sign: String(result.sign),
        exponent: exponentBitRepr,
        mantissa: mantissaBitRepr,
        isZero: isZero
    };

}