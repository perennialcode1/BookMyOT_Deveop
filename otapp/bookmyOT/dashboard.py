# Import the necessary library for making HTTP requests
import requests
from .config import domain_name
from django.contrib import messages
import datetime

def dashboard():
    data = requests.get(f'{domain_name.url}DashBoardCount').json()
    current_date = datetime.date.today()
    activities_data = requests.get(f'{domain_name.url}GetActivities?status=0&date=2023-11-03').json()
    reports_data_phy = requests.get(f'{domain_name.url}GetRegistrationReportsOnDate?status=1&date={current_date}').json()
    reports_data_hos = requests.get(f'{domain_name.url}GetRegistrationReportsOnDate?status=2&date={current_date}').json()

    if data['Status'] == False:
        dict = {
            'CODEBLUE': 0,
            'Completed Cases': 0,
            'DAYDUTYCAL': 0,
            'DoctorsCount': 0,
            'HospitalCount': 0,
            'ICUDUTYCALL': 0,
            'NIGHTDUTYCALL': 0,
            'PendingCases': 0,
            'Todays appointments': 0,
            'Todays OTs': 0,
            'TotalCases': 0,
            'Upcoming Cases': 0,
            'TotalDutyCall':0,
            'TodayPhysicians' :0,
            'TodayHospitals':0,
        }
    else:
        dict = {}
        for i in data['ResultData']:
            role = i['role'].replace(' ', '')
            dict[role] = i['count']
            dict['activities'] = activities_data['ResultData']
            dict['reportsphy'] = reports_data_phy['ResultData']
            dict['reportshos'] = reports_data_hos['ResultData']
    return dict

def send_notification_to_all_hosp(request):
    if request.method == "POST":
        title = request.POST.get('hosTitle')
        message = request.POST.get('hosMessage')
        data = {"inputdata":{"title": title, "message": message}}
        url = (f'{domain_name.url}sendNotificationtoAllActivePhysicians')
        a = requests.post(url, json = data)
        messages.success(request, 'Notification sent successfully to all Hospitals..')
        return data

def send_notification_to_all_phys(request):
    if request.method == "POST":
        title = request.POST.get('phyTitle')
        message = request.POST.get('phyMessage')
        data = {"inputdata":{"title": title, "message": message}}
        url = (f'{domain_name.url}sendNotificationtoAllActivePhysicians')
        a = requests.post(url, json = data)
        messages.success(request, 'Notification sent successfully to all Physicians..')
        return data
