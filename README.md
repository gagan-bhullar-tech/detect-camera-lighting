# Detect Camera Lighting

[![Pipeline](https://github.com/gagan-bhullar-tech/detect-camera-lighting/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/gagan-bhullar-tech/detect-camera-lighting/actions/workflows/npm-publish.yml)

This library is designed to detect the lighting conditions from video stream or an image.

## Installation

```sh
npm install detect-camera-lighting
```

`## Usage

Detecting lighting from an image:

```javascript
import DetectLighting from 'detect-camera-lighting';

const detectLighting = new DetectLighting();

const lightImageUrl = 'https://example.com/path/to/light.jpg';

detectLighting.image(lightImageUrl)
    .then(result => {
        console.log(result); // output will be either 'light' or 'dark'
    })
    .catch(error => {
        console.error('Error detecting lighting:', error);
    });



If you like my work, please consider giving it a star on [GitHub](http://github.com/gagan-bhullar-tech/detect-camera-lighting) or Sponsor my work by following [sponsoring me](https://github.com/sponsors/gagan-bhullar-tech) link.
