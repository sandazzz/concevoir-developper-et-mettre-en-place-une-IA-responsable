import { updateTotal } from "../update-total.js";
import { BasicParameter } from "./ui/basic-parameter.js";

export const calculEmpreinteRAM = (QttDeGoDeRAM, GoModule = 128) => {
  const ramDieParGo = 0.596666666666667;
  const critereDie = 2.2;
  const critereBase = 5.22;
  const QttDeBaretteDeRAM = QttDeGoDeRAM / GoModule;

  const empreinte =
    QttDeBaretteDeRAM * (GoModule * ramDieParGo * critereDie + critereBase);

  const resultatFinal = Number(empreinte.toFixed(1));
  return resultatFinal;
};

export function RamParameter(idNumber) {
  return BasicParameter({
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
        const barretteOutput = document.getElementById(
          `ram-barette-output-${idNumber}`,
        );

        const ramGoPerModule = 128;
        const numberBarrettes = Number(event.target.value) / ramGoPerModule;

        if (barretteOutput) {
          barretteOutput.textContent = numberBarrettes;
        }

        const ramResult = document.getElementById(
          `ram-footprint-result-${idNumber}`,
        );
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
