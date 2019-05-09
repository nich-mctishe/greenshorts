import isOnline from './network'
import { get, isObject, isArray } from 'lodash'
// storage input and output

// store last updates date
const MAX_AGE = 1000 * 60 * 60 * 1

const input = (index, data) => window.localStorage.setItem(index, isObject(data) ? JSON.stringify(data): data)

const payload = (item) => ({
  retrievedFromLocalStorage: true,
  data: item
})

const output = (index, data) => {
    const ls = window.localStorage.getItem(index, data)

    if (ls) {
      const object = JSON.parse(ls)

      if (isObject(object)) {
        if (isArray(object)) {
          return object.length ? payload(object) : false
        }

        return payload(object)
      }
      if (isArray(object)) {
        return object.length ? payload(object) : false
      }

      return ls
    }

    return false
}

const remove = index => window.localStorage.removeItem(index, data)

const clear = _ => window.localStorage.clear()

const isSsr = _ => typeof window === 'undefined'

const logError = (error, message) => {
  console.error(`Local Storage: ${message}`)
  console.error(error);
}

const updateTimes = (newTime) => {
  const times = output('update_times')

  input('update_times', Object.assign(times.data || {}, newTime))
}

// remember to test for age before retrieval and return false if age is to old
export function getFromStore (index, data) {
  if (!isSsr()) {
    try {
      const times = output('update_times')

      if (times) {
        if (!isOnline || (times[index] + MAX_AGE > Date.now())) {
          return output (index, data)
        }
      }

      return false
    } catch (e) {
      logError(e, `unable to retrieve ${index} from store`)
    }
  }
}

// find way to schedule write to store once ssr has completed
export function writeToStore (index, data) {
  if (!isSsr()) {
    try {
      const times = output('update_times')
      input(index, data)
      updateTimes({ [index]: Date.now() })
    } catch (e) {
      logError(e, `unable to write ${index} to store`)
    }
  }
}

export function clearStore () {
  if (!isSsr()) {
    try {
      console.warn('Local storage: clearing store will remove all localStorage data for store.');
      clear()
    } catch (e) {
      logError(e, 'unable to clear store')
    }
  }
}
