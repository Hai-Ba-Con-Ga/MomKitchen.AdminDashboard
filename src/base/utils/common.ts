export function calculateAge(birthDate: string): number {
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();

  const differenceInMs = currentDate.getTime() - birthDateObj.getTime();
  const ageInMilliseconds = new Date(differenceInMs).getTime();

  // Calculate the age in years
  const age = Math.abs(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

  return Math.floor(age);
}
export function toPascalCase(input) {
  // Replace non-alphanumeric characters with spaces
  const words = input.replace(/[^a-zA-Z0-9]+/g, ' ').split(' ');
  
  // Capitalize the first letter of each word and join them
  const pascalCase = words.map(word => {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }).join('');

  return pascalCase;
}