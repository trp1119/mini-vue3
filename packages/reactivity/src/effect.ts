import { isArray } from '@vue/shared'
import { Dep, createDep } from './deps'

type KeyToDepMap = Map<any, Dep>
const targetMap = new WeakMap<object, KeyToDepMap>()

export function effect<T = any>(fn: () => T) {
  const _effect = new ReactiveEffect(fn)

  _effect.run()
}

let activeEffect: ReactiveEffect | undefined

export class ReactiveEffect<T = any> {
  constructor(public fn: () => T) {}

  run () {
    activeEffect = this

    return this.fn()
  }
}

/**
 * 收集依赖
 * @param target 
 * @param key 
 */
export function track(target: object, key: unknown) {
  console.log('track: 收集依赖')

  console.log('activeEffect', activeEffect)

  if (!activeEffect) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    targetMap.set(target, depsMap = new Map())
  }
  
  let dep = depsMap.get(key)
  if (!dep) {
    depsMap.set(key, dep = createDep())
  }

  trackEffects(dep)

  console.log('收集依赖 targetMap: ', targetMap)
}

/**
 * 利用 dep 一次跟踪指定 key 的所有 effect
 * @param dep
 */
function trackEffects(dep: Dep) {
  dep.add(activeEffect!)
}

/**
 * 触发依赖
 * @param target 
 * @param key 
 * @param newValue 
 */
export function trigger(target: object, key: unknown, newValue: unknown) {
  console.log('trigger: 触发依赖')

  const depsMap = targetMap.get(target)
  if (!depsMap) return
  
 const dep: Dep | undefined = depsMap.get(key)
 if (!dep) return

  triggerEffects(dep)
}

/**
 * 依次触发 dep 中保存的依赖
 * @param dep
 */
function triggerEffects(dep: Dep) {
  const effects = isArray(dep) ? dep : [...dep]

  // 依次触发依赖
  for (const effect of effects) {
    triggerEffect(effect)
  }
}

/**
 * 触发指定依赖
 * @param effect 
 */
function triggerEffect(effect: ReactiveEffect) {
  effect.fn()
}