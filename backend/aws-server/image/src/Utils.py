import base64
import cv2
from PIL import Image
from io import BytesIO
import torchvision.transforms as transforms
from torch.autograd import Variable
import numpy as np
import torch
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
def format_base64(base64_string,type):
    # Remove the prefix if it exists (e.g., 'data:image/jpeg;base64,')
    image_format = base64_string.split(';')[0].split('/')[1]
    if base64_string.startswith('data:image'):
        base64_string = base64_string.split('base64,')[1]
    # Decode the base64 string into binary data
    image_data = base64.b64decode(base64_string)
    if type == "cv2":
        # Convert the binary data to a NumPy array
        np_arr = np.frombuffer(image_data, np.uint8)
        # Decode the NumPy array into an image
        image = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    elif type == "PIL":
        image_bytes = BytesIO(image_data)
        image = Image.open(image_bytes)
    return image, image_format
def convert_to_base64(image,format,type):
    if type == "PIL":
        buffered = BytesIO()
        image.save(buffered, format=format.upper())
        buffered.seek(0)
        img_byte = buffered.getvalue()
        img_str = "data:image/{};base64,".format(format) + base64.b64encode(img_byte).decode('utf-8')
        return img_str
    elif type == "cv2":
        if format == "jpeg":
            re_format = ".jpg"
        elif format == "png":
            re_format = ".png"
        _ , buffer = cv2.imencode(re_format,image)
        img_data = buffer.tobytes()
        img_str = "data:image/{};base64,".format(format) + base64.b64encode(buffer).decode('utf-8')
        return img_str
def cartoonify(model,input_image,load_size=450,gpu=0):
    if gpu > -1:
        model.cuda()
    else:
        model.float()
    # resize image, keep aspect ratio
    input_image = input_image.convert('RGB')
    h = input_image.size[0]
    w = input_image.size[1]
    ratio = h *1.0 / w
    if ratio > 1:
        h = load_size
        w = int(h*1.0/ratio)
    else:
        w = load_size
        h = int(w * ratio)
    # load image
    input_image = input_image.resize((h, w), Image.BICUBIC)
    input_image = np.asarray(input_image)
	# RGB -> BGR
    input_image = input_image[:, :, [2, 1, 0]]
    input_image = transforms.ToTensor()(input_image).unsqueeze(0)
	# preprocess, (-1, 1)
    input_image = -1 + 2 * input_image
    if gpu > -1:
        input_image = Variable(input_image, volatile=True).cuda()
    else:
        input_image = input_image.float()  # Variable(input_image).float()

    with torch.no_grad():
        output_image = model(input_image)
        output_image = output_image[0]
	# BGR -> RGB
    output_image = output_image[[2, 1, 0], :, :]
	# deprocess, (0, 1)
    output_image = output_image.data.cpu().float() * 0.5 + 0.5
    output_image = output_image.numpy()
    output_image = np.uint8(output_image.transpose(1, 2, 0) * 255)
    output_image = Image.fromarray(output_image)
    return output_image
def animeGan(model,image):
    image = resize_crop(image)
    for frame in [image]:
        frame = model(frame)
    return frame