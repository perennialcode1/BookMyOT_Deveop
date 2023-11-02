from django.shortcuts import render, redirect
from otapp.bookmyOT.config import *
from otapp.bookmyOT.duties import *
from otapp.bookmyOT.hospital import *
from otapp.bookmyOT.suergeries import *
from otapp.bookmyOT.utilities import send_email
from .bookmyOT.dashboard import *
from otapp.bookmyOT.doctors import *
import requests
from .decorators import session_required # My custom decorator
from django.contrib.auth import logout
import random
# import firebase_admin
# from firebase_admin import auth
# from django.contrib import messages
# from firebase_admin import credentials
# formatted_mobile = f'+91{mobile}'
# try:
#     existing_user = auth.get_user_by_phone_number(formatted_mobile)
# except:
#     user = auth.create_user(phone_number=formatted_mobile)
# cred = credentials.Certificate('bookmyot-pcode-firebase-adminsdk-ytbac-ad024b463e.json')
# firebase_admin.initialize_app(cred)



#  Views Starts from here..

def terms_and_conditions(request):
    return render(request, 'main/terms-and-conditions.html')

def privacy_policy(request):
    return render(request, 'main/privacy-policy.html')

def hospital_registration(request):
    url = f'{domain_name.url}adminorHospitalLogin'
    if request.method == 'POST':
        hospitalname = request.POST.get('hospitalname')
        mobile = request.POST.get('mobile')
        email = request.POST.get('email')
        pwd = mobile[-4:]
        user_data = {"inputdata": {"username": email, "password": pwd}}
        response = requests.post(url, json = user_data)
        res = response.json()
       
        if res['Status'] == True:
            messages.error(request, "Email already exists, try with another email..!")
            return redirect('hospital_registration')
        else:
            generated_otp = random.randint(100000, 999999)
            subject = 'Registration OTP'
            message_body = f'Your regestration OTP for BookMyOT is  {generated_otp}'
            send_email(subject, message_body, email)
            request.session['user_email'] = email
            request.session['pwd'] = pwd
            request.session['mobile_num'] = mobile
            request.session['hospital_name'] = hospitalname
            request.session['registration_otp'] = generated_otp
            request.session.set_expiry(60 * 5)
            messages.success(request, "Hospital registration in progress, Enter OTP for verification..")
            return redirect('verify_otp')
    return render(request, 'main/hospital-registration.html')

def verify_otp(request):
    reg_url = f'{domain_name.url}CreateHospitalProfile'
    email = request.session.get('user_email')
    pwd = request.session.get('pwd')
    hospital_name = request.session.get('hospital_name')
    mobile_num = request.session.get('mobile_num')
  
    if len(email) > 2:
        parts = email.split("@")
        if len(parts) == 2:
            change_email = f"{parts[0][:4]}{'*'*4}@{parts[1]}"
    if request.method == 'POST':
        first = request.POST.get('first')
        second = request.POST.get('second')
        third = request.POST.get('third')
        fourth = request.POST.get('fourth')
        fifth = request.POST.get('fifth')
        sixth = request.POST.get('sixth')
        stored_otp = request.session.get('registration_otp')
        user_entered_otp = int(f"{first}{second}{third}{fourth}{fifth}{sixth}")
        try:
            if user_entered_otp == stored_otp:
                del request.session['registration_otp']

                data = {
                    "inputdata": {
                        "hospitalname": hospital_name,
                        "mobile": mobile_num,
                        "email": email,
                        "username": email,
                        "psw": pwd,
                        "tier": None
                    }
                }
                a = requests.post(reg_url, json=data).json()
                
                messages.success(request, 'OTP authentication was successful; you may now proceed to log in.')
                return redirect('https://bookmyot.azurewebsites.net/Account/Login')
            else:
                messages.error(request, 'Entered OTP did not match, please try again..!')
                return redirect('verify_otp')
        except:
            messages.error(request, 'Something went wrong, please try again.>!')
            return redirect('verify_otp')
    return render(request, 'main/verify_otp.html', {'email': change_email})

def resend_otp(request):
    if request.method == 'POST':
        generated_otp = random.randint(100000, 999999)
        email = request.session.get('user_email')
        request.session['registration_otp'] = generated_otp
        request.session.set_expiry(60 * 5)  
        subject = 'Registration OTP'
        message_body = f'Your regestration OTP for BookMyOT is  {generated_otp}'
        send_email(subject, message_body, email)
        messages.success(request, "OTP resent successfully. Enter the new OTP for verification.")
        return redirect('verify_otp')

    return render(request, 'main/verify_otp.html', {'email': email})

