interface IDetectLightingOptions {
    threshold?: number;
}

const DEFAULT_THRESHOLD = 0.5;

enum DetectLightingState {
    LIGHT = "light",
    DARK = "dark",
}

export default class DetectLighting {
    private eventTarget = new EventTarget();
    lastVideoTime = 0;

    image(url: string, options?: Partial<IDetectLightingOptions>): EventTarget {
        if (options && options.threshold !== undefined && (options.threshold < 0 || options.threshold > 1)) {
            throw new Error("'threshold' must be between 0 and 1.");
        }
        const threshold = options?.threshold || DEFAULT_THRESHOLD; // Default threshold value
        const image = new Image();
        const canvas = document.createElement('canvas');
        image.onload = () => {
            canvas.width = image.width;
            canvas.height = image.height;
            this.processFrame(image, canvas, threshold);
        };
        image.onerror = (err) => {
            throw new Error(`Failed to load image: ${err}`);
        };
        image.crossOrigin = "anonymous";
        image.src = url;
        return this.eventTarget;
    }

    video(video: HTMLVideoElement, options?: Partial<IDetectLightingOptions>): EventTarget {
        if (options && options.threshold !== undefined && (options.threshold < 0 || options.threshold > 1)) {
            throw new Error("'threshold' must be between 0 and 1.");
        }
        const threshold = options?.threshold || DEFAULT_THRESHOLD; // Default threshold value
        if (!video) {
            throw new Error("No video element provided.");
        }
        if (video.readyState < 2) {
            throw new Error("Video is not ready. Ensure the video is loaded before processing.");
        }
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        this.processFrame(video, canvas, threshold);
        return this.eventTarget;
    }

    private processFrame(frame: HTMLImageElement | HTMLVideoElement, canvas: HTMLCanvasElement, threshold: number) {
        const ctx = canvas.getContext('2d');
        if (!ctx) {
            throw new Error("Failed to get canvas context.");
        }
        ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        let totalBrightness = 0;
        let pixelCount = 0;
        for (let i = 0; i < data.length; i += 4 * 10) {
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
        this.eventTarget.dispatchEvent(new CustomEvent("processed", { detail: averageBrightness > thresholdValue ? DetectLightingState.LIGHT : DetectLightingState.DARK }));
        if (frame instanceof HTMLVideoElement) {
            // If it's a video, request the next frame
            requestAnimationFrame(() => {
                this.processFrame(frame, canvas, threshold);
            });
        }
    }
}
