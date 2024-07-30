# [`@rn-common/event-emitter`](./packages/event-emitter)

## Overview

This module provides a simple event emitter utility for subscribing to and emitting events. It includes types for defining event callbacks, an event registration array, and functions for subscribing to and emitting events.

## Installation

Install using npm:

```sh
npm install @rn-common/event-emitter
```

or yarn:

```sh
yarn add @rn-common/event-emitter
```

## Functions

### `subscribe`

Registers a callback function for a specific event type.

**Parameters:**

- `type` (string): The event type to subscribe to.
- `callback` (CallBack<T>): The function to be executed when the event is emitted.

**Returns:**

- A function to unsubscribe from the event.

**Example:**

```javascript
import { subscribe } from '@rn-common/event-emitter'

const unsubscribe = subscribe('eventType', (data) => {
  console.log(data)
})

// To unsubscribe
unsubscribe()
```

### `emit`

Emits an event, triggering all registered callbacks for that event type.

**Parameters:**

- `type` (string): The event type to emit.
- `data` (T): The data to be passed to the callback functions.

**Example:**

```javascript
import { emit } from '@rn-common/event-emitter'

emit('eventType', { key: 'value' })
```
