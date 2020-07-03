export class Emitter {
    constructor() {
      this.listeners = {}
    }
  
    // dispatch, fire, trigger
    // Уведомляем слушателе если они есть
    // table.emit('table:select', {a: 1})
    emit(event, ...args) {
        // console.log('event', event)
        // console.log('Array.isArray(this.listeners[event]):', Array.isArray(this.listeners[event]))
      if (!Array.isArray(this.listeners[event])) {
          // console.log('false')
        return false
      }
      // console.log('emit this listeners', this.listeners);
      this.listeners[event].forEach(listener => {
          // console.log('listener', listener)
        listener(...args)
      })
      return true
    }
  
    // on, listen
    // Подписываемся на уведомление
    // Добавляем нового слушателя
    // formula.subscribe('table:select', () => {})
    subscribe(event, fn) {
        // console.log('sub event', event);
        // console.log('sub fn', fn)
        this.listeners[event] = this.listeners[event] || []
        // console.log('sub this listeners before add', this.listeners);
      this.listeners[event].push(fn)
      // console.log('sub this listeners after add', this.listeners);
      return () => {
        this.listeners[event] =
          this.listeners[event].filter(listener => listener !== fn)
      }
    }
  }
  
  // Example
  // const emitter = new Emitter()
  //
  // const unsub = emitter.subscribe('vladilen', data => console.log(data))
  // emitter.emit('1231231', 42)
  //
  // setTimeout(() => {
  //   emitter.emit('vladilen', 'After 2 seconds')
  // }, 2000)
  //
  // setTimeout(() => {
  //   unsub()
  // }, 3000)
  //
  // setTimeout(() => {
  //   emitter.emit('vladilen', 'After 4 seconds')
  // }, 4000)
  