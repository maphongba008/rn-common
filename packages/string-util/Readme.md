# [`@rn-common/string-util`](./packages/string-util)

This module provides utilities for generating universally unique identifiers (UUIDs) and formatting strings with placeholders using the Expo Crypto library.

## Installation

Install using npm:

```sh
npm install @rn-common/string-util
```

or yarn:

```sh
yarn add @rn-common/string-util
```

## Utilities

### `uuid()`

Generates a universally unique identifier (UUID). This function utilizes `Crypto.randomUUID()` to produce a UUID, a standardized 128-bit identifier commonly used for uniquely identifying information in computing systems.

#### Returns

- `string`: A string representation of the generated UUID.

#### Example

```javascript
import { uuid } from '@rn-common/string-util'

const id = uuid()
console.log(`Generated UUID: ${id}`)
```

### `formatTemplate(template: string, args: Record<string, any>)`

Formats a string by replacing placeholders with corresponding values from an arguments object. Placeholders in the string should be enclosed in double curly braces (e.g., `{{key}}`), where `key` corresponds to a property name in the `args` object. The function replaces these placeholders with their respective values from `args`.

#### Parameters

- `template` (`string`): The string containing placeholders to be replaced.
- `args` (`Record<string, any>`): An object containing key-value pairs where keys correspond to placeholders in the text and values are the replacement values.

#### Returns

- `string`: The formatted string with placeholders replaced by their corresponding values from `args`.

#### Example

```javascript
import { formatTemplate } from '@rn-common/string-util'

const template = 'Hello, {{name}}! Welcome to {{place}}.'
const values = { name: 'Alice', place: 'Wonderland' }
const result = formatTemplate(template, values)
console.log(result) // "Hello, Alice! Welcome to Wonderland."
```
