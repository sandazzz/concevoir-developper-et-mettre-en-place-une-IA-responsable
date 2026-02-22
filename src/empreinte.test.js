const {
  calculEmpreinteCPU,
  calculEmpreinteRAM,
  calculEmpreinteAutres,
} = require("./empreinte");

describe("calculEmpreinteCPU", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteCPU).toBeDefined();
  });

  test("1 CPU", () => {
    expect(calculEmpreinteCPU(1)).toBe(21);
  });

  test("2 CPU", () => {
    expect(calculEmpreinteCPU(2)).toBe(42.1);
  });

  test("6 CPU", () => {
    expect(calculEmpreinteCPU(6)).toBe(126.2);
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
