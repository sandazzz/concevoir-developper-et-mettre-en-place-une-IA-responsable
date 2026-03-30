import { createElement, createStrip } from "./src/utils/create-element.js";

const app = document.getElementById("app");

const div = createElement("div", {
  className: "container",
  text: "Hello World",
});

const cpuStrip = createStrip({
  index: "A",
  title: "Paramétrage CPU",
  description: "Socle matériel processeur utilisé pour le calcul.",
  facts: [
    { label: "Type / Modèle", value: "AMD EPIC" },
    { label: "Famille", value: "Zen 2" },
    { label: "vCPU par CPU", value: "32" }
  ],
  inputConfig: {
    label: "Nombre de CPU physiques",
    resultLabel: "Empreinte CPU",
    defaultValue: 0
  }
});

const ramStrip = createStrip({
  index: "B",
  title: "Paramétrage RAM",
  description: "Le nombre de barrettes est dérivé automatiquement.",
  facts: [
    { label: "Type / Modèle", value: "Samsung" },
    { label: "Go / module", value: "128" }
  ],
  inputConfig: {
    label: "Quantité de RAM (Go)",
    resultLabel: "Empreinte RAM"
  }
});

const ssdStrip = createStrip({
    index: "D",
    title: "Paramétrage SSD",
    description:
      "Le nombre de SSD est dérivé automatiquement à partir du volume total de stockage saisi.",
    facts: [
      { label: "Type / Modèle", value: "Stockage" },
      { label: "Go / SSD", value: "2000" },
      { label: "Nombre de SSD estimé", value: "0" }
    ],
    inputConfig: {
      label: "Quantité de stockage (Go)",
      resultLabel: "Empreinte SSD",
      defaultValue: 0,
      onChange: (value) => {
        const footprint = value * 0.02; // exemple
        return footprint.toFixed(2);
      }
    }
  });

app.append(div, cpuStrip, ramStrip, ssdStrip);