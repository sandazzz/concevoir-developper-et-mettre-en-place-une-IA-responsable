import { createStrip } from "../../../utils/create-element.js";

export function cpuParameter() {
  return createStrip({
    index: "A",
    title: "Parametrage CPU",
    description: "Socle materiel processeur utilise pour le calcul.",
    facts: [
      { label: "Type / Modele", value: "AMD EPIC" },
      { label: "Famille", value: "Zen 2" },
      { label: "vCPU par CPU", value: "32" },
    ],
    inputConfig: {
      label: "Nombre de CPU physiques",
      labelAttrs: { for: "cpu-physical-input" },
      inputAttrs: {
        id: "cpu-physical-input",
        name: "Reponse pour Nombre de CPU Physique",
        step: 1,
        placeholder: "Ex: 128",
      },
      resultLabel: "Empreinte CPU",
      resultAttrs: { id: "cpu-footprint-result" },
      defaultValue: 0,
    },
  });
}