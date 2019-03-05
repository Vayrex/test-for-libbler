/**
 * Check if Date is valid
 * @param date
 */
export function isValidDate(date:Date) {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    return isNaN(date.getTime());
  }
  return false;
}
