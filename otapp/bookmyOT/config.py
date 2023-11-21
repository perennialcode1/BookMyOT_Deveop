
from django.shortcuts import redirect
import requests
from django.contrib import messages

class domain_name:
    url = "http://bookmyotservice.pythonanywhere.com/"

# class domain_name_faqs:
#     url = 'http://127.0.0.1:5000/'




# Views starts from here

def config_speciality_get():
    Api = (f'{domain_name.url}GetPhysicianSpeciality')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_surgery_get():
    Api = (f'{domain_name.url}getSurgeryTypes')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_anetsthesia_get():
    Api = (f'{domain_name.url}GETAnesthesiaType')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_pre_existing_get():
    Api = (f'{domain_name.url}GetPreExistingConditions')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_ot_equpiment_get():
    Api = (f'{domain_name.url}GetOTEquipment')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_post_specialist(request):
    if request.method == 'POST':
        sid = request.POST.get('hdnspecialityId')
        code = request.POST.get('specilatyCode')
        name = request.POST.get('specialityName')
        desc = request.POST.get('specialityDescription')
        data = {"inputdata":{"name": name,"id": sid, "code":code, "description": desc}}
        url = (f'{domain_name.url}PhysicianSpecialityInsertAndUpdate')
        a = requests.post(url, json = data)
        messages.success(request, 'Speciality edited successfully..')

        Api = f'{domain_name.url}GetPhysicianSpeciality'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result

def add_speciality_form(request):
    if request.method == 'POST':
        code = request.POST.get('specilatyCode')
        name = request.POST.get('specialityName')
        desc = request.POST.get('specialityDescription')
        data = {"inputdata":{"name": name,"id": 0, "code": code, "description": desc}}
        url = (f'{domain_name.url}PhysicianSpecialityInsertAndUpdate')
        a = requests.post(url, json = data)
        messages.success(request, 'Speciality added successfully..')
        return data

