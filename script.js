import { createElement, createStrip } from "./src/utils/create-element.js";
import Footprint from "./src/features/footprint.js";

const GPU_MODELS = ["A100", "H100", "Tesla V100"];

const createGpuRow = ({ familyId, countId, criterionId, resultId }) =>
  createElement("div", {
    className: "calculator-matrix-row",
    children: [
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: familyId },
        children: [
          createElement("select", {
            className: "calculator-input calculator-select",
            attrs: { id: familyId },
            children: GPU_MODELS.map((model) =>
              createElement("option", {
                text: model,
                attrs: { value: model },
              }),
            ),
          }),
        ],
      }),
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: countId },
        children: [
          createElement("input", {
            className: "calculator-input",
            attrs: {
              id: countId,
              type: "number",
              name: `Reponse pour ${countId}`,
              value: 0,
              min: 0,
              step: 1,
              placeholder: "Ex: 4",
            },
          }),
        ],
      }),
      createElement("span", {
        text: "0",
        attrs: { id: criterionId },
      }),
      createElement("span", {
        text: "0",
        attrs: { id: resultId },
      }),
    ],
  });

const createStaticLedgerRow = ({ label, count, criterion, footprint }) =>
  createElement("div", {
    className: "calculator-ledger-row",
    children: [
      createElement("strong", { text: label }),
      createElement("span", { text: count }),
      createElement("span", { text: criterion }),
      createElement("span", { text: footprint }),
    ],
  });

const createCalculator = () =>
  createElement("article", {
    className: "content-block practical-case calculator-studio",
    children: [
      createElement("div", {
        className: "calculator-studio-shell",
        children: [
          createElement("div", {
            className: "calculator-studio-main",
            children: [
              createElement("div", {
                className: "calculator-studio-heading",
                children: [
                  createElement("span", {
                    className: "calculator-kicker",
                    text: "Calculatrice",
                  }),
                ],
              }),
              createStrip({
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
              }),
              createStrip({
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
              }),
              createElement("section", {
                className: "calculator-strip calculator-strip-gpu",
                children: [
                  createElement("div", {
                    className: "calculator-strip-head",
                    children: [
                      createElement("span", {
                        className: "calculator-strip-index",
                        text: "C",
                      }),
                      createElement("div", {
                        children: [
                          createElement("h4", { text: "Parametrage GPU" }),
                          createElement("p", {
                            text: "Selectionnez jusqu'a deux familles de GPU et ajustez le nombre de cartes pour chaque ligne.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  createElement("div", {
                    className: "calculator-matrix",
                    children: [
                      createElement("div", {
                        className: "calculator-matrix-header",
                        children: [
                          createElement("span", { text: "Famille GPU" }),
                          createElement("span", { text: "Nombre" }),
                          createElement("span", { text: "Critere" }),
                          createElement("span", { text: "Empreinte" }),
                        ],
                      }),
                      createGpuRow({
                        familyId: "gpu-family-1",
                        countId: "gpu-nb-1",
                        criterionId: "gpu-criterion-1",
                        resultId: "gpu-footprint-result-1",
                      }),
                      createGpuRow({
                        familyId: "gpu-family-2",
                        countId: "gpu-nb-2",
                        criterionId: "gpu-criterion-2",
                        resultId: "gpu-footprint-result-2",
                      }),
                      createElement("div", {
                        className: "calculator-matrix-total",
                        children: [
                          createElement("span", { text: "Total GPU" }),
                          createElement("strong", {
                            text: "0",
                            attrs: { id: "gpu-footprint-result" },
                          }),
                          createElement("span", { text: "kg CO2eq" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
              createStrip({
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
              }),
              createElement("section", {
                className: "calculator-strip calculator-strip-components",
                children: [
                  createElement("div", {
                    className: "calculator-strip-head",
                    children: [
                      createElement("span", {
                        className: "calculator-strip-index",
                        text: "E",
                      }),
                      createElement("div", {
                        children: [
                          createElement("h4", {
                            text: "Parametrage des autres composants",
                          }),
                          createElement("p", {
                            text: "Le total ci-dessous inclut les composants fixes et le nombre de HDD ajustable.",
                          }),
                        ],
                      }),
                    ],
                  }),
                  createElement("div", {
                    className: "calculator-ledger",
                    children: [
                      createElement("div", {
                        className: "calculator-ledger-header",
                        children: [
                          createElement("span", { text: "Composant" }),
                          createElement("span", { text: "Nombre" }),
                          createElement("span", { text: "Critere" }),
                          createElement("span", { text: "Empreinte" }),
                        ],
                      }),
                      createStaticLedgerRow({
                        label: "Power Supply Unit",
                        count: "2",
                        criterion: "24,30",
                        footprint: "97,2",
                      }),
                      createElement("div", {
                        className:
                          "calculator-ledger-row calculator-ledger-row-input",
                        children: [
                          createElement("strong", { text: "HDD" }),
                          createElement("label", {
                            className: "calculator-inline-input",
                            attrs: { for: "autres-hdd-input" },
                            children: [
                              createElement("input", {
                                className: "calculator-input",
                                attrs: {
                                  id: "autres-hdd-input",
                                  type: "number",
                                  min: 0,
                                  step: 1,
                                  value: "",
                                  placeholder: "0",
                                },
                              }),
                            ],
                          }),
                          createElement("span", { text: "31,10" }),
                          createElement("span", {
                            text: "0",
                            attrs: { id: "autres-hdd-footprint" },
                          }),
                        ],
                      }),
                      createStaticLedgerRow({
                        label: "Motherboard",
                        count: "1",
                        criterion: "66,10",
                        footprint: "66,1",
                      }),
                      createStaticLedgerRow({
                        label: "Rack Server",
                        count: "1",
                        criterion: "150,00",
                        footprint: "150,0",
                      }),
                      createStaticLedgerRow({
                        label: "Blade Enclosure",
                        count: "0",
                        criterion: "880,00",
                        footprint: "0,0",
                      }),
                      createStaticLedgerRow({
                        label: "Blade Server",
                        count: "0",
                        criterion: "30,90",
                        footprint: "0,0",
                      }),
                      createStaticLedgerRow({
                        label: "Interface card",
                        count: "1",
                        criterion: "33,05",
                        footprint: "33,1",
                      }),
                      createStaticLedgerRow({
                        label: "Server Assembly",
                        count: "1",
                        criterion: "6,68",
                        footprint: "6,7",
                      }),
                      createElement("div", {
                        className: "calculator-ledger-total",
                        children: [
                          createElement("span", {
                            text: "Total autres composants",
                          }),
                          createElement("strong", {
                            text: "0",
                            attrs: { id: "autres-total-footprint" },
                          }),
                          createElement("span", { text: "kg CO2eq" }),
                        ],
                      }),
                    ],
                  }),
                ],
              }),
            ],
          }),
          createElement("aside", {
            className: "calculator-summary",
            attrs: { "aria-live": "polite" },
            children: [
              createElement("span", {
                className: "calculator-summary-label",
                text: "Synthese atelier",
              }),
              createElement("strong", {
                className: "calculator-summary-value",
                text: "0",
                attrs: { id: "global-total-divided" },
              }),
              createElement("span", {
                className: "calculator-summary-unit",
                text: "kg CO2eq / serveur",
              }),
              createElement("p", {
                className: "calculator-summary-note",
                children: [
                  createElement("span", {
                    text: "Total pour la fabrication",
                  }),
                  createElement("br"),
                  createElement("span", {
                    text: "(kg CO2eq) / serveur",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });

const app = document.getElementById("app");

if (app) {
  app.replaceChildren(createCalculator());
  Footprint();
}
