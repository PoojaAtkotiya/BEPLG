var url_id;
$(document).ready(function () {

    url_id = getUrlParameter("ID1");
    try {
        if (IsGroupMember(SPGroups.ADMIN)) {
            $("#btnSkipApproval").addClass("visible");
        }
        if (!IsNullOrUndefined(url_id)) {
            var letter = GetPropertyLetterByID(Number(url_id));
            if (!IsNullOrUndefined(letter) && !IsNullOrUndefined(letter.File) && !IsStrNullOrEmpty(letter.File.LinkingUrl)) {
                var src = encodeURI(letter.File.LinkingUrl);
                strIframe = "<iframe src=\"" + src + "\" width='100%' height='490px'></iframe>";
                $("#bravaviewer").html(strIframe);
            }
        }
    }
    catch (ex) {
        $("#btnSendforApproval").attr("disabled", "disabled");
        $('#lblError').html(Messages.TechnicalIssueOccurrred);
    }
});

function lnktosalesregister_Click() {
    try {
        if (!IsNullOrUndefined(url_id)) {
            var letter = GetPropertyLetterByID(Number(url_id));
            var link = String.format(PopupURL.LinkToSalesRegister, letter["Sales_x0020_Order_x0020_ID"]);
            window.open(link);
        }
    }
    catch (ex) {
        $('#lblError').html(Messages.TechnicalIssueOccurrred);
    }

}

function btnSkipApproval_Click() {
    if (!IsNullOrUndefined(url_id)) {
        var letter = GetPropertyLetterByID(Number(url_id));
        if (!IsNullOrUndefined(letter)) {
            //Open Popup based on Mode of dispatch of document.
            var modeofDispatch = !IsNullOrUndefined(letter["Mode_x0020_Of_x0020_Dispatch"]) ? letter["Mode_x0020_Of_x0020_Dispatch"].toString() : '';
            if (!IsStrNullOrEmpty(modeofDispatch) && (modeofDispatch == ModeOfDispatch.EmailBody || modeofDispatch == ModeOfDispatch.EmailBodyInternal)) {
                ClosePopup(PopupURL.SendEmailBody + "&ID=" + letter.ID + "&Skip=1");
            }
            else if (!IsStrNullOrEmpty(modeofDispatch) && (modeofDispatch == ModeOfDispatch.EmailWithAttachment || modeofDispatch == ModeOfDispatch.EmailWithAttachmentInternal)) {
                ClosePopup(PopupURL.SendEmailWithAttachment + "&ID=" + letter.ID + "&Skip=1");
            }
            else if (!IsStrNullOrEmpty(modeofDispatch) && modeofDispatch == ModeOfDispatch.HardCopy) {
                ClosePopup(PopupURL.PublishDocument + "&ID=" + letter.ID + "&Skip=1");
            }
        }
    }
}

