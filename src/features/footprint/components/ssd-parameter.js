import { updateTotal } from "./update-total.js";
import { BasicParameter } from "./ui/basic-parameter.js";

export function SsdParameter(idNumber) {
  const el = BasicParameter({
    index: "D",
    title: "Parametrage SSD",
    facts: [
      { label: "Type / Modele", value: "Stockage" },
      { label: "Go / SSD", value: "2000" },
      {
        label: "Nombre de SSD estime",
        value: "0",
        valueAttrs: { id: `ssd-nb-${idNumber}` },
      },
    ],
    inputConfig: {
      label: "Quantite de stockage (Go)",
      labelAttrs: { for: `ssd-go-input-${idNumber}` },
      inputAttrs: {
        id: `ssd-go-input-${idNumber}`,
        name: "Reponse quantite de Go de Stockage",
        step: 1,
        placeholder: "Ex: 4000",
      },
      resultLabel: "Empreinte SSD",
      resultAttrs: { id: `ssd-footprint-result-${idNumber}` },
      defaultValue: 0,
    },
    events: {
      input: (event) => {
        const ssdResult = document.getElementById(
          `ssd-footprint-result-${idNumber}`,
        );
        const ssdNb = document.getElementById(`ssd-nb-${idNumber}`);
        const value = Number(event.target.value || 0);
        const nbSsd = value / 2000;
        ssdNb.textContent = nbSsd;
        const result = calculEmpreinteSSD(value);

        if (ssdResult) {
          ssdResult.textContent = result;
        }
        updateTotal(idNumber);
      },
    },
  });
  return el;
}

const calculEmpreinteSSD = (
  quantiteGo, // ex: 10000
) => {
  const goParSSD = 2000;
  const dieParGo = 0.0198;
  const critereDie = 2.2;
  const critereBase = 6.34;

  // 1. Calcul du nombre de SSDs (équivalent =B35/D35)
  const nombreSSDs = quantiteGo / goParSSD;

  // 2. Calcul de l'empreinte
  const empreinte =
    nombreSSDs * (goParSSD * dieParGo * critereDie + critereBase);

  return empreinte.toFixed(2);
};
