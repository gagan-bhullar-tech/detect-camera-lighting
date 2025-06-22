export interface IDetectLightingOptions {
    photo?: HTMLImageElement;
    video?: HTMLVideoElement;
    threshold?: number;
}

const validate = (options?: Partial<IDetectLightingOptions>): void => {
    if (!options || (!options.photo && !options.video)) {
        throw new Error("Either 'photo' or 'video' must be provided.");
    }
    if (options.photo && options.video) {
        throw new Error("Only one of 'photo' or 'video' should be provided, not both.");
    }
    if (options.photo && !(options.photo instanceof HTMLImageElement)) {
        throw new Error("'photo' must be an instance of HTMLImageElement.");
    }
    if (options.video && !(options.video instanceof HTMLVideoElement)) {
        throw new Error("'video' must be an instance of HTMLVideoElement.");
    }
};

const detectLighting = (options?: Partial<IDetectLightingOptions>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
       try {
            validate(options);
            const threshold = options?.threshold || 0.5; // Default threshold value
        } catch (error) {
            return reject(error);
       }
    });
};

export default detectLighting;