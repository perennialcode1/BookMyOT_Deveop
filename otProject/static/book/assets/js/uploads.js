var anesthesiaTypesDataTable = function () {
    // Shared variables
    var anesthesiaTypesTable;
    var anesthesiaTypesDatatable;

    // Private functions
    var initanesthesiaTypesDatatable = function () {
        // Init datatable --- more info on datatables: https://datatables.net/manual/
        if (!$.fn.DataTable.isDataTable("#imageUpload_table")) {
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
        const filterSearch = document.querySelector('#imageUpload_search');
        filterSearch.addEventListener('keyup', function (e) {
            anesthesiaTypesDatatable.search(e.target.value).draw();
        });
    }



    // Public methods
    return {
        init: function () {
            anesthesiaTypesTable = document.querySelector('#imageUpload_table');
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
$(document).ready(function () {
    bookMyOT.showLoader();
    LoadImages();
});

function LoadImages() {
    bookMyOT.ajaxGet('/Uploads/GetAllImages', GetAllSurgeryTypesSuccess, null, null);
}
function GetAllSurgeryTypesSuccess(data) {
    if (data != null) {
        var body = '';
        $.each(data, function (key, value) {
            body += `<tr><td><div class="form-check form-check-sm form-check-custom form-check-solid">
                                 <input class="form-check-input" type="checkbox" value="1"></div>
                                </td><td><img src='${value.pic}' class='rounded w-150px' style='width:100px; height:100px'</td>
                                 </td><td>${value.imageType}</td>
                                 </td><td>${value.youtubelink}</td>
                                <td class="text-center">   
                                <a href="#" class="btn btn-sm btn-light btn-active-light-primary" [data-kt-menu="true"] data-kt-menu-trigger="click" data-kt-menu-placement="bottom-end">
                                Actions<span class="svg-icon svg-icon-5 m-0"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.4343 12.7344L7.25 8.55005C6.83579 8.13583 6.16421 8.13584 5.75 8.55005C5.33579 8.96426 5.33579 9.63583 5.75 10.05L11.2929 15.5929C11.6834 15.9835 12.3166 15.9835 12.7071 15.5929L18.25 10.05C18.6642 9.63584 18.6642 8.96426 18.25 8.55005C17.8358 8.13584 17.1642 8.13584 16.75 8.55005L12.5657 12.7344C12.2533 13.0468 11.7467 13.0468 11.4343 12.7344Z" fill="currentColor"></path>
                                </svg></span></a>  <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-state-bg-light-primary fw-semibold fs-7 w-125px py-4" data-kt-menu="true">
                                                                                                                                            <div class="menu-item px-3">
                                                                                                                                                    <a href="#" picid="${value.id}"
                                                                                                                                                   class="menu-link px-3 deleteButton" data-kt-ecommerce-product-filter="delete_row">Delete</a>
                                                                                                                                            </div>
                                                                                                                                        </div></td></tr>`
        });
        $('#imageUpload_table').DataTable().destroy();
        $('#imageUpload_table tbody').empty();
        $('#imageUpload_table tbody').html(body);

        anesthesiaTypesDataTable.init();
        KTMenu.createInstances();
        $('#imageUpload_table').on('click', '.deleteButton', function () {

            var obj = {
                id: $(this).attr('picid'),
            };
            WarningNotification('Do you want to delete the image?', DeleteImage, obj);
        });
        $('#imageUpload_table').on('draw.dt', function () {
            KTMenu.createInstances();

        });

        bookMyOT.hideLoader();
    }
}

$('#btnSaveImageUpload').on('click', function () {
    debugger;
    var count = 0;
    var type = $('input[type=radio][name=rdoImageType]:checked').val();
    var fileExtension = ['jpeg', 'jpg', 'png'];
    var filename = $('#txtfileupload').val().toLowerCase();
    if (filename.length > 0) {
        var extension = filename.replace(/^.*\./, '');
        if ($.inArray(extension, fileExtension) == -1) {
            $("#txtfileupload").val('');
            ErrorNotification('Please select only jpeg or jpg or png files.');
            return false;
        }
    }
    else {
        count++;
        ErrorNotification('Please fill the required fields.');

    }
    // if (count === 0) {
    //     bookMyOT.showLoader();
    //     var fdata = new FormData();
    //     var fileUpload = $("#txtfileupload").get(0);
    //     var files = fileUpload.files;
    //     fdata.append('pic', files[0]);
    //     fdata.youtubelink = $("#link").val();
    //     debugger;
    //     //  fdata.ImageUploadType = parseInt($('input[type=radio][name=typeradio]:checked').val());
    //     console.log(baseurl);
    //     var url = '';
    //     if (parseInt(type) == 1) {
    //         url = baseurl + 'More/HospitalSlidingImages';
    //     }
    //     else {
    //         url = baseurl + 'More/SlidingImages';

    //     }
    //     $.ajax({
    //         url: url,
    //         type: 'POST',
    //         data: fdata,
    //         contentType: false,
    //         processData: false,
    //         success: function (d) {
    //             bookMyOT.hideLoader();
    //             console.log(d);
    //             SuccessNotification("Image saved successfully!");
    //             $('#btnCancelPEC').click();
    //             LoadImages();
    //         },
    //         error: function () {
    //             bookMyOT.hideLoader();
    //             ErrorNotification("Failed to save Image!");
    //         }
    //     });

    // }


});

var typeid;
var editId = 0;



function DeleteImage(obj) {

    bookMyOT.ajaxPost('/Uploads/DeleteImage', { model: obj }, 'application/json', DeleteImageSuccess, DeleteImageFail, true);
}
function DeleteImageSuccess(data) {
    if (data) {
        LoadImages();
        SuccessNotification("Image deleted successfully!");
    }
    else {
        ErrorNotification("Error occured while deleting Image!");

    }
}

function DeleteImageFail() {
    ErrorNotification("Error occured while deleting Image!");
}


$("#addImageUpload").on('click', function () {

    $("#txtfileupload").val('');
    $("#link").val('');
    $("#addImageUploadModel").modal('show');

});
