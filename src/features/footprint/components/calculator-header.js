import { createElement } from "@/src/utils/create-element.js";

export function calculatorHeader(excerciseName) {
  return createElement("div", {
    className: "calculator-studio-heading",
    children: [
      createElement("span", {
        className: "calculator-kicker",
        text: `Calculatrice exercice : ${excerciseName}`,
      }),
    ],
  });
}
