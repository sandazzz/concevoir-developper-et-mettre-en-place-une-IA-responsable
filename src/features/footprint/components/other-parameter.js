import { createElement } from "@/src/utils/create-element.js";
import { Header } from "./ui/basic-parameter.js";
import { updateTotal } from "../update-total.js";

export const calculEmpreinteAutres = ({
  nbPowerSupplyUnit = 2,
  nbHDD,
  nbMotherboard = 1,
  nbRackServer = 1,
  //nbBladeEnclosure = 0,
  //nbBladeServer = 0,
  nbInterfaceCard = 1,
  nbServerAssembly = 1,
}) => {
  const crPowerSupplyUnit = 24.3;
  const crHDD = 31.1;
  const crMotherboard = 66.1;
  const crRackServer = 150.0;
  //const crBladeEnclosure = 880;
  //const crBladeServer = 30.9;
  const crInterfaceCard = 33.05;
  const crServerAssembly = 6.68;

  const emprPowerSupplyUnit = nbPowerSupplyUnit * 2 * crPowerSupplyUnit;
  const emprHDD = nbHDD * crHDD;
  const emprMotherboard = nbMotherboard * crMotherboard;
  const emprRackServer = nbRackServer * crRackServer;
  //const emprBladeEnclosure = nbBladeEnclosure * crBladeEnclosure;
  //const emprBladeServer = nbBladeServer * crBladeServer;
  const emprInterfaceCard = nbInterfaceCard * crInterfaceCard;
  const emprServerAssembly = nbServerAssembly * crServerAssembly;

  const total =
    emprPowerSupplyUnit +
    emprHDD +
    emprMotherboard +
    emprRackServer +
    //emprBladeEnclosure +
    //emprBladeServer +
    emprInterfaceCard +
    emprServerAssembly;

  return total.toFixed(2);
};

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
  basicValue = {
    powerSupplyUnit: 0,
    inputHdd: false,
    motherboard: 0,
    rackServer: 0,
    //bladeEnclosure: 0,
    //bladeServer: 0,
    interfaceCard: 0,
    serverAssembly: 0,
  },
) {
  return createElement("section", {
    className: "calculator-strip calculator-strip-components",
    children: [
      Header({ index: "E", title: "Parametrage des autres composants" }),
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
            footprint: (basicValue.powerSupplyUnit * 24.3).toFixed(1),
          }),
          switchAbleInput(basicValue.inputHdd, idNumber, basicValue),
          createStaticLedgerRow({
            label: "Motherboard",
            count: basicValue.motherboard,
            criterion: "66,10",
            footprint: (basicValue.motherboard * 66.1).toFixed(1),
          }),
          createStaticLedgerRow({
            label: "Rack Server",
            count: basicValue.rackServer,
            criterion: "150,00",
            footprint: (basicValue.rackServer * 150.0).toFixed(1),
          }),
          // createStaticLedgerRow({
          //   label: "Blade Enclosure",
          //   count: basicValue.bladeEnclosure,
          //   criterion: "880,00",
          //   footprint: (basicValue.bladeEnclosure * 880.0).toFixed(1),
          // }),
          // createStaticLedgerRow({
          //   label: "Blade Server",
          //   count: basicValue.bladeServer,
          //   criterion: "30,90",
          //   footprint: (basicValue.bladeServer * 30.9).toFixed(1),
          // }),
          createStaticLedgerRow({
            label: "Interface card",
            count: basicValue.interfaceCard,
            criterion: "33,05",
            footprint: (basicValue.interfaceCard * 33.1).toFixed(1),
          }),
          createStaticLedgerRow({
            label: "Server Assembly",
            count: basicValue.serverAssembly,
            criterion: "6,68",
            footprint: (basicValue.serverAssembly * 6.7).toFixed(1),
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
                  //nbBladeEnclosure: basicValue.bladeEnclosure,
                  //nbBladeServer: basicValue.bladeServer,
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
