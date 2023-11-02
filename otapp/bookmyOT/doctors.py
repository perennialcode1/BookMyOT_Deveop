
from django.shortcuts import redirect, render
import requests
from django.contrib import messages
from .config import domain_name



def get_All_Doctors_List():
    Api = (f'{domain_name.url}PhysicianList?status=2')
    ApiData = requests.get(Api).json()
    if ApiData['Status'] == True:
        return ApiData['ResultData']
    return ApiData

def doctors_filter_list(request):
    if request.method == 'POST':
        status = request.POST.get('status')
        print(status)
        data = requests.get(f'{domain_name.url}PhysicianList?status={status}').json()
        return data 

def doc_send_noti(request):
    if request.method == 'POST':
        hdnPnum = request.POST.get('hdnPnum')
        noti_title = request.POST.get('notiTitle')
        noti_message = request.POST.get('notiMessage')
        # Api_Noti = requests.get(f'{domain_name.url}sendNotificationtoSelectedPhysicians').json()
        data = {
            "inputdata":
            {
                "title": noti_title,
                "message": noti_message,
                "pnum":hdnPnum
            }
        }
        Api_Noti = f'{domain_name.url}sendNotificationtoSelectedPhysicians'
        a = requests.post(Api_Noti, json = data)
        messages.success(request, 'Notification sent successfully..')
        return data

def doctors_deletebtn(request, id):
    url =''
    xyz = {"ResultData": {"phyid":id}}
    result = requests.post(url, json=xyz)
    result_json = result.json()
    if result_json['Status'] == True:
        messages.info(request, 'user deleted successfully...!')
    else:
        messages.error(request, 'Try Again SomethingWent Wrong..!')
    return redirect('doctors')

# def adddoctos(request):
#     url = '{domain_name.url}PersonalDetails?pnum=P230085'
#     if request.method == 'POST':
#         hospitalname = request.POST.get('hospitalname')
#         name = request.POST.get('username')
#         mobile = request.POST.get('mobile')
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         confirmpassword = request.POST.get('confirmpassword')
#         if password == confirmpassword:
#             data = {"inputdata": {"hospitalname" : hospitalname,"mobile" : mobile,"email" : email,"username" : name,"psw" : password}}
#             requests.post(url, json = data)
#         return data

# address_result = None
# profile_result = None
# kyc_result = None


