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
    text(text) {
      if(typeof text === 'string') {
        this.$nodeElement.textContent = text
        return this
      }
      if(this.$nodeElement.tagName.toLowerCase() === 'input') {
        return this.$nodeElement.value.trim()
      }
      return this.$nodeElement.textContent.trim()
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
    find(selector) {
      return $(this.$nodeElement.querySelector(selector))
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
    addClass(className) {
      this.$nodeElement.classList.add(className)
      return this
    }
    id(parse) {
      if (parse) {
        const parsed = this.id().split(':')
        return {
          row: +parsed[0],
          col: +parsed[1]
        }
      }
      return this.data.id
    }

    removeClass(className) {
      this.$nodeElement.classList.remove(className)
      return this
    }
    focus() {
      this.$nodeElement.focus()
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
  