//var currentOpenSurgerySection = 'Details';
//function GetIdParameter() {
//    var sPageURL = window.location.href;
//    var indexOfLastSlash = sPageURL.lastIndexOf("/");

//    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
//        return sPageURL.substring(indexOfLastSlash + 1);
//    else
//        return 0;
//}
//var surgeryDatePicker = new tempusDominus.TempusDominus(document.getElementById("surgerydate"), {
//    //put your config here
//});
//surgeryDatePicker.dates.formatInput = date => moment(date).format('DD-MM-YYYY HH:mm');
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

    $('#btnCodeBlue').click(function () {
        Swal.fire({
            html: `Are you sure, you want to trigger <span class='badge badge-primary'><strong>Code Blue</strong></span>`,
            icon: "question",
            buttonsStyling: false,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: 'Nope, cancel it',
            customClass: {
                confirmButton: "btn btn-primary",
                cancelButton: 'btn btn-danger'
            }
        }).then(function (result) {
            if (result.isConfirmed) {
                Swal.fire({
                    html: "You have successfully triggered <span class='badge badge-primary'><strong>Code Blue</strong></span>",
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                })
            }
        });
        
    });
    $('#saveBA').click(function () {
        var PatientName = $(this).parents('tr').find('.PatientName').html();
        var SurgeryName = $(this).parents('tr').find('.SurgeryName').html();
        $('#bamodelPatientName').html(PatientName);
        $('#bamodelSurgeryName').html(SurgeryName);
        var selectedValue = $('input[name="bookAnesthetists"]:checked').val();
        if (selectedValue == undefined) {
            ErrorNotification("Please select any option");
        }
        else if (selectedValue === '1' || selectedValue === '2') {
            var dataPayload = { surgeryid: editId, bookanesthetistype: selectedValue }
            $.ajax({
                type: "post",
                url: "/Surgery/BookAnesthetist",
                data: JSON.stringify(dataPayload),
                dataType: 'json',
                contentType: 'application/json',
                accept: 'application/json',
                success: function (data) {
                    console.log(data);
                    if (data != null && data.status) {
                        SuccessNotification('Anesthetist Booking Successful.')
                        $('#cancelBA').click();
                    }
                    else {
                        ErrorNotification("Error occured, please try again later.")
                    }
                },
                error: function (xhr) {
                    ErrorNotification("Error occured, please reachout to system admin.")
                },
                beforeSend: function () {
                    $('.spinner-modal').show()
                },
                complete: function () {
                    $('.spinner-modal').hide();
                }
            });
        }
    });
    $('#SurgeryDetailsBtn').click(function () {
        currentOpenSurgerySection = 'Details';
        $("#SurgeryDetails").show();
        $("#SurgeryReports").hide();
        $("#PhysicianNotes").hide();
    });
    $('#SurgeryReportsBtn').click(function () {
        currentOpenSurgerySection = 'Reports';
        $("#SurgeryDetails").hide();
        $("#SurgeryReports").show();
        $("#PhysicianNotes").hide();
    });
    $('#PhysicianNotesBtn').click(function () {
        currentOpenSurgerySection = 'Notes';
        $("#SurgeryDetails").hide();
        $("#SurgeryReports").hide();
        $("#PhysicianNotes").show();
    });
});