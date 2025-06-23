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
    console.log('Processed image:', data.detail);
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
                console.log('Processed video frame:', data.detail);
            });
        });
    })
    .catch((error) => {
        console.error('Error accessing webcam:', error);
    });
```


If you like my work, please consider giving it a star on [GitHub](http://github.com/gagan-bhullar-tech/detect-camera-lighting) or Sponsor my work by following [sponsoring me](https://github.com/sponsors/gagan-bhullar-tech) link.
