const validator = require('validator');

/**
 * Utility class for data validation functions.
 */
class DataUtils {
  /**
   * Validates if the provided string is a valid email address.
   * @param {string} mail - The email address to validate.
   * @returns {boolean} `true` if the email is valid, `false` otherwise.
   */
  static validMail(mail) {
    return validator.isEmail(String(mail).toLowerCase().trim());
  }

  /**
   * Validates if the provided data is a non-empty string, neither `undefined` nor `null`.
   * @param {*} data - The data to validate.
   * @returns {boolean} `true` if the data is a valid, non-empty string, `false` otherwise.
   */
  static validString(data) {
    return data !== undefined && data !== null && data !== '';
  }
}

module.exports = DataUtils;
