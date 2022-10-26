/*
Copyright 2012 Jean-François Vial <https://about.me/jeff_>
Copyright 2022 Maxime Di Natale <pivoorigami@gmail.com>

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
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
