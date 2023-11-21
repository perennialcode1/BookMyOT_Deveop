var currentOpenDoctorSection = 'Profile';
function GetIdParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");

    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else
        return 0;
}
$(document).ready(function () {
    $('#menuProfile').click(function () {
        currentOpenDoctorSection = 'Profile';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").show();
    });
    $('#menuKYC').click(function () {
        currentOpenDoctorSection = 'KYC';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").show();
        $("#paneProfile").hide();
    });
    $('#menuEducation').click(function () {
        currentOpenDoctorSection = 'Education';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").show();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuAwards').click(function () {
        currentOpenDoctorSection = 'Awards';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").show();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuProfessionalInfo').click(function () {
        currentOpenDoctorSection = 'ProfessionalInfo';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").show();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuBankDetails').click(function () {
        currentOpenDoctorSection = 'BankDetails';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").show();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuTransactions').click(function () {
        currentOpenDoctorSection = 'Transactions';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").show();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuLeaves').click(function () {
        currentOpenDoctorSection = 'Leaves';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").show();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuWorkingHours').click(function () {
        currentOpenDoctorSection = 'WorkingHours';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").show();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuOptions').click(function () {
        currentOpenDoctorSection = 'Options';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").show();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuSocialMediaLinks').click(function () {
        currentOpenDoctorSection = 'SocialMediaLinks';
        $("#paneVerfication").hide();
        $("#paneSocialMeduaLinks").show();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });
    $('#menuVerification').click(function () {
        currentOpenDoctorSection = 'Verification';
        $("#paneVerfication").show();
        $("#paneSocialMeduaLinks").hide();
        $("#paneOptions").hide();
        $("#paneWorkingHours").hide();
        $("#paneLeaves").hide();
        $("#paneTransactions").hide();
        $("#paneBankDetails").hide();
        $("#paneProfessionalInfo").hide();
        $("#paneAwards").hide();
        $("#paneEducation").hide();
        $("#paneKYC").hide();
        $("#paneProfile").hide();
    });

});
"use strict";

