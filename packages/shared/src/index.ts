/**
 * 判断是否为一个数组
 */
export const isArray = Array.isArray
/**
 * 判断是否为一个对象
 * @param value 
 * @returns 
 */
export const isObject = (value: unknown) => value !== null && typeof value === 'object'
/**
 * 对比两个数据是否发生改变
 * @param value 
 * @param oldValue 
 * @returns 
 */
export const hasChanged = (value: any, oldValue: any) => !Object.is(value, oldValue)
/**
 * 判断是否是一个方法
 * @param value 
 * @returns 
 */
export const isFunction = (value: unknown) => typeof value === 'function'