import { createStrip } from "../../../utils/create-element.js";
import { calculEmpreinteCPU } from "../footprint.js";

export function cpuParameter(idNumber) {
  console.log("Creating CPU parameter with id:", idNumber);
  return createStrip({
    index: "A",
    title: "Parametrage CPU",
    facts: [
      { label: "Type / Modele", value: "AMD EPIC" },
      { label: "Famille", value: "Zen 2" },
      { label: "vCPU par CPU", value: "32" },
    ],
    inputConfig: {
      label: "Nombre de CPU physiques",
      labelAttrs: { for: `cpu-physical-input-${idNumber}` },
      inputAttrs: {
        id: `cpu-physical-input-${idNumber}`,
        name: "Reponse pour Nombre de CPU Physique",
        step: 1,
        placeholder: "Ex: 128",
      },
      resultLabel: "Empreinte CPU",
      resultAttrs: { id: `cpu-footprint-result-${idNumber}` },
      defaultValue: 0,
    },
    events: {
      input: (event) => {
        const cpuResult = document.getElementById(`cpu-footprint-result-${idNumber}`);
        const value = Number(event.target.value || 0);
        const result = calculEmpreinteCPU(value);

        if (cpuResult) {
          cpuResult.textContent = result;
        }
      },
    },
  });
}
