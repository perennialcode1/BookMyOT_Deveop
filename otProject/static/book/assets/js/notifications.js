function SuccessNotification(textMessage) {
    Swal.fire({
        text: textMessage,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    });
}
function SuccessNotification(textMessage, onConfirm) {
    Swal.fire({
        text: textMessage,
        icon: "success",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    }).then(function (result) {
        if (result.isConfirmed) {
            if (onConfirm) {
                onConfirm();
            }
        }
    });
}
function ErrorNotification(textMessage) {
    Swal.fire({
        text: textMessage,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    });
}
function ErrorHTMLNotification(HTMLMessage) {
    Swal.fire({
        html: HTMLMessage,
        icon: "error",
        buttonsStyling: false,
        confirmButtonText: "Ok, got it!",
        customClass: {
            confirmButton: "btn btn-primary"
        }
    });
}