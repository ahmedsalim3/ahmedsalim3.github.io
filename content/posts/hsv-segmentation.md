---
date: 2024-03-22 00:00:00 +0800
title: "Color Based Image Segmentation Tool In Python"
categories:
  - Data Science
pin: false
render_with_liquid: false
tags:
   - Python
   - Computer Vision
   - Image Processing
   - Image Segmentation
   - Streamlit
includes_code: yes
includes_math: yes
---

{{< figure src="/posts/hsv-segmentation/web.png" alt="" caption="" width="100%" class="right" >}}

This article introduces an automated image processing tool developed in Python that includes functions for enhancing images using Contrast Limited Adaptive Histogram Equalization (CLAHE) and performing image segmentation through color thresholding.

{{< notice note "Note" >}}
The Python source code for the app is available in this [GitHub repository](https://github.com/ahmedsalim3/Color-Based-Image-Segmentation.git), and the deployed tool can be accessed [here](https://hsv-segmentation.onrender.com).
{{< /notice >}}

## Introduction

In the realm of computer vision and image processing, precise segmentation of objects based on color plays a pivotal role in various applications. This blog delves into the intricacies of color-based image segmentation, exploring the development of a Python tool capable of automating this process. Through the utilization of advanced techniques, such as Contrast Limited Adaptive Histogram Equalization (CLAHE), this tool empowers users to enhance and segment images with remarkable accuracy and efficiency.

### Understanding Color Spaces

While the RGB (Red, Green, Blue) color space is commonly used to represent images, other color spaces like HSV (Hue, Saturation, Value) offer unique advantages, particularly in image processing tasks. HSV breaks down colors into three main attributes: Hue (the type of color), Saturation (the intensity or purity), and Value (the brightness or lightness).

RGB (Red, Green, Blue) is the standard color space to store images, represented as an (width, height, color channels==3) array of pixels where each pixel contains three color components (red, green, and blue). It forms a 3-D model where additive color mixing results in black when all color channels are zero and white when all are set to their maximum value of 255. However, it also exists in other color spaces that can be useful in some cases, like HSV (Hue, Saturation, Value), and LAB (where L represents the lightness value containing intensity information, while A and B contain the color information).

{{< figure src="/posts/hsv-segmentation/RGB-HSV.jpg" alt="" caption="" width="100%" class="right" >}}

One of the key advantages of HSV is its ability to separate color information (chroma) from intensity or lighting (luma). This separation enables constructing histograms or thresholding rules using only saturation and hue, which can be more robust against lighting changes in the value channel. Even by considering only the hue, a meaningful representation of the base color can be obtained, leading to better color thresholding compared to RGB.

Geometrically, the HSV color space can be envisioned as a cone or cylinder, with hue being the degree, saturation being the radius, and value being the height.


## Image Segmentation

To enhance the clarity of segmentation, we employ Contrast Limited Adaptive Histogram Equalization (CLAHE) for image enhancement. CLAHE focuses on enhancing contrast and improving visibility without compromising specific regions' brightness or darkness. It operates on the L channel of the LAB color space, dividing the images into small tiles, typically 8 by 8 pixels. By setting the contrast limit parameter to 1.0 within each tile, CLAHE ensures a more balanced distribution of pixel intensities across the histogram, particularly in regions with varying illumination conditions. This process enhances local contrast, making boundaries between different regions more distinct and prominent, thereby preparing the image for segmentation.

```python
def enhance_clahe(img, clip_limit=1.0, grid_size=(8, 8)):
    lab_img = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)
    clahe = cv2.createCLAHE(clipLimit=clip_limit, tileGridSize=grid_size)
    lab_img[:, :, 0] = clahe.apply(lab_img[:, :, 0])
    enhanced_img = cv2.cvtColor(lab_img, cv2.COLOR_LAB2BGR)
    return enhanced_img
```

One of CLAHE's strengths lies in its ability to perform bilinear interpolation at tile edges, effectively handling the corresponding tile borders. In the Figure below, we present a before-and-after comparison of an image before and after applying CLAHE. The original histogram (on the left) illustrates the distribution of pixel values, while the histogram after CLAHE (on the right) showcases a more balanced distribution with increased intensity variations. This shift indicates the enhanced contrast of the image post-CLAHE application.

{{< figure src="/posts/hsv-segmentation/enhanced_audi.png" alt="" caption="" width="100%" class="right" >}}

After enhancing the image, segmenting a specific color becomes notably simpler when transitioning from the RGB to the HSV color space. In our case, with the Audi car being predominantly green, we established the Hue, Saturation, and Value (HSV) parameters based on the boundaries of this green color range.

To accurately define the boundaries for segmentation, a helpful approach involves generating an HSV colormap. You can refer to [this resource][stackoverflow-ref] for guidance on determining the appropriate upper and lower HSV boundaries (limits). By referencing this colormap, users can effectively select their desired HSV ranges for segmentation, ensuring precise extraction of the target color.

{{< figure src="/posts/hsv-segmentation/hsv_explorer.png" alt="" caption="" width="100%" class="right" >}}

## Deployment with Flask and HTML Frontend

In addition to the Python tool discussed in this article, we have deployed the application using Flask, a lightweight web framework, with an HTML frontend to provide a user-friendly interface for image processing tasks.

For a live demonstration of the tool, please visit this [site][web-app] Please note that due to the free Render deployment's limitations, instances may spin down with inactivity, potentially causing delays of 50 seconds or more in processing requests.


## Conclusion

Color-based image segmentation is a powerful technique in computer vision with applications in various domains. By leveraging advanced techniques like Contrast Limited Adaptive Histogram Equalization (CLAHE) and the HSV color space, the Python tool presented in this article offers an efficient and accurate solution for automating image segmentation tasks. As technology continues to evolve, the importance of precise and robust image processing tools will only grow, paving the way for exciting advancements in computer vision and beyond.

{{< notice note "Note" >}}
The Python source code for the app is available in this [GitHub repository](https://github.com/ahmedsalim3/Color-Based-Image-Segmentation.git), and the deployed tool can be accessed [here](https://hsv-segmentation.onrender.com).
{{< /notice >}}

[stackoverflow-ref]: https://stackoverflow.com/a/48367205
[web-app]: https://hsv-segmentation.onrender.com