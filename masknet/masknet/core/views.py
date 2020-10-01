from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from masknet.core import serializers
from rest_framework.parsers import FormParser, MultiPartParser
from django.core.files.storage import FileSystemStorage


# Create your views here.



class PredictAPI(GenericAPIView):
    serializer_class = serializers.PredictSerializer
    parser_classes = ((FormParser, MultiPartParser))

    def get(self, request, *args, **kwargs):
        result = dict()
        result['status'] = True
        result['message'] = "Please use post method to get Prediction"
        return Response(result)

    def post(self, request, *args , **kwargs):
        result = dict()
        s = self.get_serializer(data = request.data)
        if s.is_valid():
            result['status'] = True
            fs = FileSystemStorage()
            myfile = s.validated_data['input_img']
            filename = fs.save(myfile.name, myfile)
            uploaded_file_url = fs.url(filename)
            
        return Response(result)