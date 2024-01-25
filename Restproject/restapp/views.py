from django.shortcuts import render,redirect
from django.http import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from .serializers import TodoSerializers
import requests
from .models import Todo
from django.shortcuts import get_object_or_404



# Create your views here.
def home(req):
   
    return render(req,'index.html')

@csrf_exempt
def addTodo(req):

    if req.method=='POST':
       data=JSONParser().parse(req)
       resp=TodoSerializers(data=data)
       print("responce",resp)
       if resp.is_valid():
           resp.save()
           return JsonResponse(resp.data,status=status.HTTP_201_CREATED)
       else:
           return JsonResponse(resp.data,status=status.HTTP_404_NOT_FOUND)

def display(req):
    if req.method=='GET':
        data=Todo.objects.all()
        se=TodoSerializers(data=data,many=True)
        if se.is_valid():
             print(se.data)
        return JsonResponse(se.data,safe=False)
@csrf_exempt
def delete_todo(req,id):
    
    if req.method=='DELETE':
            print("hai")
            data=get_object_or_404(Todo,id=id)
            data.delete()
            
            
            return JsonResponse({},status=status.HTTP_202_ACCEPTED)

def update(req,id):
    try:
        todo = get_object_or_404(Todo, id=id)
    except Todo.DoesNotExist:
        return JsonResponse({'error': 'Todo not found'}, status=status.HTTP_404_NOT_FOUND)
    
    if req.method == 'PUT':
        data = JSONParser().parse(req)
        serializer = TodoSerializers(data, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    return render(req,'form.html')