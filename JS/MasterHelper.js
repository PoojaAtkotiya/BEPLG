function GetProjects(userName, isAdmin) {
    var projects = null;
    var whereClause = "";

    if (isAdmin) {
        whereClause = "<Where><Eq><FieldRef Name='IsActive' /><Value Type='Boolean'>1</Value></Eq></Where><OrderBy><FieldRef Name='LinkTitle' /></OrderBy>";

    } else {
        whereClause = "<Where><And><Or><Or><Or><Or><Or><Or><Or><Or><Or><Or><Or><Or>" +
            "<Eq><FieldRef Name='CSE' /><Value Type='User'>" + userName + "</Value></Eq>" +
            "<Eq><FieldRef Name='CRM' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='CRM_x0020_Head' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Segment_x0020_Head' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Authorised_x0020_Signatory' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Accounts' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Accounts_x0020_MIS' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Finance' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Legal' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Projects' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='SVP_x0020_Sales' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Director_x0020_Sales' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='Site_x0020_Head' /><Value Type='User'>" + userName + "</Value></Eq></Or>" +
            "<Eq><FieldRef Name='IsActive' /><Value Type='Boolean'>1</Value></Eq></And>" +
            "</Where><OrderBy><FieldRef Name='LinkTitle' /></OrderBy>";
    }
    var viewXml = "<View>" + "<Query>" + whereClause + "</Query>" + "</View>";

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('" + ListNames.PROJECTMASTER + "')/GetItems(query=@v1)?" + "@v1={\"ViewXml\":\"" + viewXml + "\"}";
    GetMasterData(url, function (items) {
        projects = items;
    }, 'POST');

    return projects;
}

function GetAllProcess() {
    var processes = null;
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('" + ListNames.PROCESSMASTER + "')/items?$select=Title,Id";
    GetMasterData(url, function (items) {
        processes = items;
    });
    return processes;
}

function GetDocumentType(projectId, processId) {
    var documentType = null;
    var url = '';
    if (projectId != 0 && processId == 0) {
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROJECTTEMPLATES + "')/Items?$select=DocType_x0020_Title/DocType_x0020_Title,ID,Platform&$expand=DocType_x0020_Title/DocType_x0020_Title&$orderby=DocType_x0020_Title&$filter=Project_x0020_NameId eq " + projectId;
    }
    else {
        url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROJECTTEMPLATES + "')/Items?$select=DocType_x0020_Title/DocType_x0020_Title,ID,Platform&$expand=DocType_x0020_Title/DocType_x0020_Title&$orderby=DocType_x0020_Title&$filter=(Project_x0020_NameId eq " + projectId + ") and (Process_x0020_NameId eq " + processId + ")";
    }
    GetMasterData(url, function (items) {
        documentType = items;
    });
    return documentType;
}

function GetMasterData(url, handleData, type) {
    var httpmethod = !IsStrNullOrEmpty(type) ? type : 'GET';
    if (!IsNullOrUndefined(url) && url != '') {
        AjaxCall(
            {
                url: url,
                httpmethod: httpmethod,
                async: false,
                headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                sucesscallbackfunction: function (data) {
                    if (!IsNullOrUndefined(data) && !IsNullOrUndefined(data.d) && !IsNullOrUndefined(data.d.results)) {
                        handleData(data.d.results);
                    }
                }
            });
    }
}

function PropertyLetterIsExists(letters) {

    letters.forEach(letter => {
        var qry = "<Where><And><And><And><And><And><Eq><FieldRef Name='DocType_x0020_Title' /><Value Type='Lookup'>" + letter.DocType + "</Value></Eq><Eq><FieldRef Name='Process_x0020_Name' /><Value Type='Lookup'>" + letter.ProcessName + "</Value></Eq></And>" +
            "<Eq><FieldRef Name='Project_x0020_Name' /><Value Type='Lookup'>" + letter.ProjectName + "</Value></Eq></And><Eq><FieldRef Name='Sales_x0020_Order_x0020_ID' /><Value Type='Text'>" + letter.SalesOrderID + "</Value></Eq></And><Neq><FieldRef Name='Approval_x0020_Status' /> <Value Type='Choice'>" + DocApprovalStatus.Rejected + "</Value> </Neq></And><Neq><FieldRef Name='Approval_x0020_Status' /> <Value Type='Choice'>" + DocApprovalStatus.Published + "</Value> </Neq></And></Where>";

        var viewXml = "<View>" + "<Query>" + qry + "</Query>" + "</View>";
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/Web/Lists/getByTitle('" + ListNames.PROPERTYLETTERS + "')/GetItems(query=@v1)?" + "@v1={\"ViewXml\":\"" + viewXml + "\"}";

        GetMasterData(url, function (result) {

            var totalitems = result.length;

            if (totalitems != 0 && totalitems > 0) {
                letter.Messages = [];
                letter.Messages.push()
            }

        }, "POST");

    });
}

function GetProjectTemplateData(letters) {
    letters.forEach(letter => {
        if (IsNullOrUndefined(letter.Messages) || letter.Messages.length == 0) {
            try {
                var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROJECTTEMPLATES + "')/items(" + letter.TemplateID + ")";
                var data = GetListData(url);
                var result = data.d;

                letter.DocTypeCode = result["DocTypeCode"] != null ? result["DocTypeCode"].toString() : '';
                letter.ApprovalWorkflow = Boolean(result["Approval_x0020_Workflow"]);
                letter.DocTypeID = result["DocType_x0020_TitleId"]
                letter.Approver1 = result["Approver_x0020_1"] != null && result["Approver_x0020_1"].toString() != "none" ? result["Approver_x0020_1"].toString() : '';
                letter.Approver2 = result["Approver_x0020_2"] != null && result["Approver_x0020_2"].toString() != "none" ? result["Approver_x0020_2"].toString() : '';
                letter.Approver3 = result["Approver_x0020_3"] != null && result["Approver_x0020_3"].toString() != "none" ? result["Approver_x0020_3"].toString() : '';
                letter.Approver4 = result["Approver_x0020_4"] != null && result["Approver_x0020_4"].toString() != "none" ? result["Approver_x0020_4"].toString() : '';
                letter.FinalSignatory = result["Final_x0020_Signatory"] != null && result["Final_x0020_Signatory"].toString() != "none" ? result["Final_x0020_Signatory"].toString() : '';
                letter.Platform = result["Platform"] != null ? result["Platform"].toString() : '';
                letter.ModeofDispatch = result["Mode_x0020_Of_x0020_Dispatch"] != null ? result["Mode_x0020_Of_x0020_Dispatch"].toString() : '';
                letter.CustomerCanRequest = Boolean(result["CustomerCanRequest"]);
                letter.CustomerVisible = Boolean(result["Customer_x0020_Visible"]);
                letter.isDynamic = Boolean(result["IsDynamic"]);
                letter.SMSRequired = Boolean(result["SMS_x0020_Required"]);
                letter.SMSContent = Boolean(result["SMS_x0020_Content"]);
                letter.Combiningtobedone = Boolean(result["Combining_x0020_to_x0020_be_x0020_done"]);
                letter.PreparedBy = result["Prepared_x0020_By"] != null && result["Prepared_x0020_By"].toString() != "none" ? result["Prepared_x0020_By"].toString() : '';
                //letter.SignaturetobeShown = result["Signature_x0020_to_x0020_be_x0020_Shown"] != null && result["Signature_x0020_to_x0020_be_x0020_Shown"].toString() != "none" ? result["Signature_x0020_to_x0020_be_x0020_Shown"].toString() : '';

                letter.GeneratedDate = new Date();
            }
            catch (ex) {
                // ApplicationLog.LogError(ex);
                //if (letter.Messages == null)
                //     letter.Messages = new List<Message>();
                // letter.Messages.Add(new Message() { ErrorMessage = "System Error:During get project template data", ErrorType = ErrorType.Error });
            }
        }
    });
    return letters;
}

function GetIsCancelStatus(DocType) {
    if (DocType == DocTypes.CancellationRefundmemo || DocType == DocTypes.CancellationRefundCoveringLetter) {
        return "YES";
    }
    else {
        return "NO";
    }
}

function GetApproverList(inputPara) {
    var dicapprovers = {};
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.APPROVERMASTER + "')/items?$select=Role/Title,UserId,User/EMail,User/Title,SalesOrderId,ProjectName/Id,ProjectName/Title&$expand=Role/Title,User/EMail,User/Title,ProjectName/Title";
    GetMasterData(url, function (result) {
        dicapprovers = result;
    });
    return dicapprovers;
}

function GetPropertyLetterByID(id) {
    var letteritem = null;
    try {
        //  var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROPERTYLETTERS + "')/items(" + iD + ")?$select=*,File&$expand=File";
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROPERTYLETTERS + "')/items(" + id + ")?$select=*,File,Project_x0020_Name/Title,Process_x0020_Name/Title,DocType_x0020_Title/DocType_x0020_Title&$expand=File,Project_x0020_Name/Title,Process_x0020_Name/Title,DocType_x0020_Title/DocType_x0020_Title";
        var data = GetListData(url);
        letteritem = data.d;
    }
    catch (ex) {
    }
    return letteritem;

}

function GetNotProcessedLetters(currentUserId, IsAdmin) {
    try {
        var url = "";
        if (IsAdmin) {
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERS + "')/Items?$select=*,Author/Title,File&$expand=Author/Title,File&$orderby=Generated_x0020_Date desc&$filter=Approval_x0020_Status eq 'Not Processed'";
        } else {
            url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERS + "')/Items?$select=*,Author/Title,File&$expand=Author/Title,File&$orderby=Generated_x0020_Date desc&$filter=(Approval_x0020_Status eq 'Not Processed') and (AuthorId eq " + currentUserId + ")";
        }
        var data = GetListData(url);
        return data.d.results;
    }
    catch (exception) {
        console.log(exception);
        return null;
    }
}

function CancelProcess(docRelUrl) {
    var returnvalue = false;
    try {
        var url = _spPageContextInfo.siteAbsoluteUrl + "/_api/web/getfilebyserverrelativeurl('" + docRelUrl + "')"
        //var url = _spPageContextInfo.webAbsoluteUrl + "_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERS + "')/items(" + SalesOrderID + ")";
        AjaxCall(
            {
                url: url,
                httpmethod: 'POST',
                async: false,
                headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                        "X-HTTP-Method": "DELETE",
                        "If-Match": "*"
                    },
                sucesscallbackfunction: function (data) {
                    returnvalue = true;
                },
                errorcallbackfunction: function (data) {
                    returnvalue = false;
                }
            });
    }
    catch (ex) {
        console.log(ex);
        returnvalue = false;
    }
    return returnvalue;
}

// function GetPropertyLetterByID(id) {
//     var item;
//     try {
//         var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROPERTYLETTERS + "')/items(" + id + ")";
//         var data = GetListData(url);
//         item = data.d;
//     }
//     catch (ex) {
//         // ApplicationLog.LogError(ex);
//     }
//     return item;
// }