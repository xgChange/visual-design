import { customAlphabet } from 'nanoid'

export const createArray = <T>(arr?: T[]) => (arr?.length ? arr : ([] as T[]))

export const generateNanoId = customAlphabet('1234567890abcdef', 10)
