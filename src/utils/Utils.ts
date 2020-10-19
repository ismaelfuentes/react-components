import { negate } from 'lodash'
import {
  complement,
  head,
  flow,
  isString,
  isEmpty,
  isNull,
  isUndefined,
  anyPass,
} from 'lodash/fp'
// //
// Locations dictionary of places with different names
// //

export function getRealStateName(name: string) {
  return dictionary[name.toLowerCase()] || name
}

const dictionary: any = {
  catalunya: 'Cataluña',
  catalonha: 'Cataluña',
  catalonia: 'Cataluña',
  'illes balears': 'Islas Baleares',
  euskadi: 'País Vasco',
  galiza: 'Galicia',
  'comunitat valenciana': 'Comunidad Valenciana'
}

// isStringArray :: A -> Boolean
export const isStringArray = flow([head,isString])

export const notIsStringArray = complement(isStringArray)

// notEmpty :: A -> Boolean
export const notEmpty = negate(isEmpty)

export const isEmptyOrNull = anyPass([isEmpty, isNull, isUndefined])

export const notEmptyOrNull = complement(isEmptyOrNull)

