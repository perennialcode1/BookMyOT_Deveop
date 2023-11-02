var viewMode = 'edit';
$(document).ready(function () {
    var hospitalId = GetIdParameter();
    console.log(hospitalId);
    $('#btnSaveHospital').click(function () {
        if (currentOpenSection === 'Profile') {
            var isValidData = true;
            var errorMessage = '';
            var profileData = {
                "hosid": hospitalId,
                "hospitalname": $('#txtHospitalName').val(),
                "mobile": $('#txtMobile').val(),
                "email": $('#txtEmail').val(),
                "username": $('#txtUsername').val(),
            }
            if (profileData.hospitalname == "") {
                isValidData = false;
                errorMessage += '<strong>Hospital name</strong> required<br/>'
            }
            if (profileData.username == "") {
                isValidData = false;
                errorMessage += '<strong>Username</strong> required<br/>'
            }
            if (profileData.mobile == "") {
                isValidData = false;
                errorMessage += '<strong>Mobile</strong> required<br/>'
            }
            if (!isValidData) {
                ErrorHTMLNotification(errorMessage);
                return false;
            } else {
                $.ajax({
                    type: "post",
                    url: "/Hospital/UpdateProfile",
                    data: JSON.stringify(profileData),
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json',
                    success: function (result) {
                        if (result != null && result.status) {
                            SuccessNotification("Hospital profile successfully saved!");
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
            }
        }
        else if (currentOpenSection === 'Status') {
            var isValidData = true;
            var errorMessage = '';
            var statusData = {
                "hosid": hospitalId,
                "verifiedhospots": $('#chkHospitalVerifiedOTs').is(":checked"),
                "verifiedhospdetails": $('#chkHospitalVerifieddeatils').is(":checked"),
                "verifiedhospaddress": $('#chkVerifiedhospitaladdress').is(":checked"),
                "status": $('#slHospitalStatus').val(),
                "comment": $('#txtHospitalStatusComment').val(),
            }
            if (statusData.status == null || statusData.status == "") {
                isValidData = false;
                errorMessage += '<strong>Hospital status</strong> required<br/>'
            }
            if (!isValidData) {
                ErrorHTMLNotification(errorMessage);
                return false;
            } else {
                $.ajax({
                    type: "post",
                    url: "/Hospital/UpdateStatus",
                    data: JSON.stringify(statusData),
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json',
                    success: function (result) {
                        if (result != null && result.status) {
                            SuccessNotification("Hospital status successfully saved!");
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
            }
        }
        else if (currentOpenSection === 'OTs') {
            var isValidData = true;
            var errorMessage = '';
            var profileData = {
                "hosid": hospitalId,
                "hospitalname": $('#txtHospitalName').val(),
                "mobile": $('#txtMobile').val(),
                "email": $('#txtEmail').val(),
                "username": $('#txtUsername').val(),
                "password": $('#txtPassword').val(),
                "confirmPassword": $('#txtConfirmPassword').val(),
            }
            if (profileData.hospitalname == "") {
                isValidData = false;
                errorMessage += '<strong>Hospital name</strong> required<br/>'
            }
            if (profileData.username == "") {
                isValidData = false;
                errorMessage += '<strong>Username</strong> required<br/>'
            }
            if (profileData.mobile == "") {
                isValidData = false;
                errorMessage += '<strong>Mobile</strong> required<br/>'
            }
            if (profileData.password == "") {
                isValidData = false;
                errorMessage += '<strong>Password</strong> required<br/>'
            }

            if (!isValidData) {
                ErrorHTMLNotification(errorMessage);
                return false;
            }
        }
        else if (currentOpenSection === 'Address') {
            var isValidData = true;
            var errorMessage = '';
            var addressData = {
                "hosid": hospitalId,
                "address": $('#txtAddress').val(),
                "city": $('#txtCity').val(),
                "landmark": $('#txtLandmark').val(),
                "latitude": $('#txtLatitude').val(),
                "longitude": $('#txtLongitude').val(),
                "pincode": $('#txtPincode').val(),
            }
            if (addressData.pincode == "") {
                isValidData = false;
                errorMessage += '<strong>Pincode</strong> required<br/>'
            }
            if (addressData.city == "") {
                isValidData = false;
                errorMessage += '<strong>City</strong> required<br/>'
            }
            if (addressData.address == "") {
                isValidData = false;
                errorMessage += '<strong>Address</strong> required<br/>'
            }
            if (!isValidData) {
                ErrorHTMLNotification(errorMessage);
                return false;
            } else {
                $.ajax({
                    type: "post",
                    url: "/Hospital/UpdateAddress",
                    data: JSON.stringify(addressData),
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json',
                    success: function (result) {
                        if (result != null && result.status) {
                            SuccessNotification("Hospital address successfully saved!");
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
            }
        }
        else if (currentOpenSection === 'Details') {
            var isValidData = true;
            var errorMessage = '';
            var detailsData = {
                "hosid": hospitalId,
                "estdyear": $('#txtESTDYear').val(),
                "qualityaccreditations": $('#txtQualityaccreditations').val(),
                "otcount": $('#txtOTCount').val(),
                "nameofdirector": $('#txtNameofdirector').val(),
                "contactno": $('#txtContactNumber').val(),
                "contactperson": $('#txtContactPerson').val(),
                "regnum": $('#txtRegNumber').val(),
                "specialityid": $('#slSpecialities').val(),
            }
            if (detailsData.regnum == "") {
                isValidData = false;
                errorMessage += '<strong>Reg. Number</strong> required<br/>'
            }

            if (detailsData.contactno == "") {
                isValidData = false;
                errorMessage += '<strong>Contact number</strong> required<br/>'
            }
            if (detailsData.contactno != "" && detailsData.contactno.length < 10) {
                isValidData = false;
                errorMessage += '<strong>Valid Contact number</strong> required<br/>'
            }
            if (detailsData.specialityid == "") {
                isValidData = false;
                errorMessage += '<strong>Specialities</strong> required<br/>'
            }
            if (detailsData.estdyear == "") {
                isValidData = false;
                errorMessage += '<strong>ESTD year</strong> required<br/>'
            }
            if (detailsData.otcount == "") {
                isValidData = false;
                errorMessage += '<strong>OT Count</strong> required<br/>'
            }
            if (!isValidData) {
                ErrorHTMLNotification(errorMessage);
                return false;
            } else {
                $.ajax({
                    type: "post",
                    url: "/Hospital/UpdateDetails",
                    data: JSON.stringify(detailsData),
                    dataType: 'json',
                    contentType: 'application/json',
                    accept: 'application/json',
                    success: function (result) {
                        if (result != null && result.status) {
                            SuccessNotification("Hospital details successfully saved!");
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
            }
        }
    });
    $.when(getSpecialities()).done(function (a1) {
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
                        $('#txtHospitalName').val(data.hospitalProfile.hospitalname);
                        $('#txtUsername').val(data.hospitalProfile.username);
                        $('#txtEmail').val(data.hospitalProfile.email);
                        $('#txtMobile').val(data.hospitalProfile.mobile);
                        $('#txtPassword').val('');
                        $('#txtConfirmPassword').val('');
                    }
                    if (data.hospitalDetails != null) {
                        $('#txtESTDYear').val(data.hospitalDetails.estdyear);
                        $('#txtQualityaccreditations').val(data.hospitalDetails.qualityaccreditations);
                        //$('#lblHospitalProprietor').val(data.hospitalDetails.proprietor);
                        $('#txtOTCount').val(data.hospitalDetails.otcount);
                        $('#txtNameofdirector').val(data.hospitalDetails.nameofdirector);
                        $('#txtContactNumber').val(data.hospitalDetails.contactno);
                        $('#txtContactPerson').val(data.hospitalDetails.contactperson);
                        $('#txtRegNumber').val(data.hospitalDetails.regnum);
                        $('#slSpecialities').val(data.hospitalDetails.specialityids).trigger('change');
                    }
                    if (data.hospitalAddress != null) {
                        $('#txtAddress').val(data.hospitalAddress.address);
                        $('#txtCity').val(data.hospitalAddress.city);
                        $('#txtLandmark').val(data.hospitalAddress.landmark);
                        $('#txtLatitude').val(data.hospitalAddress.latitude);
                        $('#txtLongitude').val(data.hospitalAddress.longitude);
                        $('#txtPincode').val(data.hospitalAddress.pincode);
                    }
                    if (data.hospitalStatus != null) {
                        $('#txtHospitalStatusComment').val(data.hospitalStatus.comment);
                        $('#slHospitalStatus').val(data.hospitalStatus.status).trigger('change');
                        $('#chkVerifiedhospitaladdress').prop('checked', data.hospitalStatus.verifiedhospaddress);
                        $('#chkHospitalVerifieddeatils').prop('checked', data.hospitalStatus.verifiedhospdetails);
                        $('#chkHospitalVerifiedOTs').prop('checked', data.hospitalStatus.verifiedhospots);
                        //if (data.hospitalStatus.status == 1)
                        //    $('#lblHospitalStatus').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                        //else
                        //    $('#lblHospitalStatus').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                        //if (data.hospitalStatus.verifiedhospaddress == true)
                        //    $('#lblHospitalVerifiedaddress').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                        //else
                        //    $('#lblHospitalVerifiedaddress').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                        //if (data.hospitalStatus.verifiedhospdeatils == true)
                        //    $('#lblHospitalVerifieddeatils').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                        //else
                        //    $('#lblHospitalVerifieddeatils').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                        //if (data.hospitalStatus.verifiedhospots == true)
                        //    $('#lblHospitalVerifiedOTs').html('<i class="bi bi-check-circle-fill text-success" style="font-size:30px;"></i>');
                        //else
                        //    $('#lblHospitalVerifiedOTs').html('<i class="bi bi-x-circle-fill text-danger" style="font-size:30px;"></i>');
                    }
                    if (data.hospitalOTs != null && data.hospitalOTs.length > 0) {
                        for (var i = 0; i < data.hospitalOTs.length; i++) {
                            var otEquopement = '';
                            for (var e = 0; e < data.hospitalOTs[i].equipments.length; e++) {
                                otEquopement += '<span style="font-size: 15px;" class="badge ' + labelColors[e % 3] + '">' + data.hospitalOTs[i].equipments[e] + '</span>'
                            }
                            $('#hospitalOTs_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="OTId" value="' + data.hospitalOTs[i].otroomid + '"><input type="hidden" class="otequipment" value="' + data.hospitalOTs[i].otequipment + '"><span class="fw-bold OTCode">' + data.hospitalOTs[i].code + '</span></td><td class= "pe-0"><span class="fw-bold OTName">' + data.hospitalOTs[i].name + '</span></td><td class="pe-0"><span class="fw-bold OTDescription">' + data.hospitalOTs[i].description + '</span></td><td id="tdote">' + otEquopement + '</td><td class="text-end"><button type="button" data-bs-toggle="modal" class="btn editButton" style="padding:5px;"><i class="bi bi-pencil-square text-primary" style="font-size:20px;"></i></button><button type="button" class="btn deleteButton" style="padding:5px;"><i class="bi bi-trash3-fill text-danger" style="font-size:20px;"></i></button></td></tr>');
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
    getOTEquipment();
    $("#hospitalOTs_table").on('click', '.editButton', function () {
        $('#addOTModel').modal('show');
        editId = $(this).parents('tr').find('.OTId').val();
        var name = $(this).parents('tr').find('.OTName').html();
        var code = $(this).parents('tr').find('.OTCode').html();
        var description = $(this).parents('tr').find('.OTDescription').html();
        $('#modelHeader').html('Edit OT');
        $('#name').val(name);
        $('#code').val(code);
        $('#description').val(description);
        otequipment = $(this).parents('tr').find('.otequipment').val();
        if (otequipment != "" && otequipment != null && otequipment != undefined) {
            var dd = otequipment.split(',');
            $('#slHospitalOTEquipment').val(dd).trigger('change');

        }
    });
    $("#hospitalOTs_table").on('click', '.deleteButton', function () {
        editId = $(this).parents('tr').find('.OTId').val();
        Swal.fire({
            html: `Are you sure, you want to <span class='badge badge-danger'><strong>delete</strong></span> OT Room`,
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
                if (editId > 0) {
                    $.ajax({
                        type: "get",
                        url: "/Hospital/DeleteOTRoom/" + editId,
                        dataType: 'json',
                        contentType: 'application/json',
                        accept: 'application/json',
                        success: function (result) {
                            if (result != null && result.status) {
                                $('.OTId:input[value="' + editId + '"]').parents('tr').remove()
                                if ($('#hospitalOTs_table tbody tr').length == 0) {
                                    $('#hospitalOTs_table tbody').append('<tr class="odd"><td valign="top" colspan="5" class="dataTables_empty">No OTs available in this hospital</td></tr>')
                                }
                                editId = 0;
                                SuccessNotification("OT room deleted successfully!");
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
                }
            }
        });
    });
    $('#addOT').click(function () {
        editId = 0;
        $('#addOTModel').modal('show');
        $('#modelHeader').html('Add OT');
        $('#name').val('');
        $('#code').val('');
        $('#description').val('');
        $('#description').val('');
        $('#slHospitalOTEquipment').val('').trigger('change');
    });
    var editId = 0;
    $('#btnSaveOT').click(function () {
        var payload = {
            code: $('#code').val(),
            name: $('#name').val(),
            description: $('#description').val(),
            hosid: hospitalId,
            otroomid: editId,
            otequipment: $('#slHospitalOTEquipment').val().filter(function (v) { return v !== '' })
        };
        $.ajax({
            type: "post",
            url: "/Hospital/SaveOTRoom",
            data: JSON.stringify(payload),
            dataType: 'json',
            contentType: 'application/json',
            accept: 'application/json',
            success: function (result) {
                if (result != null && result.status) {
                    console.log(result);
                    var code = $('#code').val();
                    var name = $('#name').val();
                    var description = $('#description').val();
                    $('#name').val('');
                    $('#code').val('');
                    $('#description').val('');
                    var otequipment = $('#slHospitalOTEquipment').val();
                    var ote = $('#slHospitalOTEquipment').select2('data');
                    $('#slHospitalOTEquipment').val('').trigger('change');
                    if ($('#hospitalOTs_table tbody tr').length == 1 && $('#hospitalOTs_table tbody tr td').length == 1 && $('#hospitalOTs_table tbody tr td')[0].innerHTML == 'No OTs available in this hospital') {
                        $('#hospitalOTs_table tbody tr').remove();
                    }
                    var otEquopement = '';
                    for (var e = 0; e < ote.length; e++) {
                        otEquopement += '<span style="font-size: 15px;" class="badge ' + labelColors[e % 3] + '">' + ote[e].text + '</span>'
                    }
                    if (editId > 0) {
                        var tr = $('.OTId:input[value="' + editId + '"]').parents('tr');
                        editId = $(tr).find('.OTId').val(editId);
                        $(tr).find('.OTName').html(name);
                        $(tr).find('.OTCode').html(code);
                        $(tr).find('.OTDescription').html(description);
                        $(tr).find('.otequipment').val(otequipment);
                        $(tr).find('#tdote').html(otEquopement);
                    }
                    else {
                        $('#hospitalOTs_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="OTId" value="' + result.resultData + '"><input type="hidden" class="otequipment" value="' + otequipment + '"><span class="fw-bold OTCode">' + code + '</span></td><td class= "pe-0"><span class="fw-bold OTName">' + name + '</span></td><td class="pe-0"><span class="fw-bold OTDescription">' + description + '</span></td><td id="tdote">' + otEquopement + '</td><td class="text-end"><button type="button" data-bs-toggle="modal" class="btn editButton" style="padding:5px;"><i class="bi bi-pencil-square text-primary" style="font-size:20px;"></i></button><button type="button" class="btn deleteButton" style="padding:5px;"><i class="bi bi-trash3-fill text-danger" style="font-size:20px;"></i></button></td></tr>');
                    }
                    $('#btnCancelOT').click();
                    editId = 0;
                    SuccessNotification("OT Room saved successfully!");
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
    });
    $("#hospitalSurgeons_table").on('click', '.staffEditButton', function () {
        $('#addSurgeonModel').modal('show');
        editId = $(this).parents('tr').find('.staffsurgonid').val();
        var emailid = $(this).parents('tr').find('.staffemailid').html();
        var surgonsname = $(this).parents('tr').find('.staffsurgonsname').html();
        var phone = $(this).parents('tr').find('.staffphone').html();
        var specialist = $(this).parents('tr').find('.staffspecialist').html();
        var year = $(this).parents('tr').find('.staffyear').html();
        $('#modelHeader').html('Edit Surgeon');
        $('#staffemailid').val(emailid);
        $('#staffsurgonsname').val(surgonsname);
        $('#staffphone').val(phone);
        $('#staffspecialist').val(specialist);
        $('#staffyear').val(year);
    });
    $("#hospitalSurgeons_table").on('click', '.staffDeleteButton', function () {
        editId = $(this).parents('tr').find('.staffsurgonid').val();
        Swal.fire({
            html: `Are you sure, you want to <span class='badge badge-danger'><strong>delete</strong></span> Surgeon`,
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
                if (editId > 0) {
                    $.ajax({
                        type: "get",
                        url: "/Hospital/DeleteSurgeon/" + editId,
                        dataType: 'json',
                        contentType: 'application/json',
                        accept: 'application/json',
                        success: function (result) {
                            if (result != null && result.status) {
                                $('.staffsurgonid:input[value="' + editId + '"]').parents('tr').remove()
                                if ($('#hospitalSurgeons_table tbody tr').length == 0) {
                                    $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td valign="top" colspan="6" class="dataTables_empty">No Surgeons available in this hospital</td></tr>')
                                }
                                editId = 0;
                                SuccessNotification("Surgeon deleted successfully!");
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
                }
            }
        });
    });
    $('#addSurgeon').click(function () {
        editId = 0;
        $('#addSurgeonModel').modal('show');
        $('#modelHeader').html('Add Surgeon');
        $('#staffemailid').val('');
        $('#staffsurgonsname').val('');
        $('#staffphone').val('');
        $('#staffspecialist').val('');
        $('#staffyear').val('');
    });
    var editId = 0;
    $('#btnSaveSurgeon').click(function () {
        var payload = {
            email: $('#staffemailid').val(),
            name: $('#staffsurgonsname').val(),
            phone: $('#staffphone').val(),
            specialist: $('#staffspecialist').val(),
            year: $('#staffyear').val(),
            hosid: hospitalId,
            surgonid: editId,
        };
        var isValidData = true;
        var errorMessage = '';
        if (payload.name == "") {
            isValidData = false;
            errorMessage += '<strong>Surgeon name</strong> required<br/>'
        }
        if (payload.phone == "") {
            isValidData = false;
            errorMessage += '<strong>Phone</strong> required<br/>'
        }
        else if (payload.phone.length != 10) {
            isValidData = false;
            errorMessage += '<strong>Valid phone</strong> required<br/>'
        }
        if (payload.year == "") {
            isValidData = false;
            errorMessage += '<strong>Year</strong> required<br/>'
        }
        else if (payload.year.length != 4) {
            isValidData = false;
            errorMessage += '<strong>Valid year</strong> required<br/>'
        }
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (payload.email == "") {
            isValidData = false;
            errorMessage += '<strong>Email</strong> required<br/>'
        }
        if (!regex.test(payload.email)) {
            isValidData = false;
            errorMessage += '<strong>Valid email</strong> required<br/>'
        }
        if (!isValidData) {
            ErrorHTMLNotification(errorMessage);
            return false;
        } else {
            $.ajax({
                type: "post",
                url: "/Hospital/SaveSurgeon",
                data: JSON.stringify(payload),
                dataType: 'json',
                contentType: 'application/json',
                accept: 'application/json',
                success: function (result) {
                    if (result != null && result.status) {
                        console.log(result);
                        var emailid = $('#staffemailid').val();
                        var surgonsname = $('#staffsurgonsname').val();
                        var phone = $('#staffphone').val();
                        var specialist = $('#staffspecialist').val();
                        var year = $('#staffyear').val();
                        if ($('#hospitalSurgeons_table tbody tr').length == 1 && $('#hospitalSurgeons_table tbody tr td').length == 1 && $('#hospitalSurgeons_table tbody tr td')[0].innerHTML == 'No Surgeons available in this hospital') {
                            $('#hospitalSurgeons_table tbody tr').remove();
                        }
                        if (editId > 0) {
                            var tr = $('.staffsurgonid:input[value="' + editId + '"]').parents('tr');
                            editId = $(tr).find('.staffsurgonid').val(editId);
                            $(tr).find('.staffsurgonsname').html(surgonsname);
                            $(tr).find('.staffemailid').html(emailid);
                            $(tr).find('.staffphone').html(phone);
                            $(tr).find('.staffspecialist').val(specialist);
                            $(tr).find('.staffyear').html(year);
                        }
                        else {
                            $('#hospitalSurgeons_table tbody').append('<tr class="odd"><td class="pe-0"><input type="hidden" class="staffsurgonid" value="' + result.resultData + '"><span class="fw-bold staffsurgonsname">' + surgonsname + '</span></td><td class= "pe-0"><span class="fw-bold staffphone">' + phone + '</span></td><td class="pe-0"><span class="fw-bold staffemailid">' + emailid + '</span></td><td><span class="fw-bold staffspecialist">' + specialist + '</span></td><td><span class="fw-bold staffyear">' + year + '</span></td><td class="text-end"><button type="button" data-bs-toggle="modal" class="btn staffEditButton" style="padding:5px;"><i class="bi bi-pencil-square text-primary" style="font-size:20px;"></i></button><button type="button" class="btn staffDeleteButton" style="padding:5px;"><i class="bi bi-trash3-fill text-danger" style="font-size:20px;"></i></button></td></tr>');
                        }
                        $('#btnCancelSurgeon').click();
                        editId = 0;
                        $('#staffemailid').val('');
                        $('#staffsurgonsname').val('');
                        $('#staffphone').val('');
                        $('#staffspecialist').val('');
                        $('#staffyear').val('');
                        SuccessNotification("Surgeon saved successfully!");
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
        }
    });
});