import { createElement } from "../utils/create-element.js";

export function counter(init) {
  const counter = createElement(
    "button",
    {
      text: init || "0",
      attrs: { id: "counter" },
    },
    {
      click: () => {
        const currentValue = counter.textContent;
        counter.textContent = parseInt(currentValue) + 1;
      },
    },
  );
  return counter;
}
