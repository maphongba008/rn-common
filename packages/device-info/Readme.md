# [`@rn-common/device-info`](./packages/device-info)

## Overview

This module provides utility functions to retrieve information about the device and the application. It leverages the `expo-device` and `expo-application` libraries to access various details such as device name, model, operating system, app version, and more.

## Installation

Install using npm:

```sh
npm install @rn-common/device-info
```

or yarn:

```sh
yarn add @rn-common/device-info
```

## Functions

### 1. `getDeviceInfo`

Retrieves detailed information about the device.

**Returns:**

- `DeviceInfo`: An object containing device-related information.

**Structure of `DeviceInfo` object:**

- `deviceName` (string): The name of the device.
- `modelName` (string): The model name of the device.
- `os` (string): The operating system of the device.
- `osVersion` (string): The version of the operating system.

**Example:**

```javascript
import { getDeviceInfo } from '@rn-common/device-info'

const deviceInfo = getDeviceInfo()
console.log(deviceInfo)
```

### 2. `getAppInfo`

Retrieves detailed information about the application.

**Returns:**

- `AppInfo`: An object containing application-related information.

**Structure of `AppInfo` object:**

- `name` (string): The name of the application.
- `version` (string): The native version of the application.
- `buildNumber` (string): The native build version of the application.
- `appId` (string): The application ID.

**Example:**

```javascript
import { getAppInfo } from '@rn-common/device-info'

const appInfo = getAppInfo()
console.log(appInfo)
```
