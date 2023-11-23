import Tween from "gsap";

/*
id="hours"
id="min"
*/

export class Clock {
  constructor() {
    this.svg = document.querySelector("[data-svg='clock']");
    this.hours = this.svg.querySelector("#hours");
    this.min = this.svg.querySelector("#min");
    // console.log(this.svg, this.hours, this.min);

    this.texts = {
      date: document.querySelector("[data-clock='date']"),
      time: document.querySelector("[data-clock='time']"),
      loc: document.querySelector("[data-clock='loc']"),
    };

    this.hours.style.transformOrigin = "center";
    this.min.style.transformOrigin = "center";
    // this.hours.style.transform = "rotate(270deg)";
    // this.min.style.transform = "rotate(90deg)";

    this.setInitial();
  }

  create() {}

  setInitial() {
    const date = new Date();
    const hours = date.getHours();
    const min = date.getMinutes();
    this.animateTo(hours, min);

    // *  DATE EXPs
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      // timeZone: "America/New_York",
    };

    // console.log(navigator.language); // en-US
    this.texts.loc.textContent = "Location"; // initial set

    const formattedDate = date.toLocaleDateString(undefined, options);
    this.animateText(formattedDate);

    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const min = date.getMinutes();

      this.animateTo(hours, min);
    }, 1000 * 60);
  }

  animateText(date) {
    this.texts.date.textContent = date;
    this.texts.time.textContent = "14:00";
  }

  animateTo(hours, min) {
    // console.log(hours, min);
    Tween.to(this.hours, {
      duration: 0.5,
      transformOrigin: "bottom",
      rotation: 180 + hours * 30 + min * 0.5,
      ease: "power2.out",
    });
    Tween.to(this.min, {
      duration: 0.5,
      transformOrigin: "bottom",
      rotation: 180 + min * 6,
      ease: "power2.out",
    });
  }

  render() {}
}
