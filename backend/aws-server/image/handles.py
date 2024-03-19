from Sketch import Sketch
import cv2
import numpy as np
def resize_crop(image):
    h, w, c = np.shape(image)
    if min(h, w) > 720:
        if h > w:
            h, w = int(720 * h / w), 720
        else:
            h, w = 720, int(720 * w / h)
    image = cv2.resize(image, (w, h), interpolation=cv2.INTER_AREA)
    h, w = (h // 8) * 8, (w // 8) * 8
    image = image[:h, :w, :]
    return image

img = cv2.imread('hp.jpg')
def sketch(img,blur,sharp):
    img = resize_crop(img)
    sketch = Sketch(blur_simga=blur,sharpen_value=sharp)
    for frame in [img]:
        frame = sketch(frame)
    return frame
img = sketch(img,3,10)
cv2.imshow('image', img)
cv2.waitKey(0)