def authenticate_user(request):
    if request.method == 'POST':
        u_name = request.POST.get('Username')
        u_pwd = request.POST.get('Password')
        url = f'{domain_name.url}adminorHospitalLogin'
        data = {"inputdata": {"username": u_name, "password": u_pwd}}
        response = requests.post(url, json=data)
        res = response.json()

        if response.status_code == 200 and res.get('Status') and res['ResultData']['roleid'] == 3:
            user = res['ResultData']['username']
            request.session['username'] = user
            messages.success(request, 'Login successful..!')
            return redirect('home')

        message = res.get('Message', 'No Records Found')
    else:
        message = None

    return render(request, 'main/sign-in.html', {'mess': message})

@session_required
def home(request):
    data = dashboard()
    return render(request, 'main/home.html', data)

@session_required
def send_notification_to_all_physicians(request):
    send_notification_to_all_phys(request)
    return redirect('home')

@session_required
def send_notification_to_all_hospitals(request):
    send_notification_to_all_hosp(request)
    return redirect('home')

@session_required
def logout_view(request):
    logout(request)
    messages.success(request, 'Logout successfull..!')
    return redirect('admin_login')




# Hospital functions
@session_required
def hospitals_list(request):
    template = 'hospital/hospital-list.html'
    context =None
    if request.method == 'POST':
        data = hospital_filter_list(request)
        context = {
            'data' : data['ResultData']
        }
        return render(request, template, context)
    else:
        data = hospital(request)
        context = {
            'data' : data['ResultData']
        }
        return render(request, template, context)

@session_required
def add_hospital(request):
    data = add_hospital_form(request)
    context = {
        'form' : data
    }
    return render(request, 'hospital/hospital_add.html', context)

@session_required
def hospital_delete(request,id):
    delete_hospital(request, id)
    return redirect('hospitals_list', id)


# Edit Hospital

@session_required
def hospital_profile_edit(request,id):
    data = hospital_edit_profile(request,id)
    return render(request, 'hospital/hospital-profile-edit.html', data)

@session_required
def hospital_details_edit(request,id):
    data = hospital_edit_details(request,id)
    return render(request, 'hospital/hospital-details-edit.html', data)

@session_required
def hospital_address_edit(request,id):
    data = hospital_edit_address(request,id)
    return render(request, 'hospital/hospital-address-edit.html', data)

@session_required
def hospital_status_edit(request,id):
    data = hospital_edit_status(request,id)
    return render(request, 'hospital/hospital-status-edit.html', data)

@session_required
def hospital_surgeons_edit(request,id):
    data = hospital_edit_surgeons(request,id)
    return render(request, 'hospital/hospital-surgeons-edit.html',data)

@session_required
def hospital_add_surgeons(request,id):
    hospital_add_surgeon(request,id)
    return redirect('hospital_surgeons_edit', id)

def hospital_edit_surgeon_separately(request, id):
    hospital_edit_surgeon_separate(request, id)
    return render(request, 'hospital/hospital-surgeon-edit-separate.html')

@session_required
def surgeon_edit(request,id):
    data = surgeonedit(request, id)
    return render(request, 'hospital/hospital-edit-particular-surgeon.html', data)

@session_required
def hospital_surgeon_delete(request,id, hid):
    surgeon_delete(request, id, hid)
    return redirect('hospital_surgeons_edit', hid)

@session_required
def hospital_equipment_edit(request,id):
    data = hospital_edit_equipment(request,id)
    return render(request, 'hospital/hospital-equipment-edit.html',data)

@session_required
def hospital_add_equipment(request,id):
    hospital_equipment_add(request,id)
    return redirect('hospital_equipment_edit', id)

@session_required
def hospital_equipment_delete(request,id, hid):
    equipment_delete(request, id, hid)
    return redirect('hospital_equipment_edit', hid)




# Hospital view

@session_required
def hospital_profile_view(request, id):
    data = hospital_profile_view_get(request, id)
    return  render(request, 'hospital/hospital-profile-view.html', data)

@session_required
def hospital_details_view(request, id):
    data = hospital_details_view_get(request, id)
    return  render(request, 'hospital/hospital-details-view.html', data)

@session_required
def hospital_address_view(request, id):
    data = hospital_address_view_get(request, id)
    return  render(request, 'hospital/hospital-address-view.html', data)

@session_required
def hospital_status_view(request, id):
    data = hospital_status_view_get(request, id)
    return  render(request, 'hospital/hospital-status-view.html', data)

@session_required
def hospital_surgeon_view(request, id):
    data = hospital_surgeon_view_get(request, id)
    context = {
        'data' : data,'hosid':id
    }
    return  render(request, 'hospital/hospital-surgeon-view.html', context)

