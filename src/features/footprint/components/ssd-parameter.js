import { createStrip } from "../../../utils/create-element.js";

export function ssdParameter() {
  return createStrip({
    index: "D",
    title: "Parametrage SSD",
    description:
      "Le nombre de SSD est derive automatiquement a partir du volume total de stockage saisi.",
    facts: [
      { label: "Type / Modele", value: "Stockage" },
      { label: "Go / SSD", value: "2000" },
      {
        label: "Nombre de SSD estime",
        value: "0",
        valueAttrs: { id: "ssd-nb" },
      },
    ],
    inputConfig: {
      label: "Quantite de stockage (Go)",
      labelAttrs: { for: "ssd-go-input" },
      inputAttrs: {
        id: "ssd-go-input",
        name: "Reponse quantite de Go de Stockage",
        step: 1,
        placeholder: "Ex: 4000",
      },
      resultLabel: "Empreinte SSD",
      resultAttrs: { id: "ssd-footprint-result" },
      defaultValue: 0,
    },
  });
}