export interface IDetectLightingOptions {
    threshold?: number;
}

type DetectLightingType = HTMLImageElement | HTMLVideoElement;

const detectLighting = (object: DetectLightingType, options?: Partial<IDetectLightingOptions>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
       try {
            if (options && options.threshold !== undefined && (options.threshold < 0 || options.threshold > 1)) {
                throw new Error("'threshold' must be between 0 and 1.");
            }
            const threshold = options?.threshold || 0.5; // Default threshold value
        } catch (error) {
            return reject(error);
       }
    });
};

export default detectLighting;