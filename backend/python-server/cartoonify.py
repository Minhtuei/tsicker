import torch
import os
import numpy as np
import argparse
from PIL import Image
import torchvision.transforms as transforms
from torch.autograd import Variable
import torchvision.utils as vutils
from network.Transformer import Transformer

def cartoonify(image,style,load_size=450,gpu=0):
    # load pretrained model
    model = Transformer()
    model.load_state_dict(torch.load(os.path.join(opt.model_path, opt.style + '_net_G_float.pth')))
    model.eval()
    if gpu > -1:
        model.cuda()
    else:
        model.float()
    # load image
    input_image = Image.open(image).convert("RGB")
