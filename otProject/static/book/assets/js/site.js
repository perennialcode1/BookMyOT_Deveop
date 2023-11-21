var labelColors = ['badge-light-primary', 'badge-light-success', 'badge-light-danger'];
function getOTs(hosid) {
    return $.ajax({
        type: "GET",
        //TODO:: Hospital ID should be fetched from login
        url: "/Surgery/GetOTs/" + hosid,
        //dataType: "text",
        //data: JSON.stringify({ Vid: Vid, PurpId: PurId }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#otroomid')
                        .append($("<option></option>")
                            .attr("value", data[i].oTroomid)
                            .text(data[i].name));
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
function getSpecialities() {
    return $.ajax({
        type: "GET",
        url: "/Common/GetSpecialities/",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#slSpecialities')
                        .append($("<option></option>")
                            .attr("value", data[i].specialityListId)
                            .text(data[i].name));
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
function getOTEquipment() {
    return $.ajax({
        type: "GET",
        url: "/Common/GetOTEquipment/",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#slHospitalOTEquipment')
                        .append($("<option></option>")
                            .attr("value", data[i].equid)
                            .text(data[i].name));
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
function getSurgeryTypes() {
    return $.ajax({
        type: "GET",
        url: "/Common/GetSurgeryTypes/",
        //dataType: "text",
        //data: JSON.stringify({ Vid: Vid, PurpId: PurId }),
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#surgery')
                        .append($("<option></option>")
                            .attr("value", data[i].surgerytypeid)
                            .text(data[i].name));
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
function getSurgeons(hospid) {
    return $.ajax({
        type: "GET",
        url: "/Common/GetSurgeonList/" + hospid,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            console.log(data);
            if (data != null && data.length > 0) {
                for (var i = 0; i < data.length; i++) {
                    $('#surgonid')
                        .append($("<option></option>")
                            .attr("value", data[i].surgonid)
                            .text(data[i].surgonsname));
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
$(document).ready(function () {
    "use strict";

    // Class definition
    var doctorsDataTable = function () {
        // Shared variables
        var doctorsTable;
        var doctorsDatatable;

        // Private functions
        var initDoctorsDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#doctors_table")) {
                doctorsDatatable = $(doctorsTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 6 }, // Disable ordering on column 4 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                doctorsDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleDoctorsSearchDatatable = () => {
            const filterSearch = document.querySelector('#doctor_search');
            filterSearch.addEventListener('keyup', function (e) {
                doctorsDatatable.search(e.target.value).draw();
            });
        }
        return {
            init: function () {
                doctorsTable = document.querySelector('#doctors_table');
                if (!doctorsTable) {
                    return;
                }

                initDoctorsDatatable();
                handleDoctorsSearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        doctorsDataTable.init();
    });

    // Class definition
    var preexistingconditionsDataTable = function () {
        // Shared variables
        var preexistingconditionsTable;
        var preexistingconditionsDatatable;

        // Private functions
        var initpreexistingconditionsDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#preexistingconditions_table")) {
                preexistingconditionsDatatable = $(preexistingconditionsTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 4 }, // Disable ordering on column 4 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                preexistingconditionsDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handlepreexistingconditionsSearchDatatable = () => {
            const filterSearch = document.querySelector('#preexistingconditions_search');
            filterSearch.addEventListener('keyup', function (e) {
                preexistingconditionsDatatable.search(e.target.value).draw();
            });
        }

        // Public methods
        return {
            init: function () {
                preexistingconditionsTable = document.querySelector('#preexistingconditions_table');
                if (!preexistingconditionsTable) {
                    return;
                }

                initpreexistingconditionsDatatable();
                handlepreexistingconditionsSearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        preexistingconditionsDataTable.init();
    });
    // Class definition
    var anesthesiaTypesDataTable = function () {
        // Shared variables
        var anesthesiaTypesTable;
        var anesthesiaTypesDatatable;

        // Private functions
        var initanesthesiaTypesDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#anesthesiaTypes_table")) {
                anesthesiaTypesDatatable = $(anesthesiaTypesTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 4 }, // Disable ordering on column 4 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                anesthesiaTypesDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleanesthesiaTypesSearchDatatable = () => {
            const filterSearch = document.querySelector('#doctor_search');
            filterSearch.addEventListener('keyup', function (e) {
                anesthesiaTypesDatatable.search(e.target.value).draw();
            });
        }

      

        // Public methods
        return {
            init: function () {
                anesthesiaTypesTable = document.querySelector('#anesthesiaTypes_table');
                if (!anesthesiaTypesTable) {
                    return;
                }

                initanesthesiaTypesDatatable();
                handleanesthesiaTypesSearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        anesthesiaTypesDataTable.init();
    });
    // Class definition
    var specialityDataTable = function () {
        // Shared variables
        var specialityTable;
        var specialityDatatable;

        // Private functions
        var initSpecialityDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#speciality_table")) {
                specialityDatatable = $(specialityTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 4 }, // Disable ordering on column 4 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                specialityDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleSpecialitySearchDatatable = () => {
            const filterSearch = document.querySelector('#speciality_search');
            filterSearch.addEventListener('keyup', function (e) {
                specialityDatatable.search(e.target.value).draw();
            });
        }

       

        // Public methods
        return {
            init: function () {
                specialityTable = document.querySelector('#speciality_table');
                if (!specialityTable) {
                    return;
                }

                initSpecialityDatatable();
                handleSpecialitySearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        specialityDataTable.init();
    });

    // Class definition
    var hospitalsDataTable = function () {
        // Shared variables
        var hospitalsTable;
        var hospitalsDatatable;

        // Private functions
        var initHospitalDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#hospitals_table")) {
                hospitalsDatatable = $(hospitalsTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 7 }, // Disable ordering on column 7 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                hospitalsDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleHospitalSearchDatatable = () => {
            const filterSearch = document.querySelector('#hospital_search');
            filterSearch.addEventListener('keyup', function (e) {
                hospitalsDatatable.search(e.target.value).draw();
            });
        }

       

        // Public methods
        return {
            init: function () {
                hospitalsTable = document.querySelector('#hospitals_table');
                if (!hospitalsTable) {
                    return;
                }

                initHospitalDatatable();
                handleHospitalSearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        hospitalsDataTable.init();
    });

    // Class definition
    var otsDataTable = function () {
        // Shared variables
        var otsTable;
        var otsDatatable;

        // Private functions
        var initOTDatatable = function () {
            // Init datatable --- more info on datatables: https://datatables.net/manual/
            if (!$.fn.DataTable.isDataTable("#ot_table")) {
                otsDatatable = $(otsTable).DataTable({
                    "info": true,
                    'order': [],
                    'pageLength': 10,
                    'columnDefs': [
                        { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)
                        { orderable: false, targets: 7 }, // Disable ordering on column 8 (actions)
                    ]
                });

                // Re-init functions on datatable re-draws
                otsDatatable.on('draw', function () {
                    //handleDeleteRows();
                });
            }
        }

        // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()
        var handleOTSearchDatatable = () => {
            const filterSearch = document.querySelector('#ot_search');
            filterSearch.addEventListener('keyup', function (e) {
                otsDatatable.search(e.target.value).draw();
            });
        }

     

        // Public methods
        return {
            init: function () {
                otsTable = document.querySelector('#ot_table');
                if (!otsTable) {
                    return;
                }

                initOTDatatable();
                handleOTSearchDatatable();
                //handleStatusFilter();
                //handleDeleteRows();
            },
        };
    }();

    // On document ready
    KTUtil.onDOMContentLoaded(function () {
        otsDataTable.init();
    });

   

});
$('.numberonly').keypress(function (e) {

    var charCode = (e.which) ? e.which : e.keyCode

    if (String.fromCharCode(charCode).match(/[^0-9]/g))

        return false;

});
$('.decimalonly').on('keypress',function (event) {

    if (event.shiftKey == true) {
        event.preventDefault();
    }

    if ((event.keyCode >= 48 && event.keyCode <= 57) ||
        (event.keyCode >= 96 && event.keyCode <= 105) ||
        event.keyCode == 8 || event.keyCode == 9 || event.keyCode == 37 ||
        event.keyCode == 39 || event.keyCode == 46 || event.keyCode == 190) {

    } else {
        return false;
    }

    if ($(this).val().indexOf('.') !== -1 && event.keyCode == 190)
        return false;
});

function isNumber(evt, element) {

    var charCode = (evt.which) ? evt.which : event.keyCode

    if (
        (charCode != 45 || $(element).val().indexOf('-') != -1) &&      // “-” CHECK MINUS, AND ONLY ONE.
        (charCode != 46 || $(element).val().indexOf('.') != -1) &&      // “.” CHECK DOT, AND ONLY ONE.
        (charCode < 48 || charCode > 57))
        return false;

    return true;
}