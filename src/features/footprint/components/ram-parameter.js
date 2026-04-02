import { createStrip } from "../../../utils/create-element.js";
import { calculEmpreinteRAM } from "../footprint.js";
import { updateTotal } from "./update-total.js";

export function ramParameter(idNumber) {
  return createStrip({
    index: "B",
    title: "Parametrage RAM",
    facts: [
      { label: "Type / Modele", value: "Samsung" },
      {
        label: "Go / module",
        value: "128",
        valueAttrs: { id: `ram-go-per-module-${idNumber}` },
      },
      {
        label: "Barrettes estimees",
        value: "0",
        valueAttrs: { id: `ram-barette-output-${idNumber}` },
      },
    ],
    inputConfig: {
      label: "Quantite de RAM (Go)",
      labelAttrs: { for: `ram-input-${idNumber}` },
      inputAttrs: {
        id: `ram-input-${idNumber}`,
        name: "Reponse pour Quantite de RAM",
        step: 1,
        placeholder: "Ex: 128",
      },
      resultLabel: "Empreinte RAM",
      resultAttrs: { id: `ram-footprint-result-${idNumber}` },
      defaultValue: 0,
    },
    events: {
      input: (event) => {
        const ramGoPerModule = document.getElementById(`ram-go-per-module-${idNumber}`);
        const barretteOutput = document.getElementById(`ram-barette-output-${idNumber}`);
        const numberBarrettes = Number(event.target.value) / Number(ramGoPerModule.textContent);

        if (barretteOutput) {
          barretteOutput.textContent = numberBarrettes;
        }

        const ramResult = document.getElementById(`ram-footprint-result-${idNumber}`);
        const value = Number(event.target.value || 0);
        const result = calculEmpreinteRAM(value);

        if (ramResult) {
          ramResult.textContent = result;
        }
        updateTotal(idNumber);
      },
    },

  });
}
