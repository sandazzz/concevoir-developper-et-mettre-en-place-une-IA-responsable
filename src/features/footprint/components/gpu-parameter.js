import { createElement } from "../../../utils/create-element.js";

const GPU_MODELS = ["A100", "H100", "Tesla V100"];

const createGpuRow = ({ familyId, countId, criterionId, resultId }) =>
  createElement("div", {
    className: "calculator-matrix-row",
    children: [
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: familyId },
        children: [
          createElement("select", {
            className: "calculator-input calculator-select",
            attrs: { id: familyId },
            children: GPU_MODELS.map((model) =>
              createElement("option", {
                text: model,
                attrs: { value: model },
              }),
            ),
          }),
        ],
      }),
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: countId },
        children: [
          createElement("input", {
            className: "calculator-input",
            attrs: {
              id: countId,
              type: "number",
              name: `Reponse pour ${countId}`,
              value: 0,
              min: 0,
              step: 1,
              placeholder: "Ex: 4",
            },
          }),
        ],
      }),
      createElement("span", {
        text: "0",
        attrs: { id: criterionId },
      }),
      createElement("span", {
        text: "0",
        attrs: { id: resultId },
      }),
    ],
  });

export function gpuParameter() {
  return createElement("section", {
    className: "calculator-strip calculator-strip-gpu",
    children: [
      createElement("div", {
        className: "calculator-strip-head",
        children: [
          createElement("span", {
            className: "calculator-strip-index",
            text: "C",
          }),
          createElement("div", {
            children: [
              createElement("h4", { text: "Parametrage GPU" }),
              createElement("p", {
                text: "Selectionnez jusqu'a deux familles de GPU et ajustez le nombre de cartes pour chaque ligne.",
              }),
            ],
          }),
        ],
      }),
      createElement("div", {
        className: "calculator-matrix",
        children: [
          createElement("div", {
            className: "calculator-matrix-header",
            children: [
              createElement("span", { text: "Famille GPU" }),
              createElement("span", { text: "Nombre" }),
              createElement("span", { text: "Critere" }),
              createElement("span", { text: "Empreinte" }),
            ],
          }),
          createGpuRow({
            familyId: "gpu-family-1",
            countId: "gpu-nb-1",
            criterionId: "gpu-criterion-1",
            resultId: "gpu-footprint-result-1",
          }),
          createGpuRow({
            familyId: "gpu-family-2",
            countId: "gpu-nb-2",
            criterionId: "gpu-criterion-2",
            resultId: "gpu-footprint-result-2",
          }),
          createElement("div", {
            className: "calculator-matrix-total",
            children: [
              createElement("span", { text: "Total GPU" }),
              createElement("strong", {
                text: "0",
                attrs: { id: "gpu-footprint-result" },
              }),
              createElement("span", { text: "kg CO2eq" }),
            ],
          }),
        ],
      }),
    ],
  });
}
