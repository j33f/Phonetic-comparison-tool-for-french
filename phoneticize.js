/*
Author : jean-François VIAL <http://about.me/Jeff_>
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  

Licenced under the Apathe 2.0 licence.

Fork it on GitHub ! https://github.com/Modulaweb/Phonetic-comparison-tool-for-french
*/

/**
 * @param {string} str
 */
function cleanStr(str) {
	return str
		.normalize('NFKD')
		.replace(/\p{Diacritic}/gu, '')
		.trim();
}

/**
 * @param {string} str
 */
function unduplicateLetters(str) {
	// makes "heeeelllloolllo theere" to "helolo there"
	return [...str].map((char, index, array) => (char === array[index - 1] ? '' : char)).join('');
}

/**
 * @param {string} str
 */
function phoneticize(str) {
	// creates a french phonetic string allowing to guess that "sottereleu" (misspelled) is similar to "sauterelle" (correctly spelled)
	// 1) clean the string making all chars only letters, numbers and spaces
	// 2) remove duplicate letters
	// 3) replace some similar phonems by an univoque one
	// factorizing the words that way allow to compare 2 words and find if they sounds the same or not.
	// it is more accurate than any soundex functions since it not based on differences of raw words
	// it is more faster and less greedy
	return unduplicateLetters(cleanStr(str))
		.replace('th', 't')
		.replace('ph', 'f')
		.replace('ch', '§')
		.replace('aint', 'int')
		.replace(/([aeoiuy])h/g, '$1')
		.replace(/h([aeoiuy])/g, '$1')
		.replace(/(leu |leux |leut)/g, 'le ')
		.replace('ce', 'sse')
		.replace(/c([aeoiuyk])/g, 'k$1')
		.replace('kk', 'k')
		.replace(/([^aeouy])ie /g, '$1i ')
		.replace(/([aiouy])se? /g, '$1sse ')
		.replace('rt', 'r')
		.replace('y', 'i')
		.replace('ue ', 'u ')
		.replace('oie ', 'oi ')
		.replace('ies ', 'i ')
		.replace('tp', 'p')
		.replace(/(rs |rts)/g, 'r ')
		.replace('an', 'en')
		.replace(/(ein |ain )/g, 'in ')
		.replace(/(ai|ay|ei|ey)/g, 'e')
		.replace('ci', 'si')
		.replace('qu', 'k')
		.replace('au', 'o')
		.replace('ae', 'e')
		.replace(/([^aeiouys])[ts] /g, '$1 ')
		.replace(/([aeiouy])m([pb])/g, '$1n$2')
		.replace(/( eu | eus | eut | ut )/g, ' u ')
		.replace(/(eu|oe)/g, 'e')
		.replace(/([^aeiouy])h/g, '$1')
		.replace(/([aeiouy]s[tm]) /g, '$1e ')
		.replace(/e[rt] /g, 'e ')
		.replace(/(ais |ait )/g, 'e ')
		.replace(/(eau|au)/g, 'o')
		.replace(/(eu|eux|eut)/g, 'e')
		.replace(/\s+/g, '');
}

export default phoneticize;
