# Detect Camera Lighting

[![Pipeline](https://github.com/gagan-bhullar-tech/detect-camera-lighting/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/gagan-bhullar-tech/detect-camera-lighting/actions/workflows/npm-publish.yml)

This library is designed to detect the lighting conditions from video stream or an image.

## Installation

```sh
npm install detect-camera-lighting
```

## Usage - Detect lighting from image

```javascript
import DetectLighting from 'detect-camera-lighting';

const detectLighting = new DetectLighting();

const lightImageUrl = './images/light.jpg';

const eventEmitter = detectLighting.image(lightImageUrl);
eventEmitter.addEventListener('processed', (data) => {
    console.log('Processed image:', data.detail); // this will give value 'light' or 'dark'
});

```

## Usage - Detect lighting from video stream

Note: Ensure video is loaded before passing to the library

```javascript
import DetectLighting from 'detect-camera-lighting';

navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        const video = document.getElementById('video');
        video.srcObject = stream;

        video.addEventListener('loadedmetadata', () => {
            video.play();
        });
        video.addEventListener('play', () => {
            detectLighting.video(video).addEventListener('processed', (data) => {
                console.log('Processed video frame:', data.detail); // this will give value 'light' or 'dark'
            });
        });
    })
    .catch((error) => {
        console.error('Error accessing webcam:', error);
    });
```

## Options

You can pass options to the image/video methods of `DetectLighting` to customize the detection process.

**Threshold:** The default threshold is set to 0.5, which means if the average brightness of the image is greater than 0.5, it will be considered as 'light', otherwise 'dark'.

```javascript
const eventEmitter = detectLighting.image(lightImageUrl, {
    threshold: 0.5, // Threshold for light detection (default is 0.5) 
});

const eventEmitter = detectLighting.video(video, {
    threshold: 0.5, // Threshold for light detection (default is 0.5) 
});
```

If you like my work, please consider giving it a star on [GitHub](http://github.com/gagan-bhullar-tech/detect-camera-lighting) or Sponsor my work by following [sponsoring me](https://github.com/sponsors/gagan-bhullar-tech) link.
