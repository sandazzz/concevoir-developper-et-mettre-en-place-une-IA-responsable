export function createElement(tag, options = {}, on) {
  const el = document.createElement(tag);

  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;

  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  if (options.children) {
    options.children.forEach((child) => {
      if (child) el.appendChild(child);
    });
  }

  if (on) {
    //console.log("EVENTS DETECTED", on);

    Object.entries(on).forEach(([event, handler]) => {
      el.addEventListener(event, handler);
      //console.log(`Event listener added: ${event}`);
    });
  }
  return el;
}

export function createStrip({
  index,
  title,
  facts = [],
  inputConfig,
  className = "calculator-strip",
  events,
}) {
  return createElement("section", {
    className,
    children: [
      // HEADER
      createElement("div", {
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
      }),

      // FACTS
      createElement("div", {
        className: "calculator-facts",
        children: facts.map((fact) =>
          createElement("div", {
            className: fact.className || "calculator-fact",
            children: [
              createElement("span", { text: fact.label }),
              createElement("strong", {
                text: fact.value,
                attrs: fact.valueAttrs,
              }),
            ],
          }),
        ),
      }),

      // INPUT + RESULT
      createElement("div", {
        className: "calculator-action-row",
        children: [
          createElement("label", {
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
          }),

          createElement("div", {
            className: "calculator-inline-result",
            children: [
              createElement("span", {
                className: "calculator-output-label",
                text: inputConfig.resultLabel,
              }),
              createElement("strong", {
                text: "0",
                attrs: inputConfig.resultAttrs,
              }),
              createElement("span", {
                className: "calculator-output-unit",
                text: inputConfig.unit || "kg CO2eq",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
