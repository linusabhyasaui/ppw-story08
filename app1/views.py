from django.http import JsonResponse
from django.http import response
from django.shortcuts import render
import urllib3
from json import loads


def index(request):
    context = {'page_title': 'API'}
    return render(request, 'index.html', context)


def search(request):
    http = urllib3.PoolManager()
    responses = http.request(
        'GET', "https://www.googleapis.com/books/v1/volumes?" + request.GET.urlencode())
    context = loads(responses.data.decode('utf-8'))

    return JsonResponse(context)
