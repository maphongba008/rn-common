/**
 * Represents a callback function that takes in data of type T.
 */
type CallBack<T = any> = (data: T) => void

/**
 * Represents an event with a type and a callback function.
 */
interface Event<T = any> {
  type: string
  callback: CallBack<T>
}

/**
 * An array to store registered events.
 */
let registerEvents: Event[] = []

/**
 * Subscribes to an event by registering a callback function.
 * @param type - The type of the event.
 * @param callback - The callback function to be executed when the event is emitted.
 * @returns A function to unsubscribe from the event.
 */
export const subscribe = <T = any>(type: string, callback: CallBack<T>) => {
  registerEvents.push({
    type,
    callback,
  })
  return () => {
    registerEvents = registerEvents.filter((c) => c.callback !== callback)
  }
}

/**
 * Emits an event by executing all the registered callback functions for that event type.
 * @param type - The type of the event to be emitted.
 * @param data - The data to be passed to the callback functions.
 */
export const emit = <T = any>(type: string, data: T) => {
  registerEvents.forEach((event) => {
    if (event.type === type) {
      try {
        event.callback(data)
      } catch (error) {
        console.error(`Error in callback for event type ${type}:`, error)
      }
    }
  })
}
