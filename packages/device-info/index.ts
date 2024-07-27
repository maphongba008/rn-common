import * as Device from "expo-device";
import * as Application from "expo-application";

export const getDeviceInfo = () => {
  return {
    deviceName: Device.deviceName,
    modelName: Device.modelName,
    os: Device.osName,
    osVersion: Device.osVersion,
  };
};

export const getAppInfo = () => {
  return {
    name: Application.applicationName,
    version: Application.nativeApplicationVersion,
    buildNumber: Application.nativeBuildVersion,
    appId: Application.applicationId,
  };
};