function btnSendforApproval_Click() {
    try {
        $("#btnSendforApproval").attr("disabled", "disabled");
        if (!IsNullOrUndefined(url_id) && !IsStrNullOrEmpty(url_id)) {
            var letter = GetPropertyLetterByID(Number(url_id));
            letter["Approver_1Id"] = 12;
            if (!IsNullOrUndefined(letter) && !IsNullOrUndefined(letter["Approver_1Id"])) {
                if (letter["Approval_x0020_Status"] == "Not Processed") {
                    var newTask = {};
                    newTask["__metadata"] = {
                        "type": GetItemTypeForListName(ListNames.TASKS)
                    };
                    newTask["Title"] = String.format("{0} | {1} | {2}", letter["Sales_x0020_Order_x0020_ID"], letter["Customer_x0020_Name"], letter["DocType_x0020_Title"].DocType_x0020_Title);
                    newTask["Assigned_x0020_ToId"] = letter["Approver_1Id"];
                    newTask["Due_x0020_Date"] = new Date(new Date().getFullYear(), new Date().getMonth(), (new Date().getDate() + 2)).format("yyyy-MM-ddTHH:mm:ssZ");// DateTime.Now.AddDays(2);
                    newTask["DocumentID"] = url_id.toString();
                    newTask["Project_x0020_Name"] = letter["Project_x0020_Name"].Title;
                    newTask["Process_x0020_Name"] = letter["Process_x0020_Name"].Title;
                    newTask["Doc_x0020_Type"] = letter["DocType_x0020_Title"].DocType_x0020_Title;
                    newTask["Sales_x0020_Order_x0020_ID"] = letter["Sales_x0020_Order_x0020_ID"];
                    newTask["Customer_x0020_Name"] = letter["Customer_x0020_Name"];
                    newTask["Reference_x0020_Document_x0020_U"] = letter["FileRef"];
                    var listProps = GetListProperties(ListNames.PROPERTYLETTERS);
                    newTask["DocumentLibraryID"] = listProps.Id;//spList.ID;
                    newTask["Total_x0020_Approvers"] = Number(letter["Total_x0020_Approvers"]);
                    newTask["Approval_x0020_Pending"] = letter["Approval_x0020_Pending"];
                    newTask["Approval_x0020_Completed"] = letter["Approval_x0020_Completed"];

                    var taskUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.TASKS + "')/Items";
                    AjaxCall({
                        url: taskUrl,
                        httpmethod: 'POST',
                        async: false,
                        postData: JSON.stringify(newTask),
                        headers:
                            {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                                "X-HTTP-Method": "POST"
                            },
                        sucesscallbackfunction: function (data) {
                            var letteritem = {};
                            letteritem["__metadata"] = {
                                "type": "SP.Data.Property_x0020_LettersItem"
                            };
                            letteritem["Approval_x0020_Status"] = TaskStatus.Pending;
                            letteritem["Approver_1_Status"] = TaskStatus.Pending;
                            letteritem["SkipApproval"] = false;
                            letteritem["EditorId"] = _spPageContextInfo.userId;

                            var letterUrl = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERS + "')/Items(" + letter.ID + ")";

                            AjaxCall({
                                url: letterUrl,
                                httpmethod: 'POST',
                                async: false,
                                postData: JSON.stringify(letteritem),
                                headers:
                                    {
                                        "Accept": "application/json;odata=verbose",
                                        "Content-Type": "application/json;odata=verbose",
                                        "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                                        "X-HTTP-Method": "MERGE",
                                        "If-Match": "*"
                                    },
                                errorcallbackfunction: function (data) {
                                    $('#lblError').html(String.format(Messages.ApproverNotFound, "First approval "));
                                }
                            });
                        },
                        errorcallbackfunction: function (data) {
                            $('#lblError').html(String.format(Messages.ApproverNotFound, "First approval "));
                        }
                    });

                    ////----------- PENDING ------------------------------------
                    // SPFieldUserValue authorUserValue = new SPFieldUserValue(spWeb, letter[SPBuiltInFieldId.Author].ToString());
                    // SPUser AuthorSPUser = authorUserValue.User;
                    // SPFieldUserValue toUserValue = new SPFieldUserValue(spWeb, letter["Approver_1"].ToString());
                    // SPUser toUser = toUserValue.User;
                    // SendMailToFirstApprover(site, AuthorSPUser, toUser, Convert.ToInt32(letter["TemplateID"]), letter, newTask);
                    ShowAlert(Messages.SendApprovalSuccess);
                    ClosePopup(1);
                }
                else {
                    ShowAlert(Messages.SendApprovalSuccess);
                    ClosePopup(1);
                }
            }
            else {
                $('#lblError').html(String.format(Messages.ApproverNotFound, "First approval "));
            }
        }
    }
    catch (ex) {
        // ApplicationLog.LogError(ex);
        $("#btnSendforApproval").removeAttr("disabled");
        $('#lblError').html(Messages.TechnicalIssueOccurrred);
    }
    $("#btnSendforApproval").removeAttr("disabled");
}



