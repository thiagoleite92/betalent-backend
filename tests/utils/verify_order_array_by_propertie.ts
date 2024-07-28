export const isSortedByProperty = <T>(array: T[], property: keyof T): boolean => {
  for (let i = 1; i < array.length; i++) {
    if (array[i - 1][property] > array[i][property]) {
      return false
    }
  }
  return true
}
