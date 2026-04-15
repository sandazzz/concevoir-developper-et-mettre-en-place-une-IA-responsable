import { describe, expect, test } from "vitest";
import { calculEmpreinteCPU } from "../features/footprint/components/cpu-parameter.js";
import { calculEmpreinteRAM } from "../features/footprint/components/ram-parameter.js";
import { calculEmpreinteSSD } from "../features/footprint/components/ssd-parameter.js";
import { calculEmpreinteAutres } from "../features/footprint/components/other-parameter.js";

describe("calculEmpreinteCPU", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteCPU).toBeDefined();
  });

  test("1 CPU", () => {
    expect(calculEmpreinteCPU(1)).toBe(18);
  });

  test("2 CPU", () => {
    expect(calculEmpreinteCPU(2)).toBe(37);
  });

  test("6 CPU", () => {
    expect(calculEmpreinteCPU(6)).toBe(110);
  });

  test("11 CPU", () => {
    expect(calculEmpreinteCPU(11)).toBe(201);
  });
});

describe("calculEmpreinteRAM", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteRAM).toBeDefined();
  });

  test("100 barettes de ram", () => {
    expect(calculEmpreinteRAM(100)).toBe(135);
  });

  test("200 barettes de ram", () => {
    expect(calculEmpreinteRAM(200)).toBe(271);
  });

  test("600 barettes de ram", () => {
    expect(calculEmpreinteRAM(600)).toBe(812);
  });

  test("390 barettes de ram", () => {
    expect(calculEmpreinteRAM(390)).toBe(528);
  });

  test("1200 barettes de ram", () => {
    expect(calculEmpreinteRAM(1200)).toBe(1624);
  });

});

describe("calculEmpreinteSSD", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteSSD).toBeDefined();
  });

  test("0 Go de stockage", () => {
    expect(calculEmpreinteSSD(0)).toBe("0");
  });

  test("2000 Go de stockage", () => {
    expect(calculEmpreinteSSD(2000)).toBe("94");
  });

  test("4000 Go de stockage", () => {
    expect(calculEmpreinteSSD(4000)).toBe("187");
  });

  test("10000 Go de stockage", () => {
    expect(calculEmpreinteSSD(10000)).toBe("468");
  });
});

describe("calculEmpreinteAutres", () => {
  test("Initialisation", () => {
    expect(calculEmpreinteAutres).toBeDefined();
  });

  test("2 HDD", () => {
    expect(calculEmpreinteAutres({ nbPowerSupplyUnit: 2, nbHDD: 2 })).toBe(
      "415",
    );
  });

  test("4 HDD", () => {
    expect(calculEmpreinteAutres({ nbPowerSupplyUnit: 2, nbHDD: 4 })).toBe(
      "477",
    );
  });

  test("6 HDD", () => {
    expect(calculEmpreinteAutres({ nbPowerSupplyUnit: 2, nbHDD: 6 })).toBe(
      "540",
    );
  });
});
