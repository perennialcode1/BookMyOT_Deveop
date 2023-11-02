
import requests
from .config import domain_name
from django.contrib import messages

def duties_list_get(request):
    Duties_URL = requests.get(f'{domain_name.url}GetAllDutys').json()
    if Duties_URL['Status'] == False:
        messages.info(request, 'Something went wrong..!')
    else:
        duties_result = Duties_URL['ResultData']
        return duties_result
    

