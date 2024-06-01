import createPaia from '../../helpers/createController.js';

/**
 * @param {("USER" | "ADM" | "TOTEM")[]} roles
 */
export function useGuard(roles) {
  return createPaia(async (req, res, next) => {});
}
