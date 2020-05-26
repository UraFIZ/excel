import {capitalize} from '@core/utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`)
    }
    this.$root = $root
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(item => {
      const method = getMethodName(item);
      if (!this[method]) {
        const name = this.name || ''
        throw new Error(
            `Method ${method} is not implemented in ${name} Component`
        )
      }
      // Тоже самое что и addEventListener
      // this[method] = this[method].bind(this);
      this.$root.on(item, this[method])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(item => {
      const method = getMethodName(item);
      this.$root.off(item, this[method])
    })
    
  }
  
}
function getMethodName(eventName) {
  return 'on' + capitalize(eventName)
}