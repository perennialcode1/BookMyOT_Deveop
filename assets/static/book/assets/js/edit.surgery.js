var currentOpenSurgerySection = 'Details';


$('#btnSaveSurgery').click(function () {
    debugger
    invalidcount = 0;
    var errorMessage = '';

    if (currentOpenSurgerySection == 'Details') {
        $('.isrequired').each(function () {


            if ($(this).attr('id') != 'surgery' && $(this).val().trim() == "") {
                if ($(this).attr('data-val-required') != undefined) {
                    invalidcount++
                    errorMessage += '<p>' + $(this).attr('data-val-required') + '</p><br/>';
                }

            }
            else if ($(this).attr('id') == 'surgery' && $('#surgery').val().length <= 0) {
                invalidcount++
                errorMessage += '<p>' + $(this).attr('data-val-required') + '</p><br/>';
            }
        });
        if (invalidcount > 0) {
            ErrorHTMLNotification(errorMessage);
            return false;
        } else {
            var formdata = $("#surgeryDetailsForm").serialize();
            bookMyOT.ajaxPost('/HospitalSurgery/Edit', formdata, 'application/json', AddSurgerySuccess, AddSurgeryFail, true);
        }
    }
    else if (currentOpenSurgerySection == 'Reports') {
        var patientdiagnostics = {};
        patientdiagnostics.preexistingconditions = $("#preexistingconditions").val();
        patientdiagnostics.temperature = $("#temperature").val();
        patientdiagnostics.respiratoryrate = $("#respiratoryrate").val();
        patientdiagnostics.oxygensaturation = $("#oxygensaturation").val();
        patientdiagnostics.heartrate = $("#heartrate").val();
        patientdiagnostics.bloodpressure = $("#bloodpressure").val();
        patientdiagnostics.gcs = $("#gcs").val();
        patientdiagnostics.mpg = $("#mpg").val();
        patientdiagnostics.xray = $("#xray").prop('checked');
        patientdiagnostics.twodecho = $("#twodecho").prop('checked');
        patientdiagnostics.ecg = $("#ecg").prop('checked');
        patientdiagnostics.caseid = $("#caseid").val();
        bookMyOT.ajaxPost('/HospitalSurgery/UpsertPatientDiagnostics', { model: patientdiagnostics }, 'application/json', UpsertPatientDiagnosticsSuccess, UpsertPatientDiagnosticsFail, true);
    }

    else if (currentOpenSurgerySection === "Notes") {
     
           
                // Show loading indication
                btnSaveSurgery.setAttribute('data-kt-indicator', 'on');

                // Disable button to avoid multiple click 
                btnSaveSurgery.disabled = true;


                // Simulate ajax request
                var notesData = {
                    "hospitalnotes": $('#txtPhysicianNotes').val(),
                    "caseid": GetIdParameter(),
                }

                // Simulate ajax request
                $.ajax({
                    type: "post",
                    url: "/Surgery/UpsertPhysicianNotes",
                    data: JSON.stringify(notesData),
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json',
                    success: function (result) {
                        // Hide loading indication
                        btnSaveSurgery.removeAttribute('data-kt-indicator');

                        // Enable button
                        btnSaveSurgery.disabled = false;
                        if (result != null && result.status) {
                            SuccessNotification("Successfully Saved!");
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
function AddSurgerySuccess(data) {

    if (data) {
        SuccessNotification("Surgery details updated Successfully!")
    }
    else {
        ErrorNotification("Unable to update Surgery details!")
    }
}

function AddSurgeryFail(data) {
    ErrorNotification("Unable to update Surgery details!")
}

function UpsertPatientDiagnosticsSuccess(data) {

    if (data) {
        SuccessNotification("Patient Diagnostics updated Successfully!")
    }
    else {
        ErrorNotification("Unable to update Patient Diagnostics!")
    }
}

function UpsertPatientDiagnosticsFail(data) {
    ErrorNotification("Unable to update Patient Diagnostics!")
}