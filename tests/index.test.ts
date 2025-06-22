import detectLighting from "../src/index";

test("detectLighting should throw an error if 'threshold' is not a number", async () => {
    const img = new Image();
    await expect(detectLighting(img, { threshold: 1.5 })).rejects.toThrow("'threshold' must be between 0 and 1.");
});