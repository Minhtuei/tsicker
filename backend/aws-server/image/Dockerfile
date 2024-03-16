FROM public.ecr.aws/lambda/python:3.11

# COPY requirements.txt .
COPY requirements.txt ${LAMBDA_TASK_ROOT}

# Install the function's dependencies using file from your Python environment
RUN pip install -r requirements.txt

# Copy function code
COPY src/* ${LAMBDA_TASK_ROOT}
CMD ["handler.lambda_handler"]