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

  test("100 barettes de ram", () => {
    expect(calculEmpreinteRAM(100)).toBe(135.3);
  });

  test("200 barettes de ram", () => {
    expect(calculEmpreinteRAM(200)).toBe(270.7);
  });

  test("600 barettes de ram", () => {
    expect(calculEmpreinteRAM(600)).toBe(812.1);
  });
});

describe("calculEmpreinteAutres", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteAutres).toBeDefined();
  });
});
