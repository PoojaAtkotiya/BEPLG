var currentUser = {};
$(function () {
    LoadCurrentUser();

});
/*****************Start Development on 10th April 2019 by Pooja Atkotiya ************************/
function LoadCurrentUser() {
    AjaxCall(
        {
            url: CommonConstant.SPSITEURL + "/_api/web/currentuser/?$expand=groups",
            httpmethod: 'GET',
            calldatatype: 'JSON',
            async: false,
            headers: {
                Accept: "application/json;odata=verbose"
            },
            sucesscallbackfunction: function (data) {
                currentUser = data.d;
            }
        });

}

function AjaxCall(options) {
    var url = options.url;
    var postData = options.postData;
    var httpmethod = options.httpmethod;
    var calldatatype = options.calldatatype;
    var headers = options.headers == undefined ? "" : options.headers;
    var sucesscallbackfunction = options.sucesscallbackfunction;
    var errorcallbackfunction = options.errorcallbackfunction;
    var contentType = options.contentType == undefined ? "application/x-www-form-urlencoded;charset=UTF-8" : options.contentType;
    var showLoading = options.showLoading == undefined ? true : options.showLoading;
    var async = options.async == undefined ? true : options.async;

    jQuery.ajax({
        type: httpmethod,
        url: url,
        data: postData,
        headers: headers,
        global: showLoading,
        dataType: calldatatype,
        contentType: contentType,
        async: async,
        success: function (data) {
            if (data && data.Status != undefined && data.Status == "VALIDATION_ERROR") {
                ShowError(data.Data);
            }
            else {
                if (sucesscallbackfunction != '' && !IsNullOrUndefined(sucesscallbackfunction)) {
                    sucesscallbackfunction(data);
                }
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            if (!UserAborted(xhr)) {
                //SaveErrorInList(xhr.responseText, "Error");
                //AlertModal("Error", "Oops! Something went wrong");
                if (!IsNullOrUndefined(errorcallbackfunction)) {
                    errorcallbackfunction(xhr);
                }
            }
        }
    });
}

function UserAborted(xhr) {
    return !xhr.getAllResponseHeaders();
}

function IsGroupMember(groupName) {
    var isAuthorized = false;
    if (!IsNullOrUndefined(currentUser.Groups) && !IsNullOrUndefined(currentUser.Groups.results) && currentUser.Groups.results.length > 0) {
        var currentUserGrps = currentUser.Groups.results;
        if (currentUserGrps.some(grp => grp.LoginName == groupName)) {
            isAuthorized = true;
        }
    }
}

function BindDDL(result, elementId) {
    //var elementId = $(this).attr('id');
    var elementType = jQuery("#" + elementId).attr('cType');
    var valueBindingColumn = $("#" + elementId).attr('valuebindingcolumn');
    var textBindingColumn = $("#" + elementId).attr('textbindingcolumn');
    switch (elementType) {
        case "combo":
            $("#" + elementId).html('');
            $("#" + elementId).html("<option value=''>---Select---</option>");
            if (!IsNullOrUndefined(valueBindingColumn) && !IsNullOrUndefined(textBindingColumn) && valueBindingColumn != '' && textBindingColumn != '') {
                $(result).each(function (i, e) {
                    var cmditem = result[i];
                    var opt = $("<option/>");
                    opt.text(cmditem[textBindingColumn]);
                    opt.attr("value", cmditem[valueBindingColumn]);
                    opt.appendTo($("#" + elementId));
                });
            }
            break;
        case "listbox":
            break;
    }
}


function GetListData(url, type) {
    var httpmethod = !IsStrNullOrEmpty(type) ? type : 'GET';
    var result;
    AjaxCall(
        {
            url: url,
            httpmethod: httpmethod,
            calldatatype: 'JSON',
            async: false,
            headers:
                {
                    "Accept": "application/json;odata=verbose",
                    "Content-Type": "application/json; odata=verbose",
                    "X-RequestDigest": $("#__REQUESTDIGEST").val()
                },
            sucesscallbackfunction: function (data) {
                result = data;
            }
        });

    return result;
}

function GetUserEmailbyUserID(userid) {
    var userEmail = "";
    if (!IsNullOrUndefined(userid)) {
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getuserbyid(" + userid + ")";
        headers = {
            "Accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "X-HTTP-Method": "POST"
        };

        AjaxCall(
            {
                url: url,
                httpmethod: 'GET',
                calldatatype: 'JSON',
                async: false,
                headers: headers,
                sucesscallbackfunction: function (data) {
                    userEmail = data.d.Email;
                }
            });
    }
    return userEmail;
}

function ensureUser(webUrl, loginName) {
    var payload = { 'logonName': loginName };
    $.ajax({
        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/ensureuser",
        type: "POST",
        contentType: "application/json;odata=verbose",
        data: JSON.stringify(payload),
        headers: {
            "X-RequestDigest": $("#__REQUESTDIGEST").val(),
            "accept": "application/json;odata=verbose"
        },
        success: {},
        error: {}
    });
}

function getUrlParameter(name) {
    name = name.toLowerCase().replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
};

function CopyFile(fromPath, toPath) {
    var fileItemResult;
    var oUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + fromPath + "')/copyto(strnewurl='" + toPath + "',boverwrite=true)";
    $.ajax({
        url: oUrl,
        type: "POST",
        async: false,
        headers: {
            "Accept": "application/json; odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function (data) {
            var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/GetFileByServerRelativeUrl('" + toPath + "')?select=ListItemAllFields&$expand=ListItemAllFields";
            var data = GetListData(url);
            fileItemResult = data.d.ListItemAllFields;
        },
        error: function (data) {
            console.log(data);
        }
    });
    return fileItemResult;
}

function GetItemTypeForListName(name) {
    return "SP.Data." + name.charAt(0).toUpperCase() + name.split(" ").join("").slice(1) + "ListItem";
}