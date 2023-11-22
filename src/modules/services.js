/*
- [ ] _Services Links_
  data-serv="trig" [wrapper]
  data-serv="item" [wrapper]
*/

export class Services {
  trigger = [...document.querySelectorAll("[data-serv='trig']")];
  items = [...document.querySelectorAll("[data-serv='item']")];

  constructor() {
    // console.log("services", this.trigger, this.items);
    this.create();
  }

  create() {
    this.trigger.forEach((trig, i) => {
      trig.onclick = (e) => this.toggle(i);
    });
  }

  destroy() {
    this.trigger.forEach((trig) => (trig.onclick = null));
  }

  toggle(i) {
    const item = this.items.filter(
      (item) => item.dataset.id === this.trigger[i].dataset.id
    )[0];

    if (item.length < 1) return;
    // console.log(item.style.display);

    if (item.style.display == "none" || item.style.display == "") {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }

    // console.log(item);
  }
}
