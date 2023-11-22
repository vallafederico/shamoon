import Tween from "gsap";

/* -- DATA
- [x] Colors x4
- [ ] Image upload
- [ ] Font Switch
- [ ] Reset Button

(wf vars)
  --col--white: white;
  --col--green: #8fff00;
  --col--blue: #0c31e9;
  --col--darkblue: #092eaf;
  --col--tr: rgba(255, 255, 255, 0);
  --scrollbar--sc-width: 5px;

*/
const colors100 = [
  "",
  "#FF0000",
  "#FF1900",
  "#FF3300",
  "#FF4D00",
  "#FF6600",
  "#FF8000",
  "#FF9900",
  "#FFB300",
  "#FFCC00",
  "#FFE600",
  "#FFFF00",
  "#E6FF00",
  "#CCFF00",
  "#B3FF00",
  "#99FF00",
  "#80FF00",
  "#66FF00",
  "#4DFF00",
  "#33FF00",
  "#19FF00",
  "#00FF00",
  "#00FF19",
  "#00FF33",
  "#00FF4D",
  "#00FF66",
  "#00FF80",
  "#00FF99",
  "#00FFB3",
  "#00FFCC",
  "#00FFE6",
  "#00FFFF",
  "#00E6FF",
  "#00CCFF",
  "#00B3FF",
  "#0099FF",
  "#0080FF",
  "#0066FF",
  "#004DFF",
  "#0033FF",
  "#0019FF",
  "#0000FF",
  "#1900FF",
  "#3300FF",
  "#4D00FF",
  "#6600FF",
  "#8000FF",
  "#9900FF",
  "#B300FF",
  "#CC00FF",
  "#E600FF",
  "#FF00FF",
  "#FF00E6",
  "#FF00CC",
  "#FF00B3",
  "#FF0099",
  "#FF0080",
  "#FF0066",
  "#FF004D",
  "#FF0033",
  "#FF0019",
  "#FF0000",
  "#FF1919",
  "#FF3333",
  "#FF4D4D",
  "#FF6666",
  "#FF8080",
  "#FF9999",
  "#FFB3B3",
  "#FFCCCC",
  "#FFE6E6",
  "#FFFFFF",
  "#E6E6E6",
  "#CCCCCC",
  "#B3B3B3",
  "#999999",
  "#808080",
  "#666666",
  "#4D4D4D",
  "#333333",
  "#1A1A1A",
  "#000000",
  "#1A1A1A",
  "#333333",
  "#4D4D4D",
  "#666666",
  "#808080",
  "#999999",
  "#B3B3B3",
  "#CCCCCC",
  "#E6E6E6",
  "#FFFFFF",
  "#E6E6E6",
  "#CCCCCC",
  "#B3B3B3",
  "#999999",
  "#808080",
  "#666666",
  "#4D4D4D",
  "#333333",
  "#666666",
];

export class System {
  constructor(wrapper) {
    this.wrapper = wrapper;

    // watch out the thing is resetting the defaults everytime you come back to the page
    // const ex = getComputedStyle(document.documentElement);
    // this.defaults = [
    //   ex.getPropertyValue("--col--blue"),
    //   ex.getPropertyValue("--col--darkblue"),
    //   ex.getPropertyValue("--col--green"),
    //   ex.getPropertyValue("--col--white"),
    // ];

    // console.log(this.defaults);

    this.create();
  }

  create() {
    this.colors = [...document.querySelectorAll("[data-system='color']")].map(
      (item, i) => {
        const range = item.querySelector("input[type='range']");
        const bg = item.querySelector("[data-bg]");
        const text = item.querySelector("[data-tx]");

        text.innerHTML = window.defaults.colors[i];
        bg.style.backgroundColor = window.defaults.colors[i];

        range.value = window.defaults.systemSlider[i];

        range.addEventListener("input", (e) =>
          this.changeColor(i, e.target.value, item)
        );

        return {
          item,
          range,
          bg,
          text,
        };
      }
    );
  }

  changeColor(index, value) {
    // if (value === "0") {
    //   console.log(value, window.defaults.colors[index]);
    // }

    const val =
      value === "0" ? window.defaults.colors[index] : colors100[+value];

    switch (index) {
      case 0:
        document.documentElement.style.setProperty("--col--blue", val);
        break;
      case 1:
        document.documentElement.style.setProperty("--col--darkblue", val);
        break;
      case 2:
        document.documentElement.style.setProperty("--col--green", val);
      case 3:
        document.documentElement.style.setProperty("--col--white", val);
        break;
    }

    this.colors[index].text.innerHTML = val;
    this.colors[index].bg.style.backgroundColor = val;
    window.defaults.systemSlider[index] = value;
  }

  destroy() {
    // console.log("System::destroy");
  }
}
