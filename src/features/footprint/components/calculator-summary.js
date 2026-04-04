import { createElement } from "../../../utils/create-element.js";

export function calculatorSummary(idNumber) {
  return createElement("aside", {
    className: "calculator-summary",
    attrs: { "aria-live": "polite" },
    children: [
      createElement("span", {
        className: "calculator-summary-label",
        text: "Total pour la fabrication",
      }),
      createElement("strong", {
        className: "calculator-summary-value",
        text: "0",
        attrs: { id: `global-total-${idNumber}` },
      }),

      createElement("p", {
        className: "calculator-summary-note",
        children: [
          createElement("span", {
            text: "(kg CO2eq) / serveur",
          }),
        ],
      }),
    ],
  });
}
