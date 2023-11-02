var currentOpenSection = 'Profile';
function GetIdParameter() {
    var sPageURL = window.location.href;
    var indexOfLastSlash = sPageURL.lastIndexOf("/");

    if (indexOfLastSlash > 0 && sPageURL.length - 1 != indexOfLastSlash)
        return sPageURL.substring(indexOfLastSlash + 1);
    else
        return 0;
}

$(document).ready(function () {
    $('#hospitalStatusBtn').click(function () {
        currentOpenSection = 'Status';
        $("#hospitalProfile").hide();
        $("#hospitalDetails").hide();
        $("#hospitalAddress").hide();
        $("#hospitalOTs").hide();
        $("#hospitalPackageStatus").show();
        $("#hospitalPhoto").show('slow');
        $("#hospitalPhoto").addClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalSurgeons").hide();
        $("#hospitalActions").show();
    });
    $('#hospitalSurgeonsBtn').click(function () {
        currentOpenSection = 'Status';
        $("#hospitalProfile").hide();
        $("#hospitalDetails").hide();
        $("#hospitalAddress").hide();
        $("#hospitalOTs").hide();
        $("#hospitalPackageStatus").hide();
        $("#hospitalPhoto").hide('slow');
        $("#hospitalPhoto").removeClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalSurgeons").show();
        getStaff(GetIdParameter());
        $("#hospitalActions").hide();
    });
    $('#hospitalOtsBtn').click(function () {
        currentOpenSection = 'OTs';
        $("#hospitalProfile").hide();
        $("#hospitalDetails").hide();
        $("#hospitalAddress").hide();
        $("#hospitalOTs").show();
        $("#hospitalPackageStatus").hide();
        $("#hospitalPhoto").hide('slow');
        $("#hospitalPhoto").removeClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalSurgeons").hide();
        $("#hospitalActions").hide();
    });
    $('#hospitalAddressBtn').click(function () {
        currentOpenSection = 'Address';
        $("#hospitalPhoto").show('slow');
        $("#hospitalPhoto").addClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalProfile").hide();
        $("#hospitalDetails").hide();
        $("#hospitalAddress").show();
        $("#hospitalOTs").hide();
        $("#hospitalPackageStatus").hide();
        $("#hospitalSurgeons").hide();
        $("#hospitalActions").show();
    });
    $('#hospitalDetailsBtn').click(function () {
        currentOpenSection = 'Details';
        $("#hospitalProfile").hide();
        $("#hospitalDetails").show();
        $("#hospitalAddress").hide();
        $("#hospitalOTs").hide();
        $("#hospitalPackageStatus").hide();
        $("#hospitalPhoto").show('slow');
        $("#hospitalPhoto").addClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalSurgeons").hide();
        $("#hospitalActions").show();
    });
    $('#hospitalProfileBtn').click(function () {
        currentOpenSection = 'Profile';
        $("#hospitalProfile").show();
        $("#hospitalDetails").hide();
        $("#hospitalAddress").hide();
        $("#hospitalOTs").hide();
        $("#hospitalPackageStatus").hide();
        $("#hospitalPhoto").show('slow');
        $("#hospitalPhoto").addClass('d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px mb-7');
        $("#hospitalSurgeons").hide();
        $("#hospitalActions").show();
    });
});
function getStaff(hospid) {
    return $.ajax({
        type: "GET",
        url: "/Common/GetSurgeonList/" + hospid,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            $('#hospitalSurgeons_table tbody tr').remove();
            if (viewMode == "view") {
                if (data != null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="staffsurgonid" value="' + data[i].surgonid + '"><span class="fw-bold staffsurgonsname">' + data[i].surgonsname + '</span></td><td class= "pe-0"><span class="fw-bold staffphone">' + data[i].phone + '</span></td><td class="pe-0"><span class="fw-bold staffemailid">' + data[i].emailid + '</span></td><td><span class="fw-bold staffspecialist">' + data[i].specialist + '</span></td><td><span class="fw-bold staffyear">' + data[i].year + '</span></td></tr>');
                    }
                } else {
                    $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td valign="top" colspan="5" class="dataTables_empty">No Surgeons available in this hospital</td></tr>')
                }
            } else {
                if (data != null && data.length > 0) {
                    for (var i = 0; i < data.length; i++) {
                        $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="staffsurgonid" value="' + data[i].surgonid + '"><span class="fw-bold staffsurgonsname">' + data[i].surgonsname + '</span></td><td class= "pe-0"><span class="fw-bold staffphone">' + data[i].phone + '</span></td><td class="pe-0"><span class="fw-bold staffemailid">' + data[i].emailid + '</span></td><td><span class="fw-bold staffspecialist">' + data[i].specialist + '</span></td><td><span class="fw-bold staffyear">' + data[i].year + '</span></td><td class="text-end"><button type="button" data-bs-toggle="modal" class="btn staffEditButton" style="padding:5px;"><i class="bi bi-pencil-square text-primary" style="font-size:20px;"></i></button><button type="button" class="btn staffDeleteButton" style="padding:5px;"><i class="bi bi-trash3-fill text-danger" style="font-size:20px;"></i></button></td></tr>');
                    }
                } else {
                    $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No Surgeons available in this hospital</td></tr>')
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