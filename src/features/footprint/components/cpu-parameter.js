import { updateTotal } from "../update-total.js";
import { BasicParameter } from "./ui/basic-parameter.js";

const calculEmpreinteCPU = (nBCpusPhysiques, vCpuParCpu = 24) => {
  const empreinte =
    nBCpusPhysiques * ((vCpuParCpu * 0.173333333333 + 0.491) * 1.97 + 9.14);
  const resultatFinal = Number(empreinte.toFixed());
  return resultatFinal;
};

export function CpuParameter(idNumber) {
  const el = BasicParameter({
    index: "A",
    title: "Parametrage CPU",
    facts: [
      { label: "Type / Modele", value: "AMD EPIC" },
      { label: "Famille", value: "Zen 2" },
      { label: "vCPU par CPU", value: "24" },
    ],
    inputConfig: {
      label: "Nombre de CPU physiques",
      labelAttrs: { for: `cpu-physical-input-${idNumber}` },
      inputAttrs: {
        id: `cpu-physical-input-${idNumber}`,
        name: "Reponse pour Nombre de CPU Physique",
        step: 1,
        placeholder: "Ex: 4",
      },
      resultLabel: "Empreinte CPU",
      resultAttrs: { id: `cpu-footprint-result-${idNumber}` },
      defaultValue: 0,
    },
    events: {
      input: (event) => {
        const cpuResult = document.getElementById(
          `cpu-footprint-result-${idNumber}`,
        );
        const value = Number(event.target.value || 0);
        const result = calculEmpreinteCPU(value);

        if (cpuResult) {
          cpuResult.textContent = result;
        }

        updateTotal(idNumber);
      },
    },
  });

  return el;
}