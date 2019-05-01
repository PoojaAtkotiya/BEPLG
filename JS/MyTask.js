var tblPendingTasks;
var tblMyPendingTasks;
$(document).ready(function () {
    BindSearchParameter();
});

function BindSearchParameter() {
    BindProjects();
    BindProcesses();
    BindDocType();
    // BindDocTypeCSR();
    BindDocTypeME();
    // BindDocTypeScan();
    BindTasksGrid();
    // BindTasksGridCSR();
    BindTasksGridME();
    // BindTasksGridScan();
}

function BindProjects() {
    var userName = _spPageContextInfo.userDisplayName;
    var projects = GetProjects(userName, IsGroupMember(SPGroups.ADMIN));
    if (!IsNullOrUndefined(projects) && projects.length > 0) {
        BindDDL(projects, "ddlProject");
        BindDDL(projects, "ddlProjectME");
        // BindDDL(projects, "ddlProjectScan");
        // BindDDL(projects, "ddlProjectCSR");
    }
}

function BindProcesses() {
    var processes = GetAllProcess();
    if (!IsNullOrUndefined(processes) && processes.length > 0) {
        BindDDL(processes, "ddlProcess");
        BindDDL(processes, "ddlProcessME");
        // BindDDL(processes, "ddlProcessCSR");
        // BindDDL(processes, "ddlProcessScan");
    }
}

function BindDocType() {
    var docTypes = GetDocumentType(Number($('#ddlProject').val()), Number($('#ddlProcess').val()));
    if (!IsNullOrUndefined(docTypes) && docTypes.length > 0) {
        //BindDDL(docTypes, "ddlDocType");
        var elementId = "ddlDocType";
        $("#" + elementId).html('');
        $("#" + elementId).html("<option value=''>---Select---</option>");
        docTypes = docTypes.filter(d => d.Platform == "SharePoint");
        $(docTypes).each(function (i, e) {
            var cmditem = docTypes[i];
            var opt = $("<option/>");
            opt.text(cmditem["DocType_x0020_Title"]["DocType_x0020_Title"]);
            opt.attr("value", cmditem["Id"]);
            opt.appendTo($("#" + elementId));
        });
    }
}

function BindDocTypeCSR() {
    var docTypes = GetDocumentType(Number($('#ddlProjectCSR').val()), Number($('#ddlProcessCSR').val()));
    if (!IsNullOrUndefined(docTypes) && docTypes.length > 0) {
        var elementId = "ddlProcessCSR";
        $("#" + elementId).html('');
        $("#" + elementId).html("<option value=''>---Select---</option>");
        //docTypes = docTypes.filter(d => d.Platform == "SharePoint");
        $(docTypes).each(function (i, e) {
            var cmditem = docTypes[i];
            var opt = $("<option/>");
            opt.text(cmditem["DocType_x0020_Title"]["DocType_x0020_Title"]);
            opt.attr("value", cmditem["Id"]);
            opt.appendTo($("#" + elementId));
        });
    }
}

function BindDocTypeME() {
    var docTypes = GetDocumentType(Number($('#ddlProjectME').val()), Number($('#ddlProcessME').val()));
    if (!IsNullOrUndefined(docTypes) && docTypes.length > 0) {
        var elementId = "ddlDocTypeME";
        $("#" + elementId).html('');
        $("#" + elementId).html("<option value=''>---Select---</option>");
        //docTypes = docTypes.filter(d => d.Platform == "SharePoint");
        $(docTypes).each(function (i, e) {
            var cmditem = docTypes[i];
            var opt = $("<option/>");
            opt.text(cmditem["DocType_x0020_Title"]["DocType_x0020_Title"]);
            opt.attr("value", cmditem["Id"]);
            opt.appendTo($("#" + elementId));
        });
    }
}

function BindDocTypeScan() {
    var docTypes = GetDocumentType(Number($('#ddlProjectScan').val()), Number($('#ddlProcessScan').val()));
    if (!IsNullOrUndefined(docTypes) && docTypes.length > 0) {
        var elementId = "ddlDocTypeScan";
        $("#" + elementId).html('');
        $("#" + elementId).html("<option value=''>---Select---</option>");
        //docTypes = docTypes.filter(d => d.Platform == "SharePoint");
        $(docTypes).each(function (i, e) {
            var cmditem = docTypes[i];
            var opt = $("<option/>");
            opt.text(cmditem["DocType_x0020_Title"]["DocType_x0020_Title"]);
            opt.attr("value", cmditem["Id"]);
            opt.appendTo($("#" + elementId));
        });
    }
}

