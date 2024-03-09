import cv2
import numpy as np
from Sketch import Sketch
from Cartoonify import cartoonify
from AnimeGan import AnimeGAN

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

def k_means_segmentation(image):
    h, w, c = np.shape(image)
    flattened_img = image.reshape((-1, c))

    # Convert to float32 for k-means
    flattened_img = np.float32(flattened_img)

    # Define criteria and apply kmeans()
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 100, 0.2)
    k = 2  # You can adjust the number of clusters as needed
    _, labels, centers = cv2.kmeans(flattened_img, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)

    # Convert back to 8-bit values
    centers = np.uint8(centers)

    # Map the labels to the centers
    segmented_img = centers[labels.flatten()]

    # Reshape back to the original image shape
    segmented_img = segmented_img.reshape((h, w, c))

    # Convert to grayscale for further processing
    segmented_gray = cv2.cvtColor(segmented_img, cv2.COLOR_BGR2GRAY)

    return segmented_gray

def clahe_color_correction(image):
    # Convert to LAB color space
    lab = cv2.cvtColor(image, cv2.COLOR_BGR2LAB)

    # Split the LAB image into L, A, and B channels
    l, a, b = cv2.split(lab)

    # Apply CLAHE to the L channel
    clahe = cv2.createCLAHE(clipLimit=3.0, tileGridSize=(8, 8))
    cl = clahe.apply(l)

    # Merge the CLAHE-enhanced L channel with the original A and B channels
    limg = cv2.merge((cl, a, b))

    # Convert back to BGR color space
    color_corrected = cv2.cvtColor(limg, cv2.COLOR_LAB2BGR)

    return color_corrected

def oil_paint(image_path):
    img = cv2.imread(image_path)

    # Resize and crop the image
    resized_img = resize_crop(img)

    # Apply K-means segmentation
    segmented_edges = k_means_segmentation(resized_img)

    # Apply CLAHE color correction
    color_corrected = clahe_color_correction(resized_img)

    # Combine color-corrected image with segmented edges
    cartoon = cv2.bitwise_and(color_corrected, color_corrected, mask=segmented_edges)

    # Display the oil_paintd image
    cv2.imwrite('oil_paint.jpg', cartoon)
    cv2.waitKey(0)
    cv2.destroyAllWindows()


def sketch(image, blur_simga=30, sharpen_value=5):
    sketch = Sketch(blur_simga=blur_simga, sharpen_value=sharpen_value)
    image = resize_crop(image)
    for frame in [image]:
        frame = sketch(frame)
    cv2.imwrite('sketch.jpg', frame)
# sketch(cv2.imread('imgs/mn.jpg'))

def cartoon(image,group,style):
    if group == 'cartoonify':
        cartoonify(input_image=image, style=style,gpu=-1)
    elif group == 'animegan':
        animegan = AnimeGAN("models/Shinkai_53.onnx")
        image = resize_crop(image)
        for frame in [image]:
            frame = animegan(frame)
        cv2.imwrite('cartoon.jpg', frame)
    
class A:
    def who_am_i(self):
        print("A")
class B():
    def w(self):
        pass
class C():
    def who_am_i(self):
        print("C")
class D(A,B):
    def meth(self):
        print(self)
        self.who_am_i()
class E(C, A):
    def w(self):
        pass
class F(D, E,B):
    def w(self):
        pass
y=0
for x in range(5):
    if x == 5: break
    y += 1
else: print(y)
def square(f):
    def wrap(x):
        return f(x)**2
    return wrap
@square
def double(x):
    return x*2
print(double(3)) # result is 36