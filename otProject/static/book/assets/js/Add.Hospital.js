$(document).ready(function () {
    var hospitalId = GetIdParameter();
    $('#btnSaveHospital').click(function () {
        var isValidData = true;
        var errorMessage = '';
        if (currentOpenSection === 'Profile') {
            var profileData = {
                "hospitalname": $('#hospitalname').val(),
                "mobile": $('#mobile').val(),
                "email": $('#email').val(),
                "username": $('#username').val(),
                "password": $('#password').val(),
                "confirmpassword": $('#confirmpassword').val(),
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
                errorMessage += '<strong>Mobile number</strong> required<br/>'
            }
            if (profileData.mobile != "" && profileData.mobile.length < 10) {
                isValidData = false;
                errorMessage += '<strong>Valid Mobile number</strong> required<br/>'
            }
            if (profileData.email == "") {
                isValidData = false;
                errorMessage += '<strong>Email</strong> required<br/>'
            }
            if (profileData.password == "") {
                isValidData = false;
                errorMessage += '<strong>Password</strong> required<br/>'
            }
            if (profileData.confirmPassword == "") {
                isValidData = false;
                errorMessage += '<strong>Confirm password</strong> required<br/>'
            }
            if (profileData.confirmpassword != profileData.password) {
                isValidData = false;
                errorMessage += '<strong>Password & Confirm password</strong> is not matching<br/>'
            }
            if (!isValidData) {
                Swal.fire({
                    html: errorMessage,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "Ok, got it!",
                    customClass: {
                        confirmButton: "btn btn-primary"
                    }
                });
                return false;
            } else {
                $('#fmAddHospital').submit();
                
            }
        }
    });
});