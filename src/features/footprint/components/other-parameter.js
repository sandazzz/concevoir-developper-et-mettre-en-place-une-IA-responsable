import { createElement } from "../../../utils/create-element.js";
import { calculEmpreinteAutres } from "../footprint.js";
import { updateTotal } from "./update-total.js";

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

export function switchAbleInput(isInput, idNumber) {
  if (!isInput) {
    return createStaticLedgerRow({
      label: "HDD",
      count: "0",
      criterion: "31,10",
      footprint: "0,0",
    });
  }

  return createElement("div", {
    className: "calculator-ledger-row calculator-ledger-row-input",
    children: [
      createElement("strong", { text: "HDD" }),
      createElement("label", {
        className: "calculator-inline-input",
        attrs: { for: "autres-hdd-input" },
        children: [
          createElement(
            "input",
            {
              className: "calculator-input",
              attrs: {
                id: `autres-hdd-input-${idNumber}`,
                type: "number",
                min: 0,
                step: 1,
                value: "",
                placeholder: "0",
              },
            },
            {
              input: (event) => {
                const hddResult = document.getElementById(
                  `autres-hdd-footprint-${idNumber}`,
                );
                const totalAutresResult = document.getElementById(
                  `autres-total-footprint-${idNumber}`,
                );
                const value = Number(event.target.value || 0);
                const footprint = value * 31.1;

                if (hddResult) {
                  hddResult.textContent = footprint;
                }

                const totalFootprint = calculEmpreinteAutres({nbHDD: value});

                if (totalAutresResult) {
                  totalAutresResult.textContent = totalFootprint;
                }
                updateTotal(idNumber);
              },
            },
          ),
        ],
      }),
      createElement("span", { text: "31,10" }),
      createElement("span", {
        text: "0",
        attrs: { id: `autres-hdd-footprint-${idNumber}` },
      }),
    ],
  });
}

export function otherParameter(idNumber) {
  return createElement("section", {
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
          switchAbleInput(false, idNumber),
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
                text: calculEmpreinteAutres({nbHDD: 0}),
                attrs: { id: `autres-total-footprint-${idNumber}` },
              }),
              createElement("span", { text: "kg CO2eq" }),
            ],
          }),
        ],
      }),
    ],
  });
}