@session_required
def hospital_equipment_view(request, id):
    data = hospital_equipment_view_get(request, id)
    context = {
        'data' : data,'hosid':id
    }
    return  render(request, 'hospital/hospital-equipment-view.html', context)

@session_required
def hospital_transaction_view(request, id):
    data = hospital_transaction_view_get(request, id)
    context = {
        'data': data,'hosid': id
    }
    return  render(request, 'hospital/hospital-transaction-view.html', context)

# @session_required
def hospital_near_by_physicians_view(request, id):
    data = hospital_near_physicians_view_get(request, id)
    context = {
        'data': data,
        'hosid':id,
    }
   
    return render(request, 'hospital/hospital-near-physicians-view.html', context)




# Doctors Function
@session_required
def doctors_list(request):
    context = None
    if request.method == 'POST':
        data1 = doctors_filter_list(request)
        context = {
            'data' : data1['ResultData']
        }
        return render(request, 'doctors/doctors-list.html', context)
    else:
        data = get_All_Doctors_List()
        context = {
            'data': data,
        }
        return render(request, 'doctors/doctors-list.html', context)

@session_required
def doctors_delete(request, id):
    doctors_deletebtn(request, id)
    return redirect('doctors')

@session_required
def doctor_send_notification(request):
    if request.method == 'POST':
        doc_send_noti(request)
    return redirect('doctors')

@session_required
def docter_edit_btn(request,id):
    data = doctors_profile_edit(request, id)
    return render(request, 'doctors/doctors-profile.html', data)

@session_required
def doctots_edit_address(request, id):
    data = doctors_address_edit(request, id)
    return render(request, 'doctors/doctors-address.html', data)

@session_required
def doctors_edit_kyc(request, id):
    data = doctors_kyc(request, id)
    return render(request, 'doctors/doctors-kyc.html', data)

@session_required
def doctors_edit_bank_details(request, id):
    data = doctors_bank_details(request, id)
    return render(request, 'doctors/doctors-bank.html', data)

@session_required
def doctors_edit_education_details(request, id):
    data = doctors_education_details(request, id)
    return render(request, 'doctors/doctors-education.html', data)

@session_required
def doctors_edit_social_media(request, id):
    data = doctors_social_media(request, id)
    return render(request, 'doctors/doctors-social-media.html', data)

@session_required
def doctors_edit_professional_info(request, id):
    data = doctors_professional_info(request, id)
    return render(request, 'doctors/doctors-professional-info.html', data)

@session_required
def doctors_edit_trasanctions(request, id):
    data = doctors_trasanctions(request, id)
    download_url =requests.get(f'{domain_name.url}PhysicianTransactionPDF?pnum={id}').json()
    down = download_url['ResultData']
    context =  {
        'transactions':data,
        "pnum":id,
        "down": down,
        }
    return render(request, 'doctors/doctors-transaction.html', context)

# @session_required
def doctors_edit_verify(request, id):
    data = doctors_verify(request, id)
    return render(request, 'doctors/doctors-verify.html', data)

def phyisacode_verify(request, id):
    if request.method == 'POST':
        isacode = request.POST.get('isacode')
        url = f'{domain_name.url}checkisacodes'
        data = {"code":isacode}
        result = requests.post(url, json = data).json()
        if result['ResultData'][0]['status'] == 0:
            messages.error(request, 'ISA Code not avilable in records..!')
        else:
            messages.success(request, 'ISA Code avilable in records..!')

    return redirect('doctors_edit_verify', id)

# Doctors view

@session_required
def doctors_view(request, id):
    data = doctor_view_get(request, id)
    return render(request, 'doctors/doctors-profile-view.html', data)

@session_required
def doctors_view_address(request, id):
    data = doctor_address_view_get(request, id)
    return render(request, 'doctors/doctors-address-view.html', data)

@session_required
def doctors_view_kyc(request, id):
    data = doctor_kyc_view_get(request, id)
    return render(request, 'doctors/doctors-kyc-view.html', data)

@session_required
def doctors_view_education(request, id):
    data = doctor_education_view_get(request, id)
    return render(request, 'doctors/doctors-education-view.html', data)

@session_required
def doctors_view_personal_info(request, id):
    data = doctor_personal_info_view_get(request, id)
    return render(request, 'doctors/doctors-professional-view.html', data)

@session_required
def doctors_view_bank(request, id):
    data = doctor_bank_details_view_get(request, id)
    return render(request, 'doctors/doctors-bank-details-view.html', data)

@session_required
def doctors_view_transaction(request, id):
    data = doctor_transaction_view_get(request, id)
    result =  {'transactions':data,"pnum":id}
    return render(request, 'doctors/doctors-transactions-view.html', result)

