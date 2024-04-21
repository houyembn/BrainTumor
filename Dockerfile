# Use an official Python runtime as a base image
FROM python:3.9.2

# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3-opencv \
    libgl1-mesa-glx

# Set the working directory in the container
WORKDIR /app

# Copy the Flask app source code to the container
COPY . /app

# Install any dependencies required by your Flask app
RUN pip install  -r requirements.txt

# Expose the port that Flask runs on
EXPOSE 5000

# Specify the command to run your Flask app when the container starts
CMD ["python", "app.py"]