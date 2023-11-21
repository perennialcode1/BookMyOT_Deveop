"""
URL configuration for otProject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from otapp.views import *
from otapp.bookmyOT.hospital import *

urlpatterns = [
    path('admin/', admin.site.urls),

    # Admin Login
    path('hospital-registration', hospital_registration, name='hospital_registration'),
    path('verify-otp', verify_otp, name='verify_otp'),
    path('resend-otp', resend_otp, name='resend_otp'),
    path('', authenticate_user, name='admin_login'),
    path('terms-and-conditions', terms_and_conditions, name='terms_and_conditions'),
    path('privacy-policy', privacy_policy, name='privacy_policy'),

    # Home
    path('home', home, name='home'),
    path('send-notification-to-all-physicians', send_notification_to_all_physicians, name='send_noti_to_all_phys'),
    path('send-notification-to-all-hospitals', send_notification_to_all_hospitals, name='send_noti_to_all_hosp'),
    path('logout/', logout_view, name='logout'),
    
    # Hospital
    path('hospital-list', hospitals_list, name='hospital'),
    path('add-hospital-form', add_hospital, name='add_hospital'),
    path('edit-hospital-profile/<int:id>/', hospital_profile_edit, name='hospital_profile_edit'),
    path('delete-hospital/<int:id>', hospital_delete, name='hospital_delete'),
    
    #  Hospital Edit
    path('edit-hospital-details/<int:id>', hospital_details_edit, name='hospital_details_edit'),
    path('edit-hospital-address/<int:id>', hospital_address_edit, name='hospital_address_edit'),
    path('edit-hospital-status/<int:id>', hospital_status_edit, name='hospital_status_edit'),
    # path('edit-hospital-surgeons/<int:id>', hospital_surgeons_edit, name='hospital_surgeons_edit'),
    path('edit-hospital-equipment/<int:id>', hospital_equipment_edit, name='hospital_equipment_edit'),
    path('hospital-add-surgeons/<int:id>', hospital_add_surgeons, name='hospital_add_surgeons'),
    path('hospital-edit-surgeon/<int:id>', surgeon_edit, name='edit_suregon'),
    path('hospital_edit_surgeon_separately/<int:id>', hospital_edit_surgeon_separately, name='hospital_edit_surgeon_separately'),
    # path('hospital-delete-surgeon/<int:id>', hospital_surgeon_delete, name='hospital_surgeon_delete'),
    path('hospital-delete-equipment/<int:id>/<int:hid>', hospital_equipment_delete, name='hospital_equipment_delete'),
    path('hospital-add-equipment/<int:id>', hospital_add_equipment, name='hospital_add_equipment'),
    path('edit-hospital-surgeons/<int:id>', hospital_surgeons_edit, name='hospital_surgeons_edit'),
    path('hospital-delete-surgeon/<int:id>/<int:hid>', hospital_surgeon_delete, name='hospital_surgeon_delete'),

    
    # Hospital view
    path('hospital-profile-view/<int:id>', hospital_profile_view, name='hospital_profile_view'),
    path('hospital-details-view/<int:id>', hospital_details_view, name='hospital_details_view'),
    path('hospital-address-view/<int:id>', hospital_address_view, name='hospital_address_view'),
    path('hospital-surgeon-view/<int:id>', hospital_surgeon_view, name='hospital_surgeon_view'),
    path('hospital-transaction-view/<int:id>', hospital_transaction_view, name='hospital_transaction_view'),
    path('hospital-equipment-view/<int:id>', hospital_equipment_view, name='hospital_equipment_view'),
    path('hospital-nearby-physicians-view/<int:id>', hospital_near_by_physicians_view, name='hospital_near_by_physicians_view'),
    path('hospital-status-view/<int:id>', hospital_status_view, name='hospital_status_view'),


    # Doctors
    path('doctors-list', doctors_list, name = 'doctors'),
    path('doctors-delete/<int:id>', doctors_delete, name='doctors_delete'),
    path('doctors-send-notification', doctor_send_notification, name='doctor_send_notification'),
    path('edit-doctor/<str:id>', docter_edit_btn, name='doc_editbtn'),

    # Doctors Edit
    path('doctors_profile_edit/<str:id>', doctors_profile_edit, name='doctors_profile_edit'),
    path('doctots_add/<str:id>', doctots_edit_address, name='doctots_add'),
    path('doctors_edit_kyc/<str:id>', doctors_edit_kyc, name='doctots_edit_kyc'),
    path('doctors_edit_bank_details/<str:id>', doctors_edit_bank_details, name='doctors_edit_bank_details'),
    path('doctors_edit_education_details/<str:id>', doctors_edit_education_details, name='doctors_edit_education_details'),
    path('doctors_edit_social_media/<str:id>', doctors_edit_social_media, name='doctors_edit_social_media'),
    path('doctors_edit_professional_info/<str:id>', doctors_edit_professional_info, name='doctors_edit_professional_info'),
    path('doctors_edit_trasanctions/<str:id>', doctors_edit_trasanctions, name='doctors_edit_trasanctions'),
    path('doctors_edit_verify/<str:id>', doctors_edit_verify, name='doctors_edit_verify'),
    path('phyisacode_verify/<str:id>', phyisacode_verify, name='phyisacode_verify'),

    # Doctors View
    path('doctors-view/<str:id>', doctors_view, name = 'doctors_view'),
    path('doctors_view_address/<str:id>', doctors_view_address, name = 'doctors_view_address'),
    path('doctors_view_kyc/<str:id>', doctors_view_kyc, name = 'doctors_view_kyc'),
    path('doctors_view_awards/<str:id>', doctors_view_awards, name = 'doctors_view_awards'),
    path('doctors_view_education/<str:id>', doctors_view_education, name = 'doctors_view_education'),
    path('doctors_view_personal_info/<str:id>', doctors_view_personal_info, name = 'doctors_view_personal_info'),
    path('doctors_view_bank/<str:id>', doctors_view_bank, name = 'doctors_view_bank'),
    path('doctors_view_transaction/<str:id>', doctors_view_transaction, name = 'doctors_view_transaction'),
    path('doctors_view_media/<str:id>', doctors_view_media, name = 'doctors_view_media'),
    path('doctors_view_verification/<str:id>', doctors_view_verification, name = 'doctors_view_verification'),
    path('doctors_view_near_hospitals/<str:id>', doctors_view_near_hospitals, name = 'doctors_view_near_hospitals'),


    # Surgeries
    path('surgeries-list', surgeries_list, name = 'surgeries_list'),
    path('surgeries-edit/<int:id>', surgeries_edit_btn, name = 'surgeries_edit_btn'),
    path('surgeries-details-edit/<int:id>', surgery_details_edit, name = 'surgeries_details_edit'),
    path('surgeries-physician-notes-edit/<int:id>', surgery_physician_notes_edit, name='surgery_physician_notes_edit'),
    path('surgeries-patient-diasnostics-edit/<int:id>', surgery_patient_diagnostics_edit, name='surgery_patient_diagnostics_edit'),



    # Duties
    path('duties-list', duties_list, name = 'duties_list'),


    # Configs
    path('config-speciality-list', config_speciality_list, name = 'config_speciality_list'),
    path('config-add-speciality', config_add_speciality, name = 'config_add_speciality'),
    path('config-delete-speciality/<int:id>', config_speciality_delete, name = 'config_speciality_delete'),

    path('config-surgery-list', config_surgery_list, name = 'config_surgery_list'),
    path('config-add-suregery', config_add_surgery, name = 'config_add_surgery'),
    path('config-delete-suregery/<int:id>', config_surgery_delete, name = 'config_surgery_delete'),

    path('config-anesthesia-list', config_anetsthesia_list, name = 'config_anetsthesia_list'),
    path('config-add-anesthesia', config_add_anesthesia, name = 'config_add_anesthesia'),
    path('config-delete-anesthesia/<int:id>', config_anesthesia_delete, name = 'config_anesthesia_delete'),

    path('config-pre-existing-condintions-list', config_pre_existing_conditions_list, name = 'config_pre_existing_conditions_list'),
    path('config-add-pre-existing-condition', config_add_pre_existing_condition, name = 'config_add_pre_existing_condition'),
    path('config-delete-pre-existing-condition/<int:id>', config_pre_existing_condition_delete, name = 'config_pre_existing_condition_delete'),

    path('config-ot-equipment-list', config_ot_equipment_list, name = 'config_ot_equipment_list'),
    path('config-add-ot-equipemnt', config_add_equipment, name = 'config_add_equipment'),
    path('config-delete-ot-equipment/<int:id>', config_equipment_delete, name = 'config_equipment_delete'),

    path('config-app-notification', config_app_notification, name = 'config_app_notification'),

    path('config-images', config_images, name = 'config_images'),
    path('config-delete-image/<int:id>', config_image_delete, name = 'config_image_delete'),
    
    path('config-app-settings', config_app_settings, name = 'config_app_settings'),
    

    # FAQ'S

    # admin
    path('get-faq-category', get_faq_category, name='get_faq_category'),
    path('add-faq-category', admin_add_faq_category_type, name='admin_add_faq_cat_type'),
    path('get-category-faqs', get_category_faqs, name='get_category_faqs'),
    path('add-category-faqs', add_category_faq, name='add_category_faq'),
    path('edit-category-faq', admin_edit_faq_category, name='admin_edit_faq_category'),
    path('category-faq-edit', admin_edit_category_faq, name='edit_cat_faq'),
    path('faq-category-delete/<int:id>', faq_category_delete, name='faq_category_delete'),
    path('category-faq-delete/<int:id>', category_faq_delete, name='category_faq_delete'),
    path('all-submited-faqs', admin_get_all_submission_faqs, name='admin_get_all_submission_faqs'),
    path('view-faq/<int:id>', admin_view_faq, name='admin_view_faq'),
    path('close-ticket/<int:id>', close_ticket, name='close_ticket'),

    # hospital
    path('hospital-get-faq', hospital_get_faqs, name='hospital_get_faqs'),
    path('hospoital-category-faqs/<int:id>', get_hos_cat_faqs, name='get_hos_cat_faqs'),
    path('submit-faq/<str:id>/<int:type>', submit_faq, name='submit_faq'),
    path('hospital-submited-tickets/<str:hnum>', hospital_get_submited_tickets, name='hospital_get_submited_tickets'),
    path('hospital-view-ticket/<int:id>', hospital_view_ticket, name='hospital_view_ticket'),
]
