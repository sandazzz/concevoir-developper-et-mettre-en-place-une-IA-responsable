export function createElement(tag, options = {}) {
  const el = document.createElement(tag);

  if (options.className) el.className = options.className;
  if (options.text) el.textContent = options.text;

  if (options.attrs) {
    Object.entries(options.attrs).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });
  }

  if (options.children) {
    options.children.forEach(child => {
      if (child) el.appendChild(child);
    });
  }

  return el;
}

export function createStrip({ index, title, description, facts = [], inputConfig }) {
  return createElement("section", {
    className: "calculator-strip",
    children: [
      // HEADER
      createElement("div", {
        className: "calculator-strip-head",
        children: [
          createElement("span", {
            className: "calculator-strip-index",
            text: index
          }),
          createElement("div", {
            children: [
              createElement("h4", { text: title }),
              createElement("p", { text: description })
            ]
          })
        ]
      }),

      // FACTS
      createElement("div", {
        className: "calculator-facts",
        children: facts.map(fact =>
          createElement("div", {
            className: "calculator-fact",
            children: [
              createElement("span", { text: fact.label }),
              createElement("strong", { text: fact.value })
            ]
          })
        )
      }),

      // INPUT + RESULT
      createElement("div", {
        className: "calculator-action-row",
        children: [
          createElement("label", {
            className: "calculator-field",
            children: [
              createElement("span", {
                className: "calculator-input-label",
                text: inputConfig.label
              }),
              createElement("input", {
                className: "calculator-input",
                attrs: {
                  type: "number",
                  value: inputConfig.defaultValue || 0,
                  min: 0
                }
              })
            ]
          }),

          createElement("div", {
            className: "calculator-inline-result",
            children: [
              createElement("span", {
                className: "calculator-output-label",
                text: inputConfig.resultLabel
              }),
              createElement("strong", {
                text: "0"
              }),
              createElement("span", {
                className: "calculator-output-unit",
                text: "kg CO2eq"
              })
            ]
          })
        ]
      })
    ]
  });
}