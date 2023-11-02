var currentOpenSurgerySection = 'Details';
function GetIdParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");

    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else
        return 0;
}
var surgeryDatePicker = new tempusDominus.TempusDominus(document.getElementById("surgerydate"), {
    //put your config here
});
surgeryDatePicker.dates.formatInput = date => moment(date).format('DD-MM-YYYY HH:mm');
//new tempusDominus.TempusDominus(document.getElementById("dob"), {
//    display: {
//        viewMode: "calendar",
//        components: {
//            decades: true,
//            year: true,
//            month: true,
//            date: true,
//            hours: false,
//            minutes: false,
//            seconds: false
//        }
//    }
//});

$(document).ready(function () {

    $('.openBA').click(function () {
        editId = 0;
        editId = $(this).parents('tr').find('.SurgeryId').val();
        var PatientName = $(this).parents('tr').find('.PatientName').html();
        var SurgeryName = $(this).parents('tr').find('.SurgeryName').html();
        $('#bamodelPatientName').html(PatientName);
        $('#bamodelSurgeryName').html(SurgeryName);
        $('input[name="bookAnesthetists"]:checked').prop('checked', false);
        $('#addOTModel').modal('show');
    });
 

});

$('#SurgeryDetailsBtn').on('click', function () {
    currentOpenSurgerySection = 'Details';
    $("#SurgeryDetails").show();
    $("#SurgeryReports").hide();
    $("#PhysicianNotes").hide();
});
$('#SurgeryReportsBtn').on('click', function () {
    currentOpenSurgerySection = 'Reports';
    $("#SurgeryDetails").hide();
    $("#SurgeryReports").show();
    $("#PhysicianNotes").hide();
    var caseid = $('#caseid').val();
    bookMyOT.ajaxGet('/Surgery/GetPatientDiagnostics?caseid=' + parseInt(caseid), BindPatientDiagnosticsDetails, null, null);
});
$('#PhysicianNotesBtn').on('click', function () {
    currentOpenSurgerySection = 'Notes';
    $("#SurgeryDetails").hide();
    $("#SurgeryReports").hide();
    $("#PhysicianNotes").show();
    getPhysicianNotes(GetIdParameter());
});

function BindPatientDiagnosticsDetails(data) {
    bookMyOT.hideLoader();
    console.log(data);
    $("#preexistingconditions").val(data.preexistingconditions);
    $("#temperature").val(data.temperature);
    $("#respiratoryrate").val(data.respiratoryrate);
    $("#oxygensaturation").val(data.oxygensaturation);
    $("#heartrate").val(data.heartrate);
    $("#bloodpressure").val(data.bloodpressure);
    $("#gcs").val(data.gcs);
    $("#mpg").val(data.mpg);
}

function getValue(data) {
    if (data != null) {
        return ": " + data;
    }
    else {
        return ": ";
    }
}
function getPhysicianNotes(surgeryId) {
    $.ajax({
        type: "GET",
        url: "/Surgery/GetPhysicianNotes/" + surgeryId,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            debugger;
            console.log(data);
            if (data != null) {
                //if (data.caseName != undefined)
                // $("#lblCaseName").html(": " + data.caseName);
                //  $("#lblCaseNumber").html(": " + data.caseNumber);
                $("#lblPatientName").html(getValue(data.patientName));
                $("#lblAge").html(getValue(data.age));
                var gender = 'Male';
                if (data.gender == 'M') {
                    gender = 'Male';
                } else if (data.gender == 'F') {
                    gender = 'Female';
                }
                else {
                    gender = 'Others';
                }
                $("#lblGender").html(": " + gender);
                $("#lblNotesDate").html(getValue(data.noteDate));
                $("#lblStarttime").html(getValue(data.startTime));
                $("#lblEndtime").html(getValue(data.endTime));
                $("#lblPhone").html(getValue(data.phone));
                $("#lblPatientdiagnostics").html(getValue(data.patientDiagnostics));

                $("#lblTemperature").html(getValue(data.temperature));

                $("#lblRespiratoryrate").html(getValue(data.respiratoryRate));
                $("#lblOxygensaturation").html(getValue(data.oxygenSaturation));
                $("#lblHeartrate").html(getValue(data.heartRate));
                $("#lblBloodpressure").html(getValue(data.bloodPressure));
                $("#lblNotes").html(getValue(data.note1));

                $("#lblConsultantFee").html(getValue(data.consultationamount));
                $("#lblSettlementAmount").html(getValue(data.apsamount));

                if (data.documentpath.length) {
                    $("#lblDocumentPath").html(getValue(data.documentpath[0].documentpath));
                }

                if (data.endcasevital.length) {
                    $("#lblFinalRespiratoryrate").html(getValue(data.endcasevital[0].respiratoryRate));
                    $("#lblFinalPatientdiagnostics").html(getValue(data.endcasevital[0].patientDiagnostics));
                    $("#lblFinalOxygensaturation").html(getValue(data.endcasevital[0].oxygenSaturation));
                    $("#lblFinalHeartrate").html(getValue(data.endcasevital[0].heartRate));
                    $("#lblFinalBloodpressure").html(getValue(data.endcasevital[0].bloodPressure));
                    $("#lblFinalTemperature").html(getValue(data.endcasevital[0].temperature));

                }

                $('#physicianNotesDiv').html('');
                if (data.otanaesthesia != null) {
                    var otanaesthesia = '';
                    for (var i = 0; i < data.otanaesthesia.length; i++) {
                        otanaesthesia += '<span style="font-size: 15px;" class="badge ' + labelColors[i % 3] + '">' + data.otanaesthesia[i].name + '</span>'
                    }
                    var table = $('<table class="table table-striped table-bordered dataTable blue-table"><thead></thead><tbody></tbody></table>')
                    $(table).find('thead').append('<tr class="text-start fw-bold fs-7 text-uppercase gs-0"><th tabindex="0">Anaesthesia</th></tr>')
                    $(table).find('tbody').append('<tr><td>' + otanaesthesia + '</td></tr>')
                    $('#physicianNotesDiv').append(table);
                }
                if (data.otanaesthesia != null) {
                    var otpreexisitngcondition = '';
                    for (var i = 0; i < data.otpreexisitngcondition.length; i++) {
                        otpreexisitngcondition += '<span style="font-size: 15px;" class="badge ' + labelColors[i % 3] + '">' + data.otpreexisitngcondition[i].name + '</span>'
                    }
                    var table = $('<table class="table table-striped table-bordered dataTable blue-table"><thead></thead><tbody></tbody></table>')
                    $(table).find('thead').append('<tr class="text-start fw-bold fs-7 text-uppercase gs-0"><th tabindex="0">Pre Existing Condition</th></tr>')
                    $(table).find('tbody').append('<tr><td>' + otpreexisitngcondition + '</td></tr>')
                    $('#physicianNotesDiv').append(table);
                }
                if (data.otanaesthesia != null) {
                    var otsurgeries = '';
                    for (var i = 0; i < data.otsurgeries.length; i++) {
                        otsurgeries += '<span style="font-size: 15px;" class="badge ' + labelColors[i % 3] + '">' + data.otpreexisitngcondition[i].name + '</span>'
                    }
                    var table = $('<table class="table table-striped table-bordered dataTable blue-table"><thead></thead><tbody></tbody></table>')
                    $(table).find('thead').append('<tr class="text-start fw-bold fs-7 text-uppercase gs-0"><th tabindex="0">Surgeries</th></tr>')
                    $(table).find('tbody').append('<tr><td>' + otsurgeries + '</td></tr>')
                    $('#physicianNotesDiv').append(table);
                }
            }

        },
        error: function (xhr) {

        },
        beforeSend: function () {
            $('.spinner-modal').show()
        },
        complete: function () {
            $('.spinner-modal').hide();
        }
    });
}


                    //$('#datatable').on('click', '.btnTerminate', function ()