function BindTasksGrid() {

    var conditions = [];
    conditions.push("<Eq><FieldRef Name='Approval_x0020_Status' /><Value Type='Choice'>" + TaskStatus.Pending + "</Value></Eq>");

    if (!IsGroupMember(SPGroups.ADMIN)) {
        conditions.push("<Eq><FieldRef Name='Assigned_x0020_ToId' /><Value Type='Text'>" + _spPageContextInfo.userId + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlProject").val())) {
        conditions.push("<Eq><FieldRef Name='Project_x0020_Name' /><Value Type='Text'>" + $("select#ddlProject>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlProcess").val())) {
        conditions.push("<Eq><FieldRef Name='Process_x0020_Name' /><Value Type='Text'>" + $("select#ddlProcess>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlDocType").val())) {
        conditions.push("<Eq><FieldRef Name='Doc_x0020_Type' /><Value Type='Text'>" + $("select#ddlDocType>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#txtCustomerName").val())) {
        conditions.push("<Contains><FieldRef Name='Customer_x0020_Name' /><Value Type='Text'>" + $("#txtCustomerName").val() + "</Value></Contains>");
    }
    if (!IsStrNullOrEmpty($("#txtSalesOrderID").val())) {
        conditions.push("<Eq><FieldRef Name='Sales_x0020_Order_x0020_ID' /><Value Type='Text'>00" + $("#txtSalesOrderID").val() + "</Value></Eq>");
    }

    var merged = MergeCAMLConditions(conditions, MergeType.AND);
    var whereClause = "<Where>" + merged + "</Where>" +
        "<OrderBy>" +
        "<FieldRef Name='Project_x0020_Name' />" +
        "</OrderBy>";

    var viewXml = "<View>" + "<Query>" + whereClause + "</Query>" + "</View>";

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.TASKS + "')/GetItems(query=@v1)?" + "@v1={\"ViewXml\":\"" + viewXml + "\"}";
    var data = GetListData(url, "POST");
    var tasks = data.d.results;
    if (!IsNullOrUndefined(tasks) && tasks.length > 0) {
        $("#lblCount").html(tasks.length);
        BindPendingTasks(tasks);
    }
    else {
        BindPendingTasks([]);
    }
    if (!IsGroupMember(SPGroups.ADMIN)) {
        tblPendingTasks.columns(9).visible(false);
        tblPendingTasks.columns(2).visible(false);
    }
}

function BindTasksGridME() {
    var conditions = [];
    if (!IsGroupMember(SPGroups.ADMIN)) {
        conditions.push("<Eq><FieldRef Name='AuthorId' /><Value Type='Text'>" + _spPageContextInfo.userId + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlProjectME").val())) {
        conditions.push("<Eq><FieldRef Name='Project_x0020_Name' /><Value Type='Text'>" + $("select#ddlProjectME>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlProcessME").val())) {
        conditions.push("<Eq><FieldRef Name='Process_x0020_Name' /><Value Type='Text'>" + $("select#ddlProcessME>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#ddlDocTypeME").val())) {
        conditions.push("<Eq><FieldRef Name='Doc_x0020_Type' /><Value Type='Text'>" + $("select#ddlDocTypeME>option:selected").text() + "</Value></Eq>");
    }
    if (!IsStrNullOrEmpty($("#txtCustomerNameME").val())) {
        conditions.push("<Contains><FieldRef Name='Customer_x0020_Name' /><Value Type='Text'>" + $("#txtCustomerNameME").val() + "</Value></Contains>");
    }
    if (!IsStrNullOrEmpty($("#txtSalesOrderIDME").val())) {
        conditions.push("<Eq><FieldRef Name='Sales_x0020_Order_x0020_ID' /><Value Type='Text'>00" + $("#txtSalesOrderIDME").val() + "</Value></Eq>");
    }

    var merged = MergeCAMLConditions(conditions, MergeType.AND);
    var whereClause = "<Where>" + merged + "</Where>" +
        "<OrderBy>" +
        "<FieldRef Name='Project_x0020_Name' />" +
        "</OrderBy>";

    var viewXml = "<View>" + "<Query>" + whereClause + "</Query>" + "</View>";

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.TASKS + "')/GetItems(query=@v1)?" + "@v1={\"ViewXml\":\"" + viewXml + "\"}";
    var data = GetListData(url, "POST");
    var tasks = data.d.results;
    if (!IsNullOrUndefined(tasks) && tasks.length > 0) {
        $("#lblCountME").html(tasks.length);
        BindMyPendingTasks(tasks);
    }
    else {
        BindMyPendingTasks([]);
    }
    if (!IsGroupMember(SPGroups.ADMIN)) {
        tblMyPendingTasks.columns(9).visible(false);
        tblMyPendingTasks.columns(11).visible(false);
        tblMyPendingTasks.columns(2).visible(false);
    }
}
function BindTasksGridCSR() {

}
function BindTasksGridScan() {

}

function ddlProjectProcess_SelectedIndexChanged() {
    BindDocType();
}

function ddlProjectProcessME_SelectedIndexChanged() {
    BindDocTypeME();
}

function ddlProjectProcessScan_SelectedIndexChanged() {
    BindDocTypeScan();
}

function ddlProjectProcessCSR_SelectedIndexChanged() {
    BindDocTypeCSR();
}

function BindPendingTasks(tasks) {
    tblPendingTasks = $('#grvPendingApproval').DataTable({
        "destroy": true,
        "data": tasks,
        "columns": [
            { "data": "Doc_x0020_Type", },
            { "data": "Project_x0020_Name" },
            { "data": "Process_x0020_Name" },
            { "data": "Sales_x0020_Order_x0020_ID" },
            { "data": "Customer_x0020_Name" },
            { "data": "Total_x0020_Approvers", },
            { "data": "Approval_x0020_Pending", },
            { "data": "Approval_x0020_Completed", },
            { "data": "Due_x0020_Date", },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return GetUserNamebyUserID(row.Assigned_x0020_ToId);
                }
            },
            {
                "data": null,
                "orderable": false,
                "className": "center",
                "render": function (data, type, row, meta) {
                    return "<a name='grvPendingApproval_linkRedirect' href='ApproveRejectTask.aspx?ID=" + row.ID + "'>Approve/Reject</a>"
                }
            }
        ]
    });
}

