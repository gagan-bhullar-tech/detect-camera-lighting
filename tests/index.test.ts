import detectLighting from "../src/index";

test("validate if photo or video is provided", async () => {
    await expect(detectLighting()).rejects.toThrow("Either 'photo' or 'video' must be provided.");
});

test("validate if both photo and video are provided", async () => {
    const photo = document.createElement("img");
    const video = document.createElement("video");
    await expect(detectLighting({ photo, video })).rejects.toThrow("Only one of 'photo' or 'video' should be provided, not both.");
});

test("validate if photo is an instance of HTMLImageElement", async () => {
    // @ts-ignore
    await expect(detectLighting({ photo: "invalid" })).rejects.toThrow("'photo' must be an instance of HTMLImageElement.");
});

test("validate if video is an instance of HTMLVideoElement", async () => {
    // @ts-ignore
    await expect(detectLighting({ video: "invalid" })).rejects.toThrow("'video' must be an instance of HTMLVideoElement.");
});