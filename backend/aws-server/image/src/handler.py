# # Define imports
# try:
#     import unzip_requirements
# except ImportError:
#     pass
import json
from Transformer import Transformer
from AnimeGan import AnimeGAN
from Paint import Paint
from Utils import *
import boto3
import torch
import torchvision.transforms as transforms
from torch.autograd import Variable
import torchvision.utils as vutils
import onnxruntime as ort

s3 = boto3.client('s3')
bucket = "cartoonify"
mapping_name_to_model = {
    "Hosoda": "Hosoda_net_G_float.pth",
    "Hayao 1": "Hayao_net_G_float.pth",
    "Paprika 1": "Paprika_net_G_float.pth",
    "Shinkai 1": "Shinkai_net_G_float.pth",
    "Hayao 2": "Hayao-60.onnx",
    "Hayao 3": "Hayao_64.onnx",
    "Paprika 2": "Paprika_54.onnx",
    "Shinkai 2": "Shinkai_53.onnx",
    "Oil Paint": "OilPainting.onnx",
}

def image_handler(img):
    img_url = img["url"]
    img_theme = img["theme"]
    img_sketch = img["sketch"]
    if mapping_name_to_model.get(img_theme).endswith(".pth"):
        img_url,img_format = format_base64(img_url, "PIL")
    elif mapping_name_to_model.get(img_theme).endswith(".onnx"):
        img_url,img_format = format_base64(img_url, "cv2")
    else:
        raise ValueError("Invalid model")
    return img_url,img_format, img_theme, img_sketch
def load_model(s3,bucket, img_theme):
    loaded_model = None
    model_file = mapping_name_to_model.get(img_theme)
    if model_file:
        if model_file.endswith(".pth"):
            model = Transformer()
            response = s3.get_object(Bucket=bucket, Key="models/{}".format(model_file))
            state = torch.load(BytesIO(response['Body'].read()))
            model.load_state_dict(state)
            model.eval()
            loaded_model = model
        elif model_file.endswith(".onnx"):
            if model_file == "OilPainting.onnx":
                model = Paint()
                loaded_model = model
            else:
                response = s3.get_object(Bucket=bucket, Key="models/{}".format(model_file))
                model_bytes = response['Body'].read()
                providers = ['CUDAExecutionProvider'] if ort.get_device() == "GPU" else ['CPUExecutionProvider']
                ort_session = ort.InferenceSession(model_bytes, providers=providers)
                model = AnimeGAN(ort_session)
                loaded_model = model
        return loaded_model
    else:
        raise ValueError("Invalid model")
def lambda_handler(event, context):
    """
    lambda handler to execute the image transformation
    """
    # warming up the lambda
    if event.get("source") in ["aws.events", "serverless-plugin-warmup"]:
        print('Lambda is warm!')
        return {}
    try:
        if event.get("body") is not None:
            img = json.loads(event["body"])
            img_url,img_format, img_theme, img_sketch = image_handler(img)
        else:
            img_url,img_format, img_theme, img_sketch = image_handler(event)   
        model = load_model(s3,bucket, img_theme)
        output_image = None
        if type(model) == Transformer:
            output_image = cartoonify(model=model, input_image=img_url,gpu=-1)
            output_image = convert_to_base64(output_image,img_format,"PIL") 
        elif type(model) == AnimeGAN:
            output_image = animeGan(model=model, image=img_url)
            output_image = convert_to_base64(output_image,img_format,"cv2")
        elif type(model) == Paint:
            output_image = model.oil_paint(img_url)
            output_image = convert_to_base64(output_image,img_format,"cv2")
        return {
                'statusCode': 200,
                'body': json.dumps({
                    "success": True,
                    "imageURL": output_image
                }),
            }


    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({
                "success": False,
                "error": str(e)
            }),
        }
