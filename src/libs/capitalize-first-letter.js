export const capitalizeFirstLetter = string => {
  return string
    .split(' ')
    .map(str => str.charAt(0).toUpperCase() + str.slice(1))
    .join(' ')
}
