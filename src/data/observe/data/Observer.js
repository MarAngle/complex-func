import { OBNAME } from './config'
import defineProperty from '../../object/defineProperty'
import buildReactive from './buildReactive'
import Dep from './Dep'
import observe from '../observe'

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}
let arrayProto = Array.prototype;
let arrayMethods = Object.create(arrayProto);

let methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  let original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    let args = []
    let len = arguments.length;
    while (len--) {
      args[ len ] = arguments[ len ]
    };

    let result = original.apply(this, args);
    let ob = this[OBNAME];
    let inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

function copyAugment (target, src, keys) {
  for (let i = 0, l = keys.length; i < l; i++) {
    let key = keys[i];
    def(target, key, src[key]);
  }
}

let arrayKeys = Object.getOwnPropertyNames(arrayMethods);
/*  */

class Observer {
  constructor(value) {
    // 每个Observer实例上都存在dep
    this.dep = new Dep()
    defineProperty(value, OBNAME, {
      value: this,
      enumerable: false,
      writable: true
    })
    if (Array.isArray(value)) {
      copyAugment(value, arrayMethods, arrayKeys)
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }
  observeArray(items) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i]);
    }
  }
  /**
   * 遍历
   * @param {*} value 需要遍历的值
   */
  walk(value) {
    for (let k in value) {
      buildReactive(value, k, {})
    }
  }
}

export default Observer
