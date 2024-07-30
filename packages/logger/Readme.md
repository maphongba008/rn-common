# [`@rn-common/logger`](./packages/logger)

This module provides a logging utility for React Native applications, leveraging `react-native-logs` and `expo-file-system` for storing logs in a file. It allows you to log messages with various severity levels and save them to a designated directory.

## Installation

Install using npm:

```sh
npm install @rn-common/logger
```

or yarn:

```sh
yarn add @rn-common/logger
```

## Usage

### `logger`

The `logger` object provides methods to log messages with different severity levels.

#### Methods

- **`setSeverity(severity: 'debug' | 'info' | 'warn' | 'error')`**

  - Sets the severity level of the logger. Messages with a lower severity level than the set level will be ignored.

- **`debug(message: any)`**

  - Logs a debug message.

- **`info(message: any)`**

  - Logs an informational message.

- **`warn(message: any)`**

  - Logs a warning message.

- **`error(message: any)`**
  - Logs an error message.

#### Example

```javascript
import { logger } from '@rn-common/logger'

// Set severity level
logger.setSeverity('info')

// Log messages with different severity levels
logger.debug('This is a debug message')
logger.info('This is an info message')
logger.warn('This is a warning message')
logger.error('This is an error message')
```
