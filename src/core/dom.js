class Dom {
    constructor(selector) {
      this.$nodeElement = typeof selector === 'string'
        ? document.querySelector(selector)
        : selector
    }
  
    html(html) {
      if (typeof html === 'string') {
        this.$nodeElement.innerHTML = html
        return this
      }
      return this.$nodeElement.outerHTML.trim()
    }
  
    clear() {
      this.html('')
      return this
    }
  
    on(eventType, callback) {
        this.$nodeElement.addEventListener(eventType, callback)
    }
    off(eventType, callback) {
      this.$nodeElement.removeEventListener(eventType, callback)
    }
    closest(selector) {
      return $(this.$nodeElement.closest(selector))
    }
    get data() {
      return this.$nodeElement.dataset
    }
    getCoords() {
      return this.$nodeElement.getBoundingClientRect()
    }
    findAll(selector) {
      return this.$nodeElement.querySelectorAll(selector)
    }
    css(styles={}) {
      for (let [key, value] of Object.entries(styles)) {
        this.$nodeElement.style[key] = value
      }
    }
    append(node) {
      if (node instanceof Dom) {
        node = node.$nodeElement
      }
  
      if (Element.prototype.append) {
        this.$nodeElement.append(node)
      } else {
        this.$nodeElement.appendChild(node)
      }
  
      return this
    }
  }
  
  // event.target
  export function $(selector) {
    return new Dom(selector)
  }
  
  $.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)
    if (classes) {
      el.classList.add(classes)
    }
    return $(el)
  }
  