var viewMode = 'view';
$(document).ready(function () {
    var hospitalId = GetIdParameter();
    $.ajax({
        type: "GET",
        url: "/hospital/Get/" + hospitalId,
        //dataType: "text",
        //data: JSON.stringify({ Vid: Vid, PurpId: PurId }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null) {
                if (data.hospitalProfile != null) {
                    $('#lblHospitalName').html(': ' + data.hospitalProfile.hospitalname);
                    $('#lblHospitalFirstname').html(': ' + data.hospitalProfile.firstname);
                    $('#lblHospitalLastname').html(': ' + data.hospitalProfile.lastname);
                    $('#lblHospitalUsername').html(': ' + data.hospitalProfile.username);
                    $('#lblHospitalEmail').html(': ' + data.hospitalProfile.email);
                    $('#lblHospitalMobile').html(': ' + data.hospitalProfile.mobile);
                    $('#lblHospitalNameDetails').html(': ' + data.hospitalProfile.hospitalname);
                }
                if (data.hospitalDetails != null) {
                    $('#lblHospitalESTDYear').html(': ' + data.hospitalDetails.estdyear);
                    $('#lblHospitalIsotequiped').html(': ' + data.hospitalDetails.isotequiped);
                    $('#lblHospitalQualityaccreditations').html(': ' + data.hospitalDetails.qualityaccreditations);
                    $('#lblHospitalProprietor').html(': ' + data.hospitalDetails.proprietor);
                    $('#lblHospitalOTCount').html(': ' + data.hospitalDetails.otcount);
                    $('#lblHospitalNameofdirector').html(': ' + data.hospitalDetails.nameofdirector);
                    $('#lblHospitalContactNumber').html(': ' + data.hospitalDetails.contactno);
                    $('#lblHospitalContactPerson').html(': ' + data.hospitalDetails.contactperson);
                    $('#lblHospitalRegNumber').html(': ' + data.hospitalDetails.regnum);
                    $('#lblHospitalSpeciality').html(': ' + data.hospitalDetails.specialities);
                }
                if (data.hospitalAddress != null) {
                    $('#lblHospitalAddress').html(': ' + data.hospitalAddress.address);
                    $('#lblHospitalCity').html(': ' + data.hospitalAddress.city);
                    $('#lblHospitalLandmark').html(': ' + data.hospitalAddress.landmark);
                    $('#lblHospitalLatitude').html(': ' + data.hospitalAddress.latitude);
                    $('#lblHospitalLongitude').html(': ' + data.hospitalAddress.longitude);
                    $('#lblHospitalPincode').html(': ' + data.hospitalAddress.pincode);
                }
                if (data.hospitalStatus != null) {
                    $('#lblHospitalComment').html(': ' + data.hospitalStatus.comment);
                    if (data.hospitalStatus.status == 1)
                        $('#lblHospitalStatus').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                    else
                        $('#lblHospitalStatus').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                    if (data.hospitalStatus.verifiedhospaddress == true)
                        $('#lblHospitalVerifiedaddress').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                    else
                        $('#lblHospitalVerifiedaddress').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                    if (data.hospitalStatus.verifiedhospdeatils == true)
                        $('#lblHospitalVerifieddeatils').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                    else
                        $('#lblHospitalVerifieddeatils').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                    if (data.hospitalStatus.verifiedhospots == true)
                        $('#lblHospitalVerifiedOTs').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                    else
                        $('#lblHospitalVerifiedOTs').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                }
                if (data.hospitalOTs != null && data.hospitalOTs.length > 0) {
                    for (var i = 0; i < data.hospitalOTs.length; i++) {
                        var otEquopement = '';
                        for (var e = 0; e < data.hospitalOTs[i].equipments.length; e++) {
                            otEquopement += '<span style="font-size: 15px;" class="badge ' + labelColors[e % 3] + '">' + data.hospitalOTs[i].equipments[e] + '</span>'
                        }
                        $('#hospitalOTs_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="OTId" value="' + data.hospitalOTs[i].otroomid + '"><input type="hidden" class="otequipment" value="' + data.hospitalOTs[i].otequipment + '"><span class="fw-bold OTCode">' + data.hospitalOTs[i].code + '</span></td><td class= "pe-0"><span class="fw-bold OTName">' + data.hospitalOTs[i].name + '</span></td><td class="pe-0"><span class="fw-bold OTDescription">' + data.hospitalOTs[i].description + '</span></td><td id="tdote">' + otEquopement + '</td></tr>');
                    }
                } else {
                    $('#hospitalOTs_table tbody').append('<tr class="odd"><td valign="top" colspan="5" class="dataTables_empty">No OTs available in this hospital</td></tr>')
                }
            }
            else {
                window.location.href = window.location.href;
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
});