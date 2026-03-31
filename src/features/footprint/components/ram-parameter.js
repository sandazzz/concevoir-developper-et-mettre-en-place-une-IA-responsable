import { createStrip } from "../../../utils/create-element.js";

export function ramParameter() {
  return createStrip({
    index: "B",
    title: "Parametrage RAM",
    description: "Le nombre de barrettes est derive automatiquement.",
    facts: [
      { label: "Type / Modele", value: "Samsung" },
      {
        label: "Go / module",
        value: "128",
        valueAttrs: { id: "ram-go-per-module" },
      },
      {
        label: "Barrettes estimees",
        value: "0",
        valueAttrs: { id: "ram-barette-output" },
      },
    ],
    inputConfig: {
      label: "Quantite de RAM (Go)",
      labelAttrs: { for: "ram-input" },
      inputAttrs: {
        id: "ram-input",
        name: "Reponse pour Quantite de RAM",
        step: 1,
        placeholder: "Ex: 128",
      },
      resultLabel: "Empreinte RAM",
      resultAttrs: { id: "ram-footprint-result" },
      defaultValue: 0,
    },
  });
}
