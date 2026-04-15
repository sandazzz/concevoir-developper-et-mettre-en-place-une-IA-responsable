import { createElement } from "@/src/utils/create-element.js";
import { Header } from "./ui/basic-parameter.js";
import { updateTotal } from "../update-total.js";

const GPU_MODELS = ["A100", "H100", "Tesla V100"];

export const calculCritereGPU = (modeleGPU) => {
  const gpuData = {
    A100: 200,
    H100: 320,
    "Tesla V100": 175,
  };

  return gpuData[modeleGPU];
};

const GpuRow = ({ familyId, countId, criterionId, resultId, idNumber }) => {
  return createElement("div", {
    className: "calculator-matrix-row",
    children: [
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: `${familyId}-${idNumber}` },
        children: [
          createElement(
            "select",
            {
              className: "calculator-input calculator-select",
              attrs: { id: `${familyId}-${idNumber}` },
              children: GPU_MODELS.map((model) =>
                createElement("option", {
                  text: model,
                  attrs: { value: model },
                }),
              ),
            },
            {
              change: (event) => {
                const selectedModel = event.target.value;
                const criterionValue = calculCritereGPU(selectedModel);
                const criterionElement = document.getElementById(
                  `${criterionId}-${idNumber}`,
                );
                if (criterionElement) {
                  criterionElement.textContent = criterionValue;
                }

                const inputElement = document.getElementById(
                  `${countId}-${idNumber}`,
                );

                const resultElement = document.getElementById(
                  `${resultId}-${idNumber}`,
                );
 
                if (inputElement && resultElement) {
                  resultElement.textContent =
                    Number(inputElement.value) * criterionValue;
                }
                updateGpuTotal(idNumber);
                updateTotal(idNumber);
              },
            },
          ),
        ],
      }),
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: `${countId}-${idNumber}` },
        children: [
          createElement(
            "input",
            {
              className: "calculator-input",
              attrs: {
                id: `${countId}-${idNumber}`,
                type: "number",
                name: `Reponse pour ${countId}`,
                value: 0,
                min: 0,
                step: 1,
                placeholder: "Ex: 4",
              },
            },
            {
              input: (event) => {
                const NumberGpu = Number(event.target.value);

                const criterionElement = document.getElementById(
                  `${criterionId}-${idNumber}`,
                );
                const resultElement = document.getElementById(
                  `${resultId}-${idNumber}`,
                );
                if (criterionElement && resultElement) {
                  const result =
                    Number(criterionElement.textContent) * NumberGpu;
                  resultElement.textContent = result;
                }
                updateGpuTotal(idNumber);
                updateTotal(idNumber);
              },
            },
          ),
        ],
      }),
      createElement("span", {
        text: calculCritereGPU(GPU_MODELS[0]),
        attrs: { id: `${criterionId}-${idNumber}` },
      }),
      createElement("span", {
        text: "0",
        attrs: { id: `${resultId}-${idNumber}` },
      }),
    ],
  });
};

const GpuMatrixHeader = () => {
  return createElement("div", {
    className: "calculator-matrix-header",
    children: [
      createElement("span", { text: "Famille GPU" }),
      createElement("span", { text: "Nombre" }),
      createElement("span", { text: "Critere" }),
      createElement("span", { text: "Empreinte" }),
    ],
  });
};

const GpuMatrixTotal = (idNumber) => {
  return createElement("div", {
    className: "calculator-matrix-total",
    children: [
      createElement("span", { text: "Total GPU" }),
      createElement("strong", {
        text: "0",
        attrs: { id: `gpu-footprint-result-${idNumber}` },
      }),
      createElement("span", { text: "kg CO2eq" }),
    ],
  });
};

const updateGpuTotal = (idNumber) => {
  const gpu1 = Number(
    document.getElementById(`gpu-footprint-result-1-${idNumber}`)
      ?.textContent || 0,
  );
  const gpu2 = Number(
    document.getElementById(`gpu-footprint-result-2-${idNumber}`)
      ?.textContent || 0,
  );

  const totalElement = document.getElementById(
    `gpu-footprint-result-${idNumber}`,
  );

  if (totalElement) {
    totalElement.textContent = (gpu1 + gpu2).toFixed();
  }
};

export function GpuParameter(idNumber) {
  return createElement("section", {
    className: "calculator-strip calculator-strip-gpu",
    children: [
      Header({ index: "C", title: "Parametrage GPU" }),
      createElement("div", {
        className: "calculator-matrix",
        children: [
          GpuMatrixHeader(),
          GpuRow({
            familyId: "gpu-family-1",
            countId: "gpu-nb-1",
            criterionId: "gpu-criterion-1",
            resultId: "gpu-footprint-result-1",
            idNumber: idNumber,
          }),
          GpuRow({
            familyId: "gpu-family-2",
            countId: "gpu-nb-2",
            criterionId: "gpu-criterion-2",
            resultId: "gpu-footprint-result-2",
            idNumber: idNumber,
          }),
          GpuMatrixTotal(idNumber),
        ],
      }),
    ],
  });
}
