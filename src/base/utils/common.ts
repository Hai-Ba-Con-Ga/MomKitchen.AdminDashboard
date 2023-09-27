export function calculateAge(birthDate: string): number {
  const birthDateObj = new Date(birthDate);
  const currentDate = new Date();

  const differenceInMs = currentDate.getTime() - birthDateObj.getTime();
  const ageInMilliseconds = new Date(differenceInMs).getTime();

  // Calculate the age in years
  const age = Math.abs(ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25));

  return Math.floor(age);
}
