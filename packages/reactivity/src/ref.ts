import { hasChanged } from "@vue/shared"
import { Dep, createDep } from "./deps"
import { activeEffect, trackEffects, triggerEffects } from "./effect"
import { toReactive } from "./reactive"

interface Ref<T = any> {
  value: T
}

export function ref (value?: unknown) {
  return createRef(value, false)
}

function createRef(rawValue: unknown, shallow: boolean) {
  if (isRef(rawValue)) {
    return rawValue
  } else {
    return new RefImpl(rawValue, shallow)
  }
}

/**
 * 是否为 ref
 * @param r 
 * @returns 
 */
function isRef(r: any): r is Ref {
  return !!(r && r.__isRef === true)
}

class RefImpl<T> {
  private _value: T
  private _rawValue: T
  public dep?: Dep = undefined
  public readonly __isRef = true

  constructor (value: T, public readonly __v_isShallow: boolean) {
    this._rawValue = value
    this._value = __v_isShallow ? value : toReactive(value)
  }

  get value () {
    trackRefValue(this)
    return this._value
  }

  set value (newValue) {
    if (hasChanged(newValue, this._rawValue)) {
      this._rawValue = newValue
      this._value = toReactive(newValue)
      triggerRefValue(this)
    }
  }
}

/**
 * 收集依赖
 * @param ref 
 */
function trackRefValue (ref: RefImpl<unknown>) {
  if (activeEffect) {
    console.log('ref 的收集---')
    trackEffects(ref.dep || (ref.dep = createDep()))
  }
}

/**
 * 释放依赖
 * @param ref 
 */
function triggerRefValue (ref: RefImpl<unknown>) {
  if (ref.dep) {
    triggerEffects(ref.dep)
  }
}