def doctors_profile_edit(request, id):
    profile_result = None
    Api_Profile = requests.get(f'{domain_name.url}PersonalDetails?pnum={id}').json()
    if Api_Profile['Status'] == False:
        pass
    else:
        gen_out = ''
        marr_out = ''
        profile_result = Api_Profile['ResultData'][0]

        speciality_dropdown = requests.get(f'{domain_name.url}GetPhysicianSpeciality').json()
        speciality_dropdown_data = speciality_dropdown['ResultData']
        profile_result['speciality_dropdown_data'] = speciality_dropdown_data
        # profile_result['specialityid'] = int(Api_Profile['ResultData'][0]['speciality'])
        if request.method == "POST":
            funame = request.POST.get('fullname')
            con = request.POST.get('contact')
            email = request.POST.get('email')
            gender = request.POST.get('gender')
            dob = request.POST.get('dob')
            marr = request.POST.get('marry')
            fname = request.POST.get('fathername')
            mname = request.POST.get('mothname')        
            qua = request.POST.get('Qualification')
            exp = request.POST.get('Experience')
            refnum = request.POST.get('reference')
            reg = request.POST.get('txtRegNumber')
            spec = request.POST.get('speciality')
            if marr == None or gender == None:
                marr_out = profile_result['maritalstatus']
                gen_out = profile_result['gender']
            else:
                marr_out = marr
                gen_out = gender
            url = f'{domain_name.url}PersonalDetails'
            data = {"pnum":id,"inputdata": { "dob": dob, "emailid": email, "phone": con, "experience": exp,"fathername": fname,"fullname": funame,"gender": gen_out,"maritalstatus": marr_out,"mothername": mname,"qualification": qua,"referencecontact": refnum,"specailaity": spec,"regno":reg}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')

            Api_Profile = requests.get(f'{domain_name.url}PersonalDetails?pnum={id}').json()
            profile_result = Api_Profile['ResultData'][0]
            speciality_dropdown = requests.get(f'{domain_name.url}GetPhysicianSpeciality').json()
            speciality_dropdown_data = speciality_dropdown['ResultData']
            profile_result['speciality_dropdown_data'] = speciality_dropdown_data
            return profile_result
    return profile_result

def doctors_address_edit(request, id):
    Api_Address = requests.get(f'{domain_name.url}Address?pnum={id}').json()

    if Api_Address['Status'] == False:
        pass
    else:
        address_result = Api_Address['ResultData'][0]
        if request.method == 'POST':
            address = request.POST.get('address')
            city = request.POST.get('city')
            landmark = request.POST.get('landmark')
            long = request.POST.get('long')
            lat = request.POST.get('lati')
            pin = request.POST.get('pin')
            state = request.POST.get('state')
            url = f'{domain_name.url}Address'
            data = {"inputdata":{"pnum": id, "address": address, "city": city, "landmark": landmark,  "pincode": pin, "state": state}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Update successfull..!')
            elif result_json['Status'] == False and result_json['Message'] == 1:
                messages.error(request, str(result_json['errormessage']))
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')

            Api_Address = requests.get(f'{domain_name.url}Address?pnum={id}').json()
            address_result = Api_Address['ResultData'][0]
            return address_result
    return address_result

def doctors_kyc(request, id):
    kyc_result = None
    Api_KYC = requests.get(f'{domain_name.url}KycDetails?pnum={id}').json()
    if Api_KYC['Status'] == False:
        pass
    else:
        kyc_result = Api_KYC['ResultData'][0]
        if request.method == 'POST':
            passport = request.POST.get('passport')
            adharcard = request.POST.get('adharcard')
            voterid = request.POST.get('voterid')
            drivinglicense = request.POST.get('drivinglicense')
            pancard = request.POST.get('pancard')
            medicalregnumber = request.POST.get('medicalregnumber')
            regno = request.POST.get('regno')
            url = f'{domain_name.url}KycDetails'
            data = {"pnum":id,"inputdata": {"aadhaar": adharcard, "driverlicense": drivinglicense, "pan": pancard, "passportnumber": passport, "voterid": voterid, "medicalregnumber": medicalregnumber, 'regno': regno}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')

            Api_KYC = requests.get(f'{domain_name.url}KycDetails?pnum={id}').json()
            kyc_result = Api_KYC['ResultData'][0]
            return kyc_result
    return kyc_result

def doctors_bank_details(request, id):
    Bank_result = None
    Bank_KYC = requests.get(f'{domain_name.url}BankDetails?pnum={id}').json()
    if Bank_KYC['Status'] == False:
        pass
    else:
        Bank_result = Bank_KYC['ResultData'][0]
        if request.method == 'POST':
            accname = request.POST.get('accname')
            banknumber = request.POST.get('banknumber')
            branch = request.POST.get('branch')
            ifsc = request.POST.get('ifsc')
            url = f'{domain_name.url}BankDetails'
            data = {"pnum":id,"inputdata": {"accname": accname, "ifsccode": ifsc, "branch": branch, "bankacno": banknumber}}

            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')

            Bank_KYC = requests.get(f'{domain_name.url}BankDetails?pnum={id}').json()
            Bank_result = Bank_KYC['ResultData'][0]
            return Bank_result
    return Bank_result

def doctors_education_details(request, id):
    Education_result = None
    Education_URL = requests.get(f'{domain_name.url}GetEducationDetails?pnum={id}').json()
    Education_result = Education_URL['ResultData'][0]
    Education_Document_URL = requests.get(f'{domain_name.url}Education?pnum={id}').json()
    Education_document_result = Education_Document_URL['ResultData']


    if Education_Document_URL['Status'] == False:
        Education_result['documents'] = 'NoData'
    else:
        Education_result['documents'] = Education_document_result


    if Education_URL['Status'] == False:
        messages.error(request, 'Something Went Wrong, Please Try Again Later..!')
    else:
        Education_result = Education_URL['ResultData'][0]
        if  request.method == 'POST':
            collegename = request.POST.get('collegename')
            degree = request.POST.get('degree')
            gyear = request.POST.get('graudationyear')
            url = f'{domain_name.url}updateEducationDetails'
            data = {"inputdata": {"pnum":id,"degree":degree,"graudationyear":gyear,"collegename":collegename}}


            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')


            Education_URL = requests.get(f'{domain_name.url}GetEducationDetails?pnum={id}').json()
            Education_result = Education_URL['ResultData'][0]
            return Education_result
    return Education_result

def doctors_social_media(request, id):
    Social_result = None
    Education_URL = requests.get(f'{domain_name.url}SocialMedia?pnum={id}').json()
    if Education_URL['Status'] == False:
        pass
    else:
        Social_result = Education_URL['ResultData'][0]
        if request.method == 'POST':
            facebook = request.POST.get('facebook')
            instagram = request.POST.get('instagram')
            linkedin = request.POST.get('linkedin')
            twitter = request.POST.get('twitter')
            url = f'{domain_name.url}SocialMedia'
            data = {"pnum":id,"inputdata":{"facebook":facebook,"instagram":instagram,"linkedin":linkedin,"twitter":twitter}}
            result  = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')
            Education_URL = requests.get(f'{domain_name.url}SocialMedia?pnum={id}').json()
            Social_result = Education_URL['ResultData'][0]
            return Social_result
    return Social_result

def doctors_professional_info(request, id):
    Professional_result = None
    Professional_URL = requests.get(f'{domain_name.url}getPhysicianAdditinalDetails?pnum={id}').json()
    if Professional_URL['Status'] == False:
        pass
    else:
        Professional_result = Professional_URL['ResultData'][0]
        if  request.method == 'POST':
            anniversary = request.POST.get('faanniversarycebook')
            currentorganization = request.POST.get('currentorganization')
            identityexpirydate = request.POST.get('identityexpirydate')
            medicalidentity = request.POST.get('my_checkbox')
            if medicalidentity == 'on':
                medicalidentity = 1
            else:
                medicalidentity = 0
            url = f'{domain_name.url}CreateAndUpdatePhysicianAdditinalDetails'
            data ={"inputdata": {"pnum": id, "anniversary":anniversary, "currentOrganization":currentorganization, "medicalidentity":medicalidentity, "identityExpirydate":identityexpirydate}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')
            Professional_URL = requests.get(f'{domain_name.url}getPhysicianAdditinalDetails?pnum={id}').json()
            Professional_result = Professional_URL['ResultData'][0]
            return Professional_result
        return Professional_result

def doctors_trasanctions(request, id):
    Transaction_result = None
    Trasanction_URL = requests.get(f'{domain_name.url}Transaction?pnum={id}').json()
    if Trasanction_URL['Status'] == False:
        pass
    else:
        Transaction_result = Trasanction_URL['ResultData']
    return Transaction_result

def doctors_verify(request, id):
    Verify_result = None
    Verify_URL = requests.get(f'{domain_name.url}GetPhysicianVerifiedorNot?pnum={id}').json()
    if Verify_URL['Status'] == False:
        pass
    else:
        Verify_result = Verify_URL['ResultData'][0]
        if request.method == 'POST':
            comment = request.POST.get('admincommentsonstatus')
            status = request.POST.get('status')
            url = f'{domain_name.url}updatePhysicianVerifiedorNot'
            data ={"inputdata": {"status":status,"pnum":id,"admincommentsonstatus":comment}}
            result = requests.post(url, json = data)
            result_json = result.json()
            if result_json['Status'] == True:
                messages.success(request, 'Updated successfull..!')
            else:
                messages.error(request, 'Try Again SomethingWent Wrong..!')
            Verify_URL = requests.get(f'{domain_name.url}GetPhysicianVerifiedorNot?pnum={id}').json()
            Verify_result = Verify_URL['ResultData'][0]
            return Verify_result
    return Verify_result


def doctor_view_get(request, id):
    url = requests.get(f'http://bookmyotservice.pythonanywhere.com/PersonalDetails?pnum={id}').json()
    if url['Status'] == False:
        a = 'no data'
    else:
        profile_result = url['ResultData'][0]
        return profile_result
    
def doctor_address_view_get(request, id):
    Api_Address = requests.get(f'{domain_name.url}Address?pnum={id}').json()
    if Api_Address['Status'] == False:
        a = 'no data'
    else:
        address_result = Api_Address['ResultData'][0]
        return address_result
    
def doctor_kyc_view_get(request, id):
    Api_KYC = requests.get(f'{domain_name.url}KycDetails?pnum={id}').json()
    if Api_KYC['Status'] == False:
        a = 'no data'
    else:
        kyc_result = Api_KYC['ResultData'][0]
        return kyc_result
    
def doctor_education_view_get(request, id):
    Education_URL = requests.get(f'{domain_name.url}GetEducationDetails?pnum={id}').json()
    if Education_URL['Status'] == False:
        a = 'no data'
    else:
        education_result = Education_URL['ResultData'][0]
        return education_result
    
def doctor_personal_info_view_get(request, id):
    Professional_URL = requests.get(f'{domain_name.url}getPhysicianAdditinalDetails?pnum={id}').json()    
    if Professional_URL['Status'] == False:
        a = 'no data'
    else:
        personal_result = Professional_URL['ResultData'][0]
        return personal_result
    
def doctor_bank_details_view_get(request, id):
    Bank_KYC = requests.get(f'{domain_name.url}BankDetails?pnum={id}').json()
    if Bank_KYC['Status'] == False:
        a = 'no data'
    else:
        bank_result = Bank_KYC['ResultData'][0]
        return bank_result
    
def doctor_transaction_view_get(request, id):
    Trasanction_URL = requests.get(f'{domain_name.url}Transaction?pnum={id}').json()
    if Trasanction_URL['Status'] == False:
        messages.info(request, 'Something went wrong, try after sometime..!')
    else:
        transaction_result = Trasanction_URL['ResultData']
        print(transaction_result)
        return transaction_result
    
def doctor_social_media_view_get(request, id):
    Social_URL = requests.get(f'{domain_name.url}SocialMedia?pnum={id}').json()
    if Social_URL['Status'] == False:
        a = 'no data'
    else:
        social_result = Social_URL['ResultData'][0]
        return social_result
    
def doctor_verification_view_get(request, id):
    Verify_URL = requests.get(f'{domain_name.url}GetPhysicianVerifiedorNot?pnum={id}').json()
    if Verify_URL['Status'] == False:
        a = 'no data'
    else:
        verify_result = Verify_URL['ResultData'][0]
        return verify_result
    
def doctor_near_hospitals_view_get(request, id):
    Verify_URL = requests.get(f'{domain_name.url}getnearhospitalsforphysician?pnum={id}').json()
    if Verify_URL['Status'] == False:
        a = 'no data'
    else:
        verify_result = Verify_URL['ResultData']
        print(verify_result)
        return verify_result
    
    

