interface IDetectLightingOptions {
    threshold?: number;
}

const DEFAULT_THRESHOLD = 0.5;

const handleImage = (image: HTMLImageElement, threshold: number): Promise<boolean> => {
    return new Promise((resolve, reject) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            return reject(new Error("Failed to get canvas context."));
        }
        canvas.width = image.width;
        canvas.height = image.height;
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            // Calculate brightness using the perceived brightness formula
            const brightness = 0.299 * r + 0.587 * g + 0.114 * b;
            totalBrightness += brightness;
            pixelCount++;
        }
        const averageBrightness = totalBrightness / pixelCount;
        resolve(averageBrightness > threshold);
    });
}

const detectLightingInImage = (url: string, options?: Partial<IDetectLightingOptions>): Promise<boolean> => {
    return new Promise((resolve, reject) => {
       try {
            if (options && options.threshold !== undefined && (options.threshold < 0 || options.threshold > 1)) {
                throw new Error("'threshold' must be between 0 and 1.");
            }
            const threshold = options?.threshold || DEFAULT_THRESHOLD; // Default threshold value
            const image = new Image();
            image.crossOrigin = "Anonymous"; // Handle CORS if needed
            image.src = url;
            image.onload = () => {
                handleImage(image, threshold)
                    .then(result => resolve(result))
                    .catch(err => reject(err));
            };
            image.onerror = (err) => {
                reject(new Error(`Failed to load image: ${err}`));
            };
        } catch (error) {
            return reject(error);
       }
    });
};

export default {
    detectLightingInImage,
};