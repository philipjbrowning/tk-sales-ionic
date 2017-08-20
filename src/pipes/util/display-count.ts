export function displayCount(singleText: string, pluralText: string) {
  return function _displayResult(value: number) {
    return value === 1 ? '1 ' + singleText : (value || 0) + ' ' + pluralText;
  }
}
