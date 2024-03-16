import cv2
import numpy as np

class Paint:
    def __init__(self):
        self.image = None
    def resize_crop(self,image):
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
    def k_means_segmentation(self,image):
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
    def clahe_color_correction(self,image):
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
    def oil_paint(self,image):
        self.image = image
        img = self.resize_crop(self.image)
        # Apply K-means segmentation
        segmented_edges = self.k_means_segmentation(img)
        # Apply CLAHE color correction
        color_corrected = self.clahe_color_correction(img)
        # Combine color-corrected image with segmented edges
        cartoon = cv2.bitwise_and(color_corrected, color_corrected, mask=segmented_edges)
        return cartoon
