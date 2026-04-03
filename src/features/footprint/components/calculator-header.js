import { createElement } from "../../../utils/create-element.js";

export function calculatorHeader(excerciseNumber) {
  return createElement("div", {
    className: "calculator-studio-heading",
    children: [
      createElement("span", {
        className: "calculator-kicker",
        text: `Calculatrice exercice : ${excerciseNumber}`,
      }),
    ],
  });
}
