# Import the necessary library for making HTTP requests
import requests
from .config import domain_name
from django.contrib import messages

# Define a function called 'dashboard'
def dashboard():
    # Make an HTTP GET request to the specified URL and parse the response as JSON
    data = requests.get(f'{domain_name.url}DashBoardCount').json()
    
    # Check if the 'Status' key in the JSON data is False
    if data['Status'] == False:
        # If 'Status' is False, create a dictionary with default values
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
            'TotalDutyCall':0
        }
    else:
        # If 'Status' is True, create an empty dictionary
        dict = {}
        
        # Iterate over the 'ResultData' list in the JSON data
        for i in data['ResultData']:
            # Remove spaces from the 'role' key to create dictionary keys
            role = i['role'].replace(' ', '')
            
            # Assign the 'count' value to the corresponding key in the dictionary
            dict[role] = i['count']
    
    # Return the created dictionary as the result of the 'dashboard' function
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
