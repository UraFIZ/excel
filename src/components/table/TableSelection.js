export class TableSelection {
  static className = 'selected'
  constructor() {
    this.group = []
    this.current = null
  }

  // $el instanceof DOM === true
  select($el) {
    this.clear();
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
    this.current = $el
  }
  clear() {
    this.group.forEach(item => item.removeClass(TableSelection.className));
    this.group = [];
  }
  selectGroup($group = []) {
    this.clear()

    this.group = $group
    this.group.forEach($el => $el.addClass(TableSelection.className))
  }
}
