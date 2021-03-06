let input = document.getElementById('hash_entry');
load_params();
full_compute(input.value);

input.onkeyup = function() { 
	full_compute(input.value); 
}

// Use URL parameters if set
function load_params() {
	let url = new URL(window.location.href)
	let param = url.searchParams.get('s')
	input.value = param;
}

// Compute and display all hashes
function full_compute(input) {
	compute(input, md5, 'md5_out');
	compute(input, sha1, 'sha1_out');
	js_sha(input, 'SHA-224', 'sha224_out');
	js_sha(input, 'SHA3-224', 'sha3224_out');
	compute(input, sha256, 'sha256_out');
	js_sha(input, 'SHA3-256', 'sha3256_out');
	js_sha(input, 'SHA-384', 'sha384_out');
	js_sha(input, 'SHA3-384', 'sha3384_out');
	js_sha(input, 'SHA-512', 'sha512_out');
	js_sha(input, 'SHA3-512', 'sha3512_out');

	document.getElementById('chars').innerHTML = chars_info(input);
}

// Hashes from js-crypto
function compute(input, hash, id) {
	let entry_value = input;
	let hash_value = hash(entry_value);
	document.getElementById(id).textContent = hash_value;
}

// Hashes from jsSHA
function js_sha(input, hash, id) {
	var shaObj = new jsSHA(hash, 'TEXT');
	shaObj.update(input);
	var hash = shaObj.getHash('HEX');
	document.getElementById(id).textContent = hash;
}

// Compute and display character information
function chars_info(input) {
	let out = "";

	// https://mathiasbynens.be/notes/javascript-unicode
	let stringarr = Array.from(input);

	if (stringarr.length > 0) {
		out += "<tr>" 
			+ "<th>Letter</th>"
			+ "<th>Unicode</th>"
			+ "<th>Dec / Hex</th>"
			+ "</tr>";
	}

	for (var i = 0; i < stringarr.length; i++) {
		let letter = stringarr[i];
		let code = letter.codePointAt();
		let hex_code = code.toString(16).toUpperCase();
		let unicode = "U+" + hex_code.padStart(4, '0');

		out += "<tr>" 
			+ "<td><span class='char'><b>" + letter + "</b></span></td>"
			+ "<td><a href='https://www.compart.com/en/unicode/" + unicode + "'>" + unicode + "</a></td>"
			+ "<td>" + code + " / 0x" + hex_code + "</td>"
			+ "</tr>";
	}
	return out;
}