def config_speciality_deletebtn(request, id):
    url =(f'{domain_name.url}deletePhysicianSpecialtyTypes')
    xyz = {"inputdata": {"id": id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Speciality deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    # Api = (f'{domain_name.url}GetPhysicianSpeciality')
    # ApiData = requests.get(Api).json()
    # if ApiData['Status'] == True:
    #     return ApiData['ResultData']
    # return redirect('config_speciality_list')
    return xyz

def config_post_surgery(request):
    if request.method == 'POST':
        sid = request.POST.get('hdnsurgeryId')
        code = request.POST.get('surgeryCode')
        name = request.POST.get('surgeryName')
        stype = request.POST.get('surgeryType')
        stypehdn = request.POST.get('surgeryTypehdn')
        price = request.POST.get('surgeryPrice')
        desc = request.POST.get('surgeryDesc')
        x = ''
        if stype != '':
            x = stype
        else:
            if stypehdn == 'Highly Skilled Surgery':
                x = '3'
            elif stypehdn == 'Super Specialty':
                x = '2'
            else:
                x = '1'

        data = {"inputdata":{"name": name, "description": desc, "type": x,"price":price, "surgerytypeid":sid, 'code' :code}}
        url = (f'{domain_name.url}insertAndUpdateSurgeryTypes')
        a = requests.post(url, json = data)
        messages.success(request, 'Surgery edited successfully..')

        Api = f'{domain_name.url}getSurgeryTypes'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result

def add_surgery_form(request):
    if request.method == 'POST':
        sid = request.POST.get('hdnsurgeryId')
        code = request.POST.get('surgeryCode')
        name = request.POST.get('surgeryName')
        price = request.POST.get('surgeryPrice')
        type = request.POST.get('surgeryType')
        desc = request.POST.get('surgeryDesc')
        data = {"inputdata":{"name":name, "description":desc, "type":type, "price":price, "surgerytypeid":0, 'code':code}}
        url = (f'{domain_name.url}insertAndUpdateSurgeryTypes')
        a = requests.post(url, json = data)
        messages.success(request, 'Surgery added successfully..')
    return data

def config_surgery_deletebtn(request, id):
    url =(f'{domain_name.url}deleteSurgeryTypes')
    xyz = {"inputdata": {"surgerytypeid":id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Suregery deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('config_surgery_list')

def add_anesthesia_form(request):
    if request.method == 'POST':
        aid = request.POST.get('hdnAnesthesiaId')
        code = request.POST.get('anesthesiaCode')
        name = request.POST.get('anesthesiaName')
        price = request.POST.get('anesthesiaPrice')
        desc = request.POST.get('anesthesiaDesc')
        data = {"inputdata": {"price":price, "name": name, "description": desc,"anesthesiatypeid":0, 'code': code}}
        url = (f'{domain_name.url}insertAndUpdateAnesthesiaType')
        a = requests.post(url, json = data)
        messages.success(request, 'Anesthesia added successfully..')
    return data

def config_post_anesthesia(request):
    if request.method == 'POST':
        aid = request.POST.get('hdnanesthesiaId')
        code = request.POST.get('anesthesiaCode')
        name = request.POST.get('anesthesiaName')
        price = request.POST.get('anesthesiaPrice')
        desc = request.POST.get('anesthesiaDesc')
        data = {"inputdata": {"price":price, "name": name, "description": desc,"anesthesiatypeid":aid, 'code': code}}
        url = (f'{domain_name.url}insertAndUpdateAnesthesiaType')
        a = requests.post(url, json = data)
        messages.success(request, 'Anesthesia updated successfully..')

        Api = f'{domain_name.url}GETAnesthesiaType'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result
    
def config_anesthesia_deletebtn(request, id):
    url =(f'{domain_name.url}deleteAnesthesiaType')
    xyz = {"inputdata": {"anesthesiatypeid":id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Anesthesia deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('config_anetsthesia_list')


def add_pre_existing_condition_form(request):
    if request.method == 'POST':
        aid = request.POST.get('hdnPreExConId')
        code = request.POST.get('preExConCode')
        name = request.POST.get('preExConName')
        type = request.POST.get('preExConType')
        desc = request.POST.get('preExConDesc')
        data = {"inputdata": {"name": name, 'code': code, "description": desc, "type": int(type),"preexistingconditionid": 0}}
        url = (f'{domain_name.url}insertAndUpdatePreExistingConditions')
        a = requests.post(url, json = data)
        messages.success(request, 'Pre Existing Condition added successfully..')
    return data

def config_post_config_pre_Existing(request):
    if request.method == 'POST':
        pid = request.POST.get('hdnPreExConId')
        code = request.POST.get('preExConCode')
        name = request.POST.get('preExConName')
        typeval = request.POST.get('preExConType')
        desc = request.POST.get('preExConDesc')
        url = (f'{domain_name.url}insertAndUpdatePreExistingConditions')
        data = {"inputdata": {"code": code, "name": name, "description": desc, 'type': int(typeval),"preexistingconditionid":pid}}
        a = requests.post(url, json = data)
        messages.success(request, 'Pre Existing Condition edited successfully..')

        Api = f'{domain_name.url}GetPreExistingConditions'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result
    
def config_pre_existing_condition_deletebtn(request, id):
    url =(f'{domain_name.url}deletePreExistingConditions')
    xyz = {"inputdata": {"preexistingconditionid":id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Pre Existing Condition deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('config_anetsthesia_list')

def add_equipment_form(request):
    if request.method == 'POST':
        # eid = request.POST.get('hdnEquipmentId')
        code = request.POST.get('equipmentCode')
        name = request.POST.get('equipmentName')
        desc = request.POST.get('equipmentDesc')
        data = {"inputdata":{"code":code,"name":name,"description":desc}}
        url = (f'{domain_name.url}OTEquipmentInsert')
        a = requests.post(url, json = data)
        messages.success(request, 'Equipment added successfully..')
    return data

def config_post_equipment_list(request):
    result = None
    if request.method == 'POST':
        eid = request.POST.get('hdnEquipmentId')
        code = request.POST.get('equipmentCode')
        name = request.POST.get('equipmentName')
        desc = request.POST.get('equipmentDesc')
        data = {"inputdata":{"code":code,"name":name, "description":desc,"equid":eid}}
        url = (f'{domain_name.url}OTEquipmentUpdate')
        a = requests.post(url, json = data)
        messages.success(request, 'Equipment edited successfully..')

        Api = f'{domain_name.url}GetOTEquipment'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result

    
def config_equipment_deletebtn(request, id):
    url =(f'{domain_name.url}OTEquipmentDelete')
    xyz = {"inputdata":{"equid":id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Equipment deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('config_ot_equipment_list')

def config_noti_post(request):
    if request.method == 'POST':
        title = request.POST.get('title')
        message = request.POST.get('message')
        data = {"inputdata":{"title": title, "message": message}}
        url = (f'{domain_name.url}sendNotificationtoAllActivePhysicians')
        a = requests.post(url, json = data)
        messages.success(request, 'Notification sent successfully..')
        return data

def config_noti_get():
    Api = (f'{domain_name.url}GetAllPhysicianNotificationData')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData['ResultData']

def config_images_get():
    Api = (f'{domain_name.url}More/SlidingImages')
    Api1 = (f'{domain_name.url}More/HospitalSlidingImages')
    ApiData = requests.get(Api).json()
    ApiData1 = requests.get(Api1).json()
    context = {
        'data': ApiData['ResultData'],
        'data1': ApiData1['ResultData'],
    }
    return context

# from .forms import ImageUploadForm
def config_images_add_form(request):
    if request.method == 'POST':
        video_link = request.POST.get('videolink')
        portal = request.POST.get('rdoImageTypep')
        app = request.POST.get('rdoImageTypeh')
        image = request.FILES['file']
        if portal == 'on':
            url = (f'{domain_name.url}More/HospitalSlidingImages')
            files = {'pic': image.file}
            data = {
                'youtubelink': video_link,
                'id': 0,
                }
            a=requests.post(url, files = files, data = data)
            print(a.json())
            messages.success(request, 'Added Successfully')
            return data
        else:
            imgurl = (f'{domain_name.url}More/SlidingImages')
            files = {'pic': image.file}
            data = {
                'youtubelink': video_link,
                'id': 0,
                }
            a=requests.post(imgurl, files = files, data = data)
            print(a.json())
            messages.success(request, 'Added Successfully')
            return data
    Late_Api = f'{domain_name.url}More/HospitalSlidingImages'
    Late_ApiData = requests.get(Late_Api).json()
    result = Late_ApiData['ResultData']
    return result

def config_image_deletebtn(request, id):
    url =(f'{domain_name.url}deleteSlidingImages')
    xyz = {"inputdata": {"id": id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.success(request, 'Image deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('config_images')

def config_settings_get():
    Api = (f'{domain_name.url}GetAdminSettings')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def config_settings_post(request):
    if request.method == 'POST':
        sid = request.POST.get('hdnSettingsId')
        value = request.POST.get('settingsValue')
        data = {"inputdata":{"value":value,"typeid":sid}}
        url = (f'{domain_name.url}UpdateAdminSettings')
        a = requests.post(url, json = data)
        messages.success(request, 'Settings edited successfully..')

        Api = f'{domain_name.url}GetAdminSettings'
        ApiData = requests.get(Api).json()
        result = ApiData['ResultData']
        return result
    
