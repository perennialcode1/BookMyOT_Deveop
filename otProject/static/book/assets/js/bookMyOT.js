if (typeof bookMyOT === "undefined" || !bookMyOT) {

    bookMyOT = function () {
    }

    $(document).ajaxStop(function () {
        bookMyOT.hideLoader();
    });
    bookMyOT.ajaxPost = function (url, postData, contentType, callBack, failureCallback, showProgress) {

        bookMyOT.showLoader();

        url = encodeURI(url);
        $.post(url, postData, function (data, textStatus, jqXHR) {
            if (!bookMyOT.checkForErrors(data)) {
                if (callBack !== undefined && callBack !== null) {
                    callBack(data);
                    bookMyOT.hideLoader();
                }
            }
            else {
                if (failureCallback !== undefined && failureCallback !== null) {
                    failureCallback();
                    bookMyOT.hideLoader();
                }
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                bookMyOT.hideLoader();
            });
    };

    bookMyOT.ajaxGet = function (url, callBack, failureCallback, showProgress) {
        url = encodeURI(url);
        if (url != '/Home/GetCalendarData') {
            bookMyOT.showLoader();
        }
        $.get(url, function (data, textStatus, jqXHR) {
            if (!bookMyOT.checkForErrors(data)) {
                if (callBack !== undefined && callBack !== null) {
                    callBack(data);
                    bookMyOT.hideLoader();
                }
            }
            else {
                if (failureCallback !== undefined && failureCallback !== null) {
                    failureCallback();
                    bookMyOT.hideLoader();
                }
            }
        })
            .fail(function (jqXHR, textStatus, errorThrown) {
                bookMyOT.hideLoader();
            });

    };

    bookMyOT.showLoader = function (element) {
        $('.spinner-modal').show()
    }
    bookMyOT.hideLoader = function (element) {
        $('.spinner-modal').hide()
    }

    bookMyOT.checkForErrors = function (data) {
        var errorsFound = false;

        if (data === null) {
            errorsFound = true
        }

        return errorsFound;
    };
}