/// <reference path="bookmyot.js" />


var currentOpenSurgerySection = 'Details';
function GetIdParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");

    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else
        return 0;
}

$(document).ready(function () {
    //var surgeryId = GetIdParameter();
    $('#SurgeryDetailsBtn').click(function () {
        currentOpenSurgerySection = 'Details';
        $("#SurgeryDetails").show();
        $("#SurgeryReports").hide();
        $("#PhysicianNotes").hide();
    });
    $('#SurgeryReportsBtn').click(function () {
        currentOpenSection = 'Reports';
        $("#SurgeryDetails").hide();
        $("#SurgeryReports").show();
        $("#PhysicianNotes").hide();
    });
    $('#PhysicianNotesBtn').click(function () {
        currentOpenSection = 'Notes';
        $("#SurgeryDetails").hide();
        $("#SurgeryReports").hide();
        $("#PhysicianNotes").show();
    });
    $('#btnAddSurgery').click(function () {
        debugger
        invalidcount = 0;
        var errorMessage = '';


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
            var formdata = $("#fmAddSurgery").serialize();
            bookMyOT.ajaxPost('/HospitalSurgery/Add', formdata, 'application/json', AddSurgerySuccess, AddSurgeryFail, true);
        }
    });

});
function AddSurgerySuccess(data) {

    if (data) {
        SuccessNotification("Surgery Created Successfully!", RedirectToSurgeryList)
    }
    else {
        ErrorNotification("Error occured while creating the Surgery");
    }
}

function RedirectToSurgeryList() {
    window.location = "/HospitalSurgery/Index"
}
function AddSurgeryFail(data) {

}