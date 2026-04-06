import { createElement } from "@/src/utils/create-element.js";

export function BasicParameter({
  index,
  title,
  facts = [],
  inputConfig,
  events,
}) {
  return createElement("section", {
    className: "calculator-strip",
    children: [
      Header({ index, title }),
      Facts({ facts }),
      // INPUT + RESULT
      createElement("div", {
        className: "calculator-action-row",
        children: [
          Input({ inputConfig, events }),
          Result({ resultConfig: inputConfig }),
        ],
      }),
    ],
  });
}

export function Header({ index, title }) {
  return createElement("div", {
    className: "calculator-strip-head",
    children: [
      createElement("span", {
        className: "calculator-strip-index",
        text: index,
      }),
      createElement("div", {
        children: [createElement("h4", { text: title })],
      }),
    ],
  });
}

export function Facts({ facts }) {
  return createElement("div", {
    className: "calculator-facts",
    children: facts.map((fact) => Fact({ fact })),
  });
}

function Fact({ fact }) {
    return createElement("div", {
      className: "calculator-fact",
      children: [
        createElement("span", { text: fact.label }),
        createElement("strong", {
          text: fact.value,
          attrs: fact.valueAttrs?.id ? { id: fact.valueAttrs.id } : undefined,
        }),
      ],
    });
  }

function Input({ inputConfig, events }) {
  return createElement("label", {
    className: "calculator-field",
    attrs: inputConfig.labelAttrs,
    children: [
      createElement("span", {
        className: "calculator-input-label",
        text: inputConfig.label,
      }),
      createElement(
        "input",
        {
          className: "calculator-input",
          attrs: {
            type: "number",
            value: inputConfig.defaultValue ?? 0,
            min: 0,
            ...inputConfig.inputAttrs,
          },
        },
        events,
      ),
    ],
  });
}

function Result({ resultConfig }) {
  return createElement("div", {
    className: "calculator-inline-result",
    children: [
      createElement("span", {
        className: "calculator-output-label",
        text: resultConfig.resultLabel,
      }),
      createElement("strong", {
        text: "0",
        attrs: resultConfig.resultAttrs,
      }),
      createElement("span", {
        className: "calculator-output-unit",
        text: "kg CO2eq",
      }),
    ],
  });
}
