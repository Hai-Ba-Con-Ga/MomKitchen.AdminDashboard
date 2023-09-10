export function deepEqual(obj1: any, obj2: any) {
  // Check if the objects are of the same type
  if (typeof obj1 !== typeof obj2) {
    return false;
  }

  // Handle primitive values and null
  if (obj1 === obj2) {
    return true;
  }

  // Check if either object is null or undefined
  if (
    obj1 === null ||
    obj2 === null ||
    obj1 === undefined ||
    obj2 === undefined
  ) {
    return false;
  }

  // Check if the objects have a different number of properties
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Recursively compare each property
  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }

  return true;
}
