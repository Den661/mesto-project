export default class Section {
  constructor({items, renderer}, sectionSelector) {
    this._section  = document.querySelector(sectionSelector)
    this._items = items;
    this._renderer = renderer;
  }

  renderItems(){
    this._items.forEach((item) => this._renderer(item))
  }

  appendElement(element) {
    this._section.append(element);
  }

  prependElement(element) {
    this._section.prepend(element)
  }

  setItems (items){
    this._items = items
  }
}
