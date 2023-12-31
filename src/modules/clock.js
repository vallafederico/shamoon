import Tween from "gsap";

/*
id="hours"
id="min"
*/

export class Clocks {
  current = 0;

  constructor() {
    this.clocks = [...document.querySelectorAll("[data-svg='clock']")].map(
      (el) => {
        return new Clock(el);
      }
    );
  }

  changeClock(i) {
    // console.log(i, "checngeXClock", this.current);
    this.clocks[this.current].svg.style.display = "none";
    this.clocks[i].svg.style.display = "block";

    this.current = i;
  }
}

export class Clock {
  constructor(el) {
    this.svg = el;
    // console.log(this.svg);
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
    this.animateText(formattedDate, hours, min);

    setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const min = date.getMinutes();

      this.animateTo(hours, min);
    }, 1000 * 60);
  }

  animateText(date, hours, min) {
    this.texts.date.textContent = date;
    this.texts.time.textContent = hours + ":" + ("0" + min).slice(-2);
  }

  animateTo(hours, min) {
    // console.log(hours, min);
    Tween.to(this.hours, {
      duration: 0.5,
      transformOrigin: "bottom",
      rotation: hours * 30 + min * 0.5,
      ease: "power2.out",
    });
    Tween.to(this.min, {
      duration: 0.5,
      transformOrigin: "bottom",
      rotation: min * 6,
      ease: "power2.out",
    });
  }

  render() {}
}