// Class definition
var DoctorEdit = function () {
    // Elements
    var doctorProfileForm;
    var doctorSocialMediaLinksForm;
    var submitButton;
    var doctorSocialMediaLinksValidator;
    var doctorProfileValidator;

    // Handle form
    var handleValidation = function (e) {
        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/
        doctorSocialMediaLinksValidator = FormValidation.formValidation(
            doctorSocialMediaLinksForm,
            {
                fields: {
                    'txtFacebook': {
                        validators: {
                            // regexp: {
                            //     regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            //     message: 'The value is not a valid email address',
                            // },
                            notEmpty: {
                                message: 'Facebook id is required'
                            }
                        }
                    },
                    'txtInstagram': {
                        validators: {
                            notEmpty: {
                                message: 'Instagram id is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );
        doctorProfileValidator = FormValidation.formValidation(
            doctorProfileForm,
            {
                fields: {
                    'txtHospitalName': {
                        validators: {
                            // regexp: {
                            //     regexp: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            //     message: 'The value is not a valid email address',
                            // },
                            notEmpty: {
                                message: 'Hospital name is required'
                            }
                        }
                    },
                    'txtUsername': {
                        validators: {
                            notEmpty: {
                                message: 'Username is required'
                            }
                        }
                    }
                },
                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',  // comment to enable invalid state icons
                        eleValidClass: '' // comment to enable valid state icons
                    })
                }
            }
        );
    }

    var handleSubmitDemo = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();
            if (currentOpenDoctorSection === "SocialMediaLinks") {
                // Validate form
                doctorSocialMediaLinksValidator.validate().then(function (status) {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click 
                        submitButton.disabled = true;


                        // Simulate ajax request
                        setTimeout(function () {
                            // Hide loading indication
                            submitButton.removeAttribute('data-kt-indicator');

                            // Enable button
                            submitButton.disabled = false;

                            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "Successfully Saved!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    form.querySelector('[name="email"]').value = "";
                                    form.querySelector('[name="password"]').value = "";

                                    //form.submit(); // submit form
                                    var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                }
                            });
                        }, 2000);
                    } else {
                        // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text: "Please fill mandatory fields and try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            } else if (currentOpenDoctorSection === "Profile") {
                doctorProfileValidator.validate().then(function (status) {
                    if (status == 'Valid') {
                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click 
                        submitButton.disabled = true;


                        // Simulate ajax request
                        setTimeout(function () {
                            // Hide loading indication
                            submitButton.removeAttribute('data-kt-indicator');

                            // Enable button
                            submitButton.disabled = false;

                            // Show message popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                            Swal.fire({
                                text: "You have successfully logged in!",
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: "Ok, got it!",
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    form.querySelector('[name="email"]').value = "";
                                    form.querySelector('[name="password"]').value = "";

                                    //form.submit(); // submit form
                                    var redirectUrl = form.getAttribute('data-kt-redirect-url');
                                    if (redirectUrl) {
                                        location.href = redirectUrl;
                                    }
                                }
                            });
                        }, 2000);
                    } else {
                        // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        Swal.fire({
                            text: "Please fill mandatory fields and try again.",
                            icon: "error",
                            buttonsStyling: false,
                            confirmButtonText: "Ok, got it!",
                            customClass: {
                                confirmButton: "btn btn-primary"
                            }
                        });
                    }
                });
            }
        });
    }

    var handleSubmitAjax = function (e) {
        // Handle form submit
        submitButton.addEventListener('click', function (e) {
            // Prevent button default action
            e.preventDefault();

            // Validate form
            validator.validate().then(function (status) {
                if (status == 'Valid') {
                    // Hide loading indication
                    submitButton.removeAttribute('data-kt-indicator');

                    // Enable button
                    submitButton.disabled = false;
                    var surgeryData = {
                        //email: form.querySelector('[name="email"]').value,
                        //password: form.querySelector('[name="password"]').value,
                        "facebook": $('#txtFacebook').val(),
                        "instagram": $('#txtInstagram').val(),
                        "twitter": $('#txtTwitter').val(),
                        "linkedin": $('#txtLinkedin').val(),
                    }
                    $.ajax({
                        type: "post",
                        url: "/Surgery/Edit",
                        data: JSON.stringify(surgeryData),
                        dataType: 'json',
                        contentType: 'application/json',
                        accept: 'application/json',
                        success: function (result) {
                            if (result != null && result.status) {
                                form.querySelector('[name="email"]').value = "";
                                form.querySelector('[name="password"]').value = "";
                                const redirectUrl = form.getAttribute('data-kt-redirect-url');

                                if (redirectUrl) {
                                    location.href = redirectUrl;
                                }
                                SuccessNotification("Surgery details successfully saved!");
                            }
                            else {
                                ErrorNotification("Sorry, looks like there are some errors detected, please try again.");
                            }
                        },
                        error: function (xhr) {
                            ErrorNotification("Sorry, looks like there are some errors detected, please try again.");
                        },
                        beforeSend: function () {
                            $('.spinner-modal').show()
                        },
                        complete: function () {
                            $('.spinner-modal').hide();
                        }
                    });
                } else {
                    ErrorNotification("Sorry, looks like there are some errors detected, please try again.");
                }
            });
        });
    }

    // Public functions
    return {
        // Initialization
        init: function () {
            doctorProfileForm = document.querySelector('#doctorProfileForm');
            doctorSocialMediaLinksForm = document.querySelector('#doctorSocialMediaLinksForm');
            submitButton = document.querySelector('#btnSaveHospital');

            handleValidation();
            handleSubmitDemo(); // used for demo purposes only, if you use the below ajax version you can uncomment this one
            //handleSubmitAjax(); // use for ajax submit
        }
    };
}();

// On document ready
KTUtil.onDOMContentLoaded(function () {
    DoctorEdit.init();
});
