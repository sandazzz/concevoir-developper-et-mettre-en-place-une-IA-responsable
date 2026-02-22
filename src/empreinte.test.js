const {
  calculEmpreinteCPU,
  calculEmpreinteRAM,
  calculEmpreinteAutres,
} = require("./empreinte");

describe("calculEmpreinteCPU", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteCPU).toBeDefined();
  });
});

describe("calculEmpreinteRAM", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteRAM).toBeDefined();
  });
});

describe("calculEmpreinteAutres", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteAutres).toBeDefined();
  });
});