@session_required
def doctors_view_media(request, id):
    data = doctor_social_media_view_get(request, id)
    return render(request, 'doctors/doctors-social-media-view.html', data)

@session_required
def doctors_view_verification(request, id):
    data = doctor_verification_view_get(request, id)
    return render(request, 'doctors/doctors-verification-view.html', data)

@session_required
def doctors_view_awards(request, id):
    data = doctor_verification_view_get(request, id)
    return render(request, 'doctors/doctors-kyc-view.html', data)

@session_required
def doctors_view_near_hospitals(request, id):
    data = doctor_near_hospitals_view_get(request, id)
    context = {
        'data': data,
        'pnum':id,
    }
    return render(request, 'doctors/doctors-near-hospitals-view.html', context)








# Surgeries functions

@session_required
def surgeries_list(request):
    data = get_surgeries()
    context = {
        'data' : data
        }
    return render(request, 'surgeries/surgeries-list.html', context)

@session_required
def surgeries_edit_btn(request, id):
    data = surgery_details_edit(request, id)
    return render(request, 'surgeries/surgery-details-edit.html', data)

@session_required
def surgery_physician_notes_edit(request, id):
    data = physician_notes_edit(request, id)
    return render(request, 'surgeries/surgery-physician-notes-edit.html', data)

@session_required
def surgery_patient_diagnostics_edit(request, id):
    data = patient_diagnostics_edit(request, id)
    return render(request, 'surgeries/surgery-patient-diagnostics-edit.html', data)



# Duties

@session_required
def duties_list(request):
    data = duties_list_get(request)
    context = {
        'data' : data
        }
    return render(request, 'duties/duties-list.html', context)



# Configs

@session_required
def config_speciality_list(request):
    data = config_speciality_get()
    if request.method == 'POST':
        data = config_post_specialist(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-speciality-list.html', context)

@session_required
def config_add_speciality(request):
    add_speciality_form(request)
    return redirect('config_speciality_list')

@session_required
def config_speciality_delete(request, id):
    config_speciality_deletebtn(request, id)
    return redirect('config_speciality_list')

@session_required
def config_surgery_list(request):
    data = config_surgery_get()
    if request.method == 'POST':
        data = config_post_surgery(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-surgery-list.html', context)

@session_required
def config_add_surgery(request):
    add_surgery_form(request)
    return redirect('config_surgery_list')

@session_required
def config_surgery_delete(request, id):
    config_surgery_deletebtn(request, id)
    return redirect('config_surgery_list')

@session_required
def config_anetsthesia_list(request):
    data = config_anetsthesia_get()
    if request.method == 'POST':
        data = config_post_anesthesia(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-anesthesia-list.html', context)

@session_required
def config_add_anesthesia(request):
    add_anesthesia_form(request)
    return redirect('config_anetsthesia_list')

@session_required
def config_anesthesia_delete(request, id):
    config_anesthesia_deletebtn(request, id)
    return redirect('config_anetsthesia_list')

@session_required
def config_pre_existing_conditions_list(request):
    data = config_pre_existing_get()
    if request.method == 'POST':
        data = config_post_config_pre_Existing(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-pre-existing.html', context)

@session_required
def config_add_pre_existing_condition(request):
    add_pre_existing_condition_form(request)
    return redirect('config_pre_existing_conditions_list')

@session_required
def config_pre_existing_condition_delete(request, id):
    config_pre_existing_condition_deletebtn(request, id)
    return redirect('config_pre_existing_conditions_list')

@session_required
def config_ot_equipment_list(request):
    data = config_ot_equpiment_get()
    if request.method == 'POST':
        data = config_post_equipment_list(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-ot-equipment-list.html', context)

@session_required
def config_add_equipment(request):
    add_equipment_form(request)
    return redirect('config_ot_equipment_list')

@session_required
def config_equipment_delete(request, id):
    config_equipment_deletebtn(request, id)
    return redirect('config_ot_equipment_list')

@session_required
def config_app_notification(request):
    data = config_noti_get()
    if request.method == 'POST':
        config_noti_post(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-app-notification.html', context)

@session_required
def config_images(request):
    data = config_images_get()
    if request.method == 'POST':
        config_images_add_form(request)
        
    # context = {
    #     'data' : data['ResultData'],
    # }
    return render(request, 'config/config-images.html', data)

def config_image_delete(request, id):
    config_image_deletebtn(request, id)
    return redirect('config_images')

@session_required
def config_app_settings(request):
    data = config_settings_get()
    if request.method == 'POST':
        data = config_settings_post(request)
    context = {
        'data' : data,
    }
    return render(request, 'config/config-app-settings.html', context)
