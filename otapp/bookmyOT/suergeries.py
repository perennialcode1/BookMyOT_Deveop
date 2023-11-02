
import requests
from django.contrib import messages
from .config import domain_name


def get_surgeries():
    Api = f'{domain_name.url}AllOTDetails'
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def surgery_details_edit(request, id):
    Details_result = None
    Details_URL = requests.get(f'{domain_name.url}OTSFullDetailsByid?caseid={id}').json()
    if Details_URL['Status'] == False:
        messages.info(request, 'Something went wrong please try again later..!')
    else:
        Details_result = Details_URL['ResultData']
        Surgeon_Id = Details_URL['ResultData']['surgonid']
        surgeon_dropdown_url = requests.get(f'{domain_name.url}getSurgeryTypes').json()
        surgeon_dropdown_data = surgeon_dropdown_url['ResultData']
        Details_result['surgeon_dropdown_data'] = surgeon_dropdown_data
        Details_result['specialityid'] = int(Details_URL['ResultData']['speciality'])

        speciality_dropdown = requests.get(f'{domain_name.url}GetPhysicianSpeciality').json()
        speciality_dropdown_data = speciality_dropdown['ResultData']
        Details_result['speciality_dropdown_data'] = speciality_dropdown_data

        surgeon_name_dropdown = requests.get(f'{domain_name.url}getSurgonslistByCaseid?caseid={id}').json()
        surgeon_name_dropdown_data = surgeon_name_dropdown['ResultData']
        Details_result['surgeon_name_dropdown_data'] = surgeon_name_dropdown_data
        if request.method == 'POST':
            caseid = request.POST.get('caseid')
            hosid = request.POST.get('hosid')
            casename = request.POST.get('casename')
            patientname = request.POST.get('patientname')
            age = request.POST.get('age')
            gender = request.POST.get('gender')
            surgeonname = request.POST.get('surgeon_name')
            surgerydate = request.POST.get('surgerydate')
            surgery = request.POST.getlist('surgery')
            casestatus = request.POST.get('casestatus')
            speciality = request.POST.get('speciality')
            pacstatus = request.POST.get('pacstatus')
            surgery_list = []
            for surgery_id in surgery:
                surgery_list.append(int(surgery_id))
            datetime_without_t = surgerydate.replace('T', ' ')
            datetime_str = datetime_without_t
            date_part, time_part = datetime_str.split(' ')

            # Split date components
            date_components = date_part.split('-')
            year = date_components[0]
            month = date_components[1]
            day = date_components[2]

            # Split time components
            time_components = time_part.split(':')
            hour = time_components[0]
            minute = time_components[1]

            final_date_time = day + '/' + month + '/' + year + ' ' + hour + ':' + minute
            url = f'{domain_name.url}UpdateOTDetails'
            data = {"inputdata": {"caseid": caseid, "patientname": patientname, "age": age, "gender": gender, "surgery": surgery_list, "patientdiagnostics": None,"speciality":speciality,"surgerydate": final_date_time,"casestatus":casestatus,"surgonid":surgeonname,"pacstatus":pacstatus,"casename":casename}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again Something Went Wrong..!')
            Api_Details = requests.get(f'{domain_name.url}OTSFullDetailsByid?caseid={id}').json()
            Details_result = Api_Details['ResultData']
            surgeon_dropdown_url = requests.get(f'{domain_name.url}getSurgeryTypes').json()
            surgeon_dropdown_data = surgeon_dropdown_url['ResultData']
            Details_result['surgeon_dropdown_data'] = surgeon_dropdown_data
            Details_result['specialityid'] = int(Details_URL['ResultData']['speciality'])
            
            speciality_dropdown = requests.get(f'{domain_name.url}GetPhysicianSpeciality').json()
            speciality_dropdown_data = speciality_dropdown['ResultData']
            Details_result['speciality_dropdown_data'] = speciality_dropdown_data

            surgeon_name_dropdown = requests.get(f'{domain_name.url}getSurgonslistByCaseid?caseid={id}').json()
            surgeon_name_dropdown_data = surgeon_name_dropdown['ResultData']
            Details_result['surgeon_name_dropdown_data'] = surgeon_name_dropdown_data
            return Details_result
    return Details_result

def physician_notes_edit(request, id):
    Physician_URL = requests.get(f'{domain_name.url}getPhysicianNotes?caseid={id}').json()
    if Physician_URL['Status'] == False:
        data = {"Age":'',"AnaethesiaPrice":'',"BloodPressure":'',"CaseId":id,"CaseName01":"","CaseNumber":"","Casename":"","ComorbidconditionsPrice":'',"EndTime":'',"Gender":"","HeartRate":'',"Note1":"","NoteDate":'',"Option":'',"":'',"PatientDiagnostics":"","PatientName":"","Phone":"","PreExisitngConditionPrice":'',"RespiratoryRate":'',"StartTime":'',"Temperature":'',"TotalCost":'',"apsamount":'',"caseid":id,"charges":'',"consultationamount":'',"documentpath":[],"endcasevital":[],"extratimeammount":'',"hosloc":"Vidhya nagar","hosname":"","otanaesthesia":'',"otpreexisitngcondition":'',"otsurgeries":'',"splsurgeryPrice":'',"tdsdeductions":'',"vitalprice":''}
        Physician_result = data
        return Physician_result
    else:
        Physician_result = Physician_URL['ResultData']
        return Physician_result

def patient_diagnostics_edit(request, id):
    Diagnostics_result = None
    Diagnostics_URL = requests.get(f'{domain_name.url}GetOTRegisterDetails?caseid={id}').json()
    Diagnostics_result = Diagnostics_URL['ResultData'][0]
    bp = str(Diagnostics_result['bloodpressure'])
    parts = bp.split('.')
    bp = parts[0]
    Diagnostics_result['bp'] = bp
    Pre_Exe_Con_URL = requests.get(f'{domain_name.url}GetPreExistingConditions').json()
    preexecon_dropdown_data = Pre_Exe_Con_URL['ResultData']
    Diagnostics_result['preexecon_dropdown_data'] = preexecon_dropdown_data
    
    if request.method =='POST':
        preexecon = request.POST.getlist('preexecon')
        bloodpressure = request.POST.get('bloodpressure')
        mpg = request.POST.get('mpg')
        gcs = request.POST.get('gcs')
        xray = request.POST.get('xray')
        ecg = request.POST.get('ecg')
        twodecho = request.POST.get('twodecho')
        string = bloodpressure
        parts = string.split('.')
        bp = parts[0]
        Diagnostics_result['bp'] = bp
        int(bp)

        if xray == 'on':
            xray = 1
        else:
            xray = 0
        if ecg == 'on':
            ecg = 1
        else:
            ecg = 0
        if twodecho == 'on':
            twodecho = 1
        else:
            twodecho = 0
        preexecon_list = []
        for pre_id in preexecon:
            preexecon_list.append(int(pre_id))
        url = f'{domain_name.url}insertAndUpdateOTRegisterDetails'
        data = {"inputdata": {"caseid":id, "preexistingconditions": preexecon_list, "temperature": "36", "heartrate": "23", "bloodpressure":(bloodpressure), "oxygensaturation": "21", "respiratoryrate": "47", "xray": xray, "ecg": ecg,"twodecho": twodecho,"gcs": gcs,"mpg": mpg}}
        result = requests.post(url, json = data)
        result_json = result.json()
        if result_json['Status'] == True:
            messages.success(request, 'Updated successfull..!')
            Diagnostics_result['bp'] = bp
        else:
            messages.error(request, 'Try Again SomethingWent Wrong..!')
        Diagnostics_URL = requests.get(f'{domain_name.url}GetOTRegisterDetails?caseid={id}').json()
        Diagnostics_result = Diagnostics_URL['ResultData'][0]
        Diagnostics_result['bp'] = bp

        Pre_Exe_Con_URL = requests.get(f'{domain_name.url}GetPreExistingConditions').json()
        preexecon_dropdown_data = Pre_Exe_Con_URL['ResultData']
        Diagnostics_result['preexecon_dropdown_data'] = preexecon_dropdown_data
        return Diagnostics_result
    return Diagnostics_result
