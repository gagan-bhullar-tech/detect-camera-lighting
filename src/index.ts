interface IDetectLightingOptions {
    threshold?: number;
}

const DEFAULT_THRESHOLD = 0.5;

enum DetectLightingState {
    LIGHT = "light",
    DARK = "dark",
}

export default class DetectLighting {
    image(url: string, options?: Partial<IDetectLightingOptions>): Promise<string> {
        return new Promise((resolve, reject) => {
           try {
                if (options && options.threshold !== undefined && (options.threshold < 0 || options.threshold > 1)) {
                    throw new Error("'threshold' must be between 0 and 1.");
                }
                const threshold = options?.threshold || DEFAULT_THRESHOLD; // Default threshold value
                const image = new Image();
                image.onload = () => {
                    this.processFrame(image, threshold)
                        .then(result => resolve(result))
                        .catch(err => reject(err));
                };
                image.onerror = (err) => {
                    reject(new Error(`Failed to load image: ${err}`));
                };
                image.crossOrigin = "anonymous";
                image.src = url;
            } catch (error) {
                return reject(error);
           }
        });
    }

    private processFrame(frame: HTMLImageElement, threshold: number): Promise<string> {
        return new Promise((resolve, reject) => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) {
                return reject(new Error("Failed to get canvas context."));
            }
            canvas.width = frame.width;
            canvas.height = frame.height;
            ctx.drawImage(frame, 0, 0, frame.width, frame.height);
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
            const thresholdValue = 255 * threshold; // Convert threshold to a value between 0 and 255
            return averageBrightness > thresholdValue ? resolve(DetectLightingState.LIGHT) : resolve(DetectLightingState.DARK);
        });
    }
}
