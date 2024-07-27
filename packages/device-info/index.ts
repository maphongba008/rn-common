import * as Device from "expo-device";
import * as Application from "expo-application";

/**
 * Retrieves information about the device.
 *
 * @returns {DeviceInfo} An object containing information about the device.
 *
 * @example
 * const deviceInfo = getDeviceInfo();
 */
export const getDeviceInfo = () => {
  return {
    deviceName: Device.deviceName,
    modelName: Device.modelName,
    os: Device.osName,
    osVersion: Device.osVersion,
  };
};

/**
 * Retrieves information about the app.
 *
 * @returns {AppInfo} An object containing information about the app.
 *
 * @example
 * const appInfo = getAppInfo();
 */
export const getAppInfo = () => {
  return {
    name: Application.applicationName,
    version: Application.nativeApplicationVersion,
    buildNumber: Application.nativeBuildVersion,
    appId: Application.applicationId,
  };
};
