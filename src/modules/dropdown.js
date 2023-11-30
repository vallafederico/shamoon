/*
data-dd="w"
data-dd="list"
*/

export class Dropdown {
  constructor({ element }) {
    this.element = element;
    this.list = this.element.querySelector('[data-dd="list"]');
    // console.log(this.list);

    this.create();
  }

  create() {
    this.element.onclick = (e) => {
      if (this.list.style.display === "flex") {
        this.list.style.display = "none";
      } else {
        this.list.style.display = "flex";
      }
    };
  }

  destroy() {
    this.element.onclick = null;
  }
}
