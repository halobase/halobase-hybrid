/**
 * Returns a string to a key if the key exists in the 
 * form data otherwise an empty string gets returned.
 * This is useful when getting any primitive typed values
 * from a FormData object.
 * 
 * @example
 * const a_string = get(form, "key");
 * const a_number = +get(form, "key");
 * const a_boolean = !!get(form, "key");
 * 
 * @param {FormData} form
 * @param {string} key
 * @returns {string}
 */
export function get(form, key) {
  return form.get(key)?.toString() || "";
}
