import Tween from "gsap";

/*
id="hours"
id="min"
*/

export class Clocks {
  current = 0;

  constructor() {
    this.clocks = [
      ...document.querySelectorAll("[data-svg='clock'], [data-lottie]"),
    ].map((el) => {
      if (el.dataset.svg === "clock") {
        return new Clock(el);
      } else {
        return {
          svg: el,
        };
      }
    });

    this.lottie = document.querySelector("[data-lottie]");
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

    this.counter = el.dataset.direction === "counter" ? -1 : 1;

    this.hours = this.svg.querySelector("#hours");
    this.min = this.svg.querySelector("#min");

    this.texts = {
      date: document.querySelector("[data-clock='date']"),
      time: document.querySelector("[data-clock='time']"),
    };

    this.hours.style.transformOrigin = "center";
    this.min.style.transformOrigin = "center";

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
    };

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
      rotation: (hours * 30 + min * 0.5) * this.counter,
      ease: "power2.out",
    });
    Tween.to(this.min, {
      duration: 0.5,
      transformOrigin: "bottom",
      rotation: min * 6 * this.counter,
      ease: "power2.out",
    });
  }

  render() {}
}
