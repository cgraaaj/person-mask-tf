# Vision Pipeline

## Framework Used
### Model Development & Deployment
For model development and deployment, I’ve used TensorFlow with Keras as the backend.
### API Development
For exposing the built model as a service, I’ve used Django and Django rest framework. For documenting the API with request and response schema, I’ve used Swagger.
### Libraries Used 
requirements.txt contains all the dependencies required for the project.

### Model Architecture Used
  1.	To Person Detect - YOLO model is used.
  2.	Face Detection (Optional Can be configured in settings.py) to boost Person detection Confidence - MTNN model is used.
  3.	Mask Detection - Transfer learning from MobileNetV2 is applied.
  
## Training Mask Detection
`train/` contains the MobileNet model backed transfer learning, with Mask Net dataset.   80% data is used for training and 20% is used for validation. Peak performance of the model observed is 98% accuracy. After training the model’s weights are stored as h5 for ease of API deployment.
YOLO model weights trained with COCO dataset is also loaded and saved as h5 enabling faster API deployment. MTCNN package available from PyPI comes with weights inbuilt, so no further processing is required.

## Resource Allocation
Since this is a GPU intensive application, GPU resource sharing should be optimized. Comparing the architectures of YOLO and Mask detection, Mask detection model might require less GPU resource. So, using TensorFlow’s configuration, I’ve opted to set memory growth parameter to True. This ensures that GPU is only allocated only when required and is freed when the response is consumed.
  
## Loading the models to memory
Both the model’s weights are loaded on the server’s memory on start-up of the API server. This saves the throughput of the system by loading the model only once and not for each request as loading the model is a memory-intensive process.
## Approach
The model analyses the given image if it contains a person. If a person is detected, the model then predicts if the person is wearing a mask.
 
## Figure 1 Flow of API

![flow](flow.png)

When a new valid request comes in,
* Person detect is invoked to check if the input image contains at least one person. If no person is detected. API responds with status 200, No person found. (No further processing is carried out).
 * If at least one person is detected, For each person,
    ** If USE_MTCNN is set to True, Face Detection is carried out to check if the person detected has a valid human face. If No face is detected, API responds with the message No person found. Else Confidence is set to the product of confidence returned by MTCNN and that returned with YOLO.
  	** Then for each person, Mask Net is invoked to check if the person is a wearing mask.
  * YOLO model and MTCNN model returns bounding box information as well if we want to process the image further on the client-side.

## Packing and Deployment
The Django app is set up such that no additional steps are required to deploy the application on the server. The application is self-serviced, i.e. All the additional files required for running the application is auto-downloaded if a local version of the file is not present. The API application is production-ready and can be deployed as a standalone application or through docker. TensorFlow provides a container with TensorFlow GPU and NVidia drivers preinstalled and be used to run the application. From the base docker image, we can install the libraries (from requirements.txt) this API server uses and build our container and deploy it anywhere.
CI/CD deployment.

This API application is built with Test-Driven Approach. This ensures that each API method is tested on how the response behaviour changes for each valid and invalid request. CI/CD pipeline is set up with the config file available at .github/workflows/Django.yml. This ensures reliability and ease of Deployment of the code changes to production with trust.


##  Sample Screens
 
### Figure 2 API Documentation
![demo_1](demo_1.png)
 
### Figure 3 API response when 1 person is present in Image
![demo_2](demo_2.png)
 
### Figure 4 API Response when multiple persons are detected in the Image
![demo_3](demo_3.png)
 
### Figure 5 API response when no persons are detected in the Image
![demo_4](demo_4.png)

