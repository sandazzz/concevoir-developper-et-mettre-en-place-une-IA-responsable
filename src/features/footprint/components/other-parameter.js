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

export function switchAbleInput(
  isInput,
  idNumber,
  updateTotalParameter = {
    powerSupplyUnit: 0,
    motherboard: 0,
    rackServer: 0,
    bladeEnclosure: 0,
    bladeServer: 0,
    interfaceCard: 0,
    serverAssembly: 0,
  },
) {
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
        attrs: { for: `autres-hdd-input-${idNumber}` },
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
                console.log(updateTotalParameter.powerSupplyUnit);

                const totalFootprint = calculEmpreinteAutres({
                  nbPowerSupplyUnit: updateTotalParameter.powerSupplyUnit,
                  nbHDD: value,
                  nbMotherboard: updateTotalParameter.motherboard,
                  nbRackServer: updateTotalParameter.rackServer,
                  nbBladeEnclosure: updateTotalParameter.bladeEnclosure,
                  nbBladeServer: updateTotalParameter.bladeServer,
                  nbInterfaceCard: updateTotalParameter.interfaceCard,
                  nbServerAssembly: updateTotalParameter.serverAssembly,
                });

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

export function otherParameter(
  idNumber,
  isInputhdd = false,
  basicValue = {
    powerSupplyUnit: 0,
    motherboard: 0,
    rackServer: 0,
    bladeEnclosure: 0,
    bladeServer: 0,
    interfaceCard: 0,
    serverAssembly: 0,
  },
) {
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
            count: basicValue.powerSupplyUnit,
            criterion: "24,30",
            footprint: basicValue.powerSupplyUnit * 24.3,
          }),
          switchAbleInput(isInputhdd, idNumber, basicValue),
          createStaticLedgerRow({
            label: "Motherboard",
            count: basicValue.motherboard,
            criterion: "66,10",
            footprint: basicValue.motherboard * 66.1,
          }),
          createStaticLedgerRow({
            label: "Rack Server",
            count: basicValue.rackServer,
            criterion: "150,00",
            footprint: basicValue.rackServer * 150.0,
          }),
          createStaticLedgerRow({
            label: "Blade Enclosure",
            count: basicValue.bladeEnclosure,
            criterion: "880,00",
            footprint: basicValue.bladeEnclosure * 880.0,
          }),
          createStaticLedgerRow({
            label: "Blade Server",
            count: basicValue.bladeServer,
            criterion: "30,90",
            footprint: basicValue.bladeServer * 30.9,
          }),
          createStaticLedgerRow({
            label: "Interface card",
            count: basicValue.interfaceCard,
            criterion: "33,05",
            footprint: basicValue.interfaceCard * 33.1,
          }),
          createStaticLedgerRow({
            label: "Server Assembly",
            count: basicValue.serverAssembly,
            criterion: "6,68",
            footprint: basicValue.serverAssembly * 6.7,
          }),
          createElement("div", {
            className: "calculator-ledger-total",
            children: [
              createElement("span", {
                text: "Total autres composants",
              }),
              createElement("strong", {
                text: calculEmpreinteAutres({
                  nbPowerSupplyUnit: basicValue.powerSupplyUnit,
                  nbHDD: 0,
                  nbMotherboard: basicValue.motherboard,
                  nbRackServer: basicValue.rackServer,
                  nbBladeEnclosure: basicValue.bladeEnclosure,
                  nbBladeServer: basicValue.bladeServer,
                  nbInterfaceCard: basicValue.interfaceCard,
                  nbServerAssembly: basicValue.serverAssembly,
                }),
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
