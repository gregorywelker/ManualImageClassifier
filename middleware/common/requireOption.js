/*
 * Load data from and object repository
 */

function requireOption(objectRepository, propertyName) {
  if (objectRepository && objectRepository[propertyName]) {
    return objectRepository[propertyName];
  }
  throw new TypeError(propertyName + " required");
}

module.exports = requireOption;