function BindMyPendingTasks(tasks) {
    tblMyPendingTasks = $('#grvPendingApprovalME').DataTable({
        "destroy": true,
        "data": tasks,
        "columns": [
            { "data": "Doc_x0020_Type", },
            { "data": "Project_x0020_Name" },
            { "data": "Process_x0020_Name" },
            { "data": "Sales_x0020_Order_x0020_ID" },
            { "data": "Customer_x0020_Name" },
            { "data": "Total_x0020_Approvers", },
            { "data": "Approval_x0020_Pending", },
            { "data": "Approval_x0020_Completed", },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return "<a href='#' onclick=\"ShowPopUp('show approval status','TaskApprovalHistory.aspx?isdlg=1&DocID=" + row.ID + "',1)\">" + row.Approval_x0020_Status + "</a>";

                }
            },
            {
                "data": null,
                "render": function (data, type, row, meta) {
                    return GetUserNamebyUserID(row.AuthorId);
                }
            },
            {
                "data": null,
                "orderable": false,
                "className": "center",
                "render": function (data, type, row, meta) {
                    if (row.Approval_x0020_Status == TaskStatus.Approved) {
                        if (row["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.EmailBody || row["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.EmailBodyInternal) {
                            hrefTag = "OpenSPModelDialog('" + PopupURL.SendEmailBody + "&ID=" + row["ID"] + "');";
                            return "<a onclick=\"" + hrefTag + "\">Send Email</a>";
                        }
                        else if (row["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.EmailWithAttachment || row["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.EmailWithAttachmentInternal) {
                            hrefTag = "OpenSPModelDialog('" + PopupURL.SendEmailWithAttachment + "&ID=" + row["ID"] + "');";
                            return "<a onclick=\"" + hrefTag + "\">Send Email</a>";
                        }
                        else if (row["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.HardCopy) {
                            hrefTag = "OpenSPModelDialog('" + PopupURL.PublishDocument + "&ID=" + row["ID"] + "');";
                            return "<a onclick=\"" + hrefTag + "\">Publish Document</a>";
                        }
                    }
                    else if (row["Approval_x0020_Status"] == TaskStatus.Rejected) {
                        hrefTag = "RedirectToMyTaskPage('" + dr["ID"] + "');";
                        return "<a onclick=\"" + hrefTag + "\">Re-Generate Document</a>";
                    }
                    else {
                        return "";
                    }
                }
            },
            {
                "data": null,
                "orderable": false,
                "className": "center",
                "render": function (data, type, row, meta) {
                    if (row.Approval_x0020_Status == "Pending") {
                        return "<a onclick='grvPendingApprovalME_lnkDelete_click(" + row.ID + ")' name='grvPendingApprovalME_lnkDelete'>Cancel</a>"
                    }
                    else {
                        return "";
                    }
                }
            }
        ]
    });
}

function grvPendingApprovalME_lnkDelete_click(id) {
    var letterDetails = GetPropertyLetterByID(Number(id));
    if (!IsNullOrUndefined(letterDetails)) {

        // if (CancelProcess(Number(id))) {
        //     WCFServiceHelper servicehelper = new WCFServiceHelper();
        //     SPFieldLookupValue project = new SPFieldLookupValue(letterDetails["Project_x0020_Name"].ToString());
        //     SPFieldLookupValue docType = new SPFieldLookupValue(letterDetails["DocType_x0020_Title"].ToString());
        //     Dictionary < string, string > userDetails = servicehelper.GetEmailID(project.LookupValue, lnkdelete.CommandArgument, docType.LookupValue);
        //     if (helper.SendDeleteNotification(letterDetails, userDetails))
        //         ScriptManager.RegisterStartupScript(updpnlPage, updpnlPage.GetType(), "alert", "ShowAlert('" + Constants.Messages.ProcessDelete + "');", true);
        // }
        // BindTasksGridME();
    }
    else {
        //ScriptManager.RegisterStartupScript(updpnlPage, updpnlPage.GetType(), "alert", "ShowAlert('Not able to find specified letter');", true);
    }
}

var s = 0;
function ShowPopUp(Title, URL, typ) {
    s = typ;
    var options = {
        url: URL,
        title: Title,
        width: 900,
        height: 750,
        dialogReturnValueCallback: CloseAcknowledgement
    }
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    return false;
}

function CloseAcknowledgement(dialogResult, returnValue) {
    if (dialogResult == "1") {

        if (s == 1)
            document.getElementById("<%= btnSearch.ClientID%>").click();
        else if (s == 2)
            document.getElementById("<%= btnSearchCSR.ClientID%>").click();
    }
}

function CloseCallback(dialogResult, returnValue) {
    if (returnValue == "1") {
        var activeIndex = parseInt($('#<%=hidAccordionIndex.ClientID %>').val());

        if (activeIndex == 0) {
            document.getElementById("<%= btnSearch.ClientID%>").click();
        }
        else if (activeIndex == 1) {
            document.getElementById("<%= btnSearchME.ClientID%>").click();
        }
        else if (activeIndex == 2) {
            document.getElementById("<%= btnSearchCSR.ClientID%>").click();
        }

    }
}

function btnSearch_click() {
    BindTasksGrid();
}

function btnReset_click() {
    $("#ddlProcess").val("");
    $("#ddlProject").val("");
    $("#ddlDocType").val("");
    $("#txtSalesOrderID").val("");
    $("#txtCustomerName").val("");
    BindDocType();
    BindTasksGrid();

}

function btnSearchME_Click() {
    BindTasksGridME();
}

function btnResetME_Click() {
    $("#ddlProcessME").val("");
    $("#ddlProcessME").val("");
    $("#ddlDocTypeME").val("");
    $("#txtSalesOrderIDME").val("");
    $("#txtCustomerNameME").val("");
    BindMyPendingTasks([]);
}