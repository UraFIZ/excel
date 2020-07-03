import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare();
    this.emitter = options.emitter
    this.unsubscribe = []
  }
  prepare() {}
  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    const unsub = this.emitter.emit(event,  ...args)
    this.unsubscribe.push(unsub)
  }
  $on(event, fn) {
    this.emitter.subscribe(event, fn)
  }
  init() {
    this.initDOMListeners()
  }
  destroy() {
    this.removeDOMListeners();
    this.unsubscribe.forEach(item => item())
  }
}