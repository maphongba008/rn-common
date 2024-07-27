import * as Crypto from "expo-crypto";

/**
 * Generates a universally unique identifier (UUID).
 *
 * This function uses the `Crypto.randomUUID()` method to generate a UUID, which is a standardized 128-bit identifier commonly used for uniquely identifying information in computing systems.
 *
 * @returns {string} A string representation of the generated UUID.
 *
 * @example
 * const id = uuid();
 * console.log(`Generated UUID: ${id}`);
 */
export const uuid = () => {
  return Crypto.randomUUID();
};

/**
 * Formats a string by replacing placeholders with corresponding values from an arguments object.
 *
 * Placeholders in the string should be enclosed in double curly braces (e.g., `{{key}}`), where `key` corresponds to a property name in the `args` object. The function replaces these placeholders with their respective values from `args`.
 *
 * @param {string} text - The string containing placeholders to be replaced.
 * @param {Record<string, any>} args - An object containing key-value pairs where keys correspond to placeholders in the text and values are the replacement values.
 *
 * @returns {string} The formatted string with placeholders replaced by their corresponding values from `args`.
 *
 * @example
 * const template = "Hello, {{name}}! Welcome to {{place}}.";
 * const values = { name: "Alice", place: "Wonderland" };
 * const result = format(template, values); // "Hello, Alice! Welcome to Wonderland."
 */
export const formatTemplate = (template: string, args: Record<string, any>) => {
  let formattedText = template;
  Object.entries(args).forEach(([key, value]) => {
    formattedText = formattedText.replace(`{{${key}}}`, String(value));
  });
  return formattedText;
};
