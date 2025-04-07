/**
 * ## IP-Geo Country Flag Utilities
 *
 * This module provides utility functions for working with ISO 3166-1 alpha-2 country codes
 * and converting them to flag emojis.
 *
 * @module ip-geo/src/utils/countryFlag
 *
 * @example
 * ```typescript
 * import { countryCodeToFlagEmoji } from './countryFlag';
 *
 * const usFlag = countryCodeToFlagEmoji("US"); // Returns "🇺🇸"
 *
 * if (usFlag) {
 *   console.log("US Flag:", usFlag);
 * }
 * ```
 */

/**
 * Converts an ISO 3166-1 alpha-2 country code to its corresponding flag emoji.
 *
 * @param countryCode A string representing an ISO 3166-1 alpha-2 country code (e.g., "US", "CN", "GB").
 * @returns The flag emoji string corresponding to the country code, or `null` if the country code is invalid.
 *
 * @example
 * ```typescript
 * import { countryCodeToFlagEmoji } from './countryFlag'; // Adjust the import path as needed
 *
 * const usFlag = countryCodeToFlagEmoji("US"); // Returns "🇺🇸"
 * const cnFlag = countryCodeToFlagEmoji("CN"); // Returns "🇨🇳"
 * const invalidFlag = countryCodeToFlagEmoji("XX"); // Returns null
 *
 * if (usFlag) {
 *   console.log("US Flag:", usFlag);
 * } else {
 *   console.log("Invalid country code");
 * }
 * ```
 */
export function countryCodeToFlagEmoji(countryCode: string): string | null {
	const upperCaseCode = countryCode.toUpperCase();

	if (!isValidCountryCode(upperCaseCode)) {
		return null;
	}

	const regionalIndicatorSymbols = toRegionalIndicatorSymbols(upperCaseCode);
	return String.fromCodePoint(...regionalIndicatorSymbols);
}

/**
 * Checks if a given string is a valid ISO 3166-1 alpha-2 country code.
 * The code must consist of exactly two uppercase letters.
 *
 * @param code The string to check (must be uppercase).
 * @returns `true` if the string is a valid country code, `false` otherwise.
 */
function isValidCountryCode(code: string): boolean {
	return /^[A-Z]{2}$/.test(code);
}

/**
 * The base Unicode code point for regional indicator symbols.  This is added to the
 * character code of an uppercase letter to get the code point of the corresponding
 * regional indicator symbol.
 */
const REGIONAL_INDICATOR_BASE = 127397;

/**
 * Converts a 2-character uppercase ISO 3166-1 alpha-2 country code into an array
 * of Unicode code points representing regional indicator symbols.
 *
 * @param code The 2-character uppercase country code.
 * @returns An array containing the two regional indicator symbol code points.
 */
function toRegionalIndicatorSymbols(code: string): number[] {
	return [REGIONAL_INDICATOR_BASE + code.charCodeAt(0), REGIONAL_INDICATOR_BASE + code.charCodeAt(1)];
}
