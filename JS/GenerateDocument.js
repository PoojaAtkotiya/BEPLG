var AllCustomer;
var Customer;
var G_LETTERS;
$(document).ready(function () {
    BindSearchParameter();
});

function BindSearchParameter() {
    BindProjects();
    BindProcesses();
    BindDocType();
    BindTowerName();
    BindWing();
    BindgrvDocSelection();
    BindGeneratedLetters();
}

function BindProjects() {
    var userName = _spPageContextInfo.userDisplayName;
    var projects = GetProjects(userName, IsGroupMember(SPGroups.ADMIN));
    if (!IsNullOrUndefined(projects) && projects.length > 0) {
        BindDDL(projects, "ddlProject");
    }
}

function BindProcesses() {
    var processes = GetAllProcess();
    if (!IsNullOrUndefined(processes) && processes.length > 0) {
        BindDDL(processes, "ddlProcess");
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

function BindTowerName() {
    $("#ddlTower").html('');
    $("#ddlTower").html("<option value=''>---Select---</option>");
    if (!IsNullOrUndefined($("#ddlProject").val())) {

        var dictionary = {};
        dictionary["ProjectName"] = !IsNullOrUndefined($("#ddlProject").val()) ? '' : $("select#ddlProject>option:selected").text();

        var towers = GetTowersOfProject(dictionary);
        // List < string > keyValueJSONResult = JsonConvert.DeserializeObject<List<string>>(jsonString);
        // if (keyValueJSONResult != null && keyValueJSONResult.Count != 0) {
        //     ddlTower.DataSource = keyValueJSONResult;
        //     ddlTower.DataBind();
        // }

        $(towers).each(function (i, e) {
            var cmditem = towers[i];
            var opt = $("<option/>");

            opt.text(cmditem);
            opt.attr("value", cmditem);
            opt.appendTo($("#ddlTower"));
        });

    }
}

function BindWing() {
    $("#ddlWing").html('');
    $("#ddlWing").html("<option value=''>---Select---</option>");
    if (!IsNullOrUndefined($("#ddlProject").val())) {

        var dictionary = {};
        dictionary["ProjectName"] = !IsNullOrUndefined($("#ddlProject").val()) ? '' : $("select#ddlProject>option:selected").text();

        var wings = GetWingsOfProject(dictionary);

        $(wings).each(function (i, e) {
            var cmditem = wings[i];
            var opt = $("<option/>");
            opt.text(cmditem);
            opt.attr("value", cmditem);
            opt.appendTo($("#ddlWing"));
        });

    }
}

function BindGeneratedLetters() {

}

function ddlProject_SelectedIndexChanged(sel) {
    $("#ddlProcess").val('');
    BindTowerName();
    BindWing();
    $("#txtCustomerName").val('');
    $("#txtSalesOrderID").val('');
    BindgrvDocSelection();
    $("#btnGenerate").attr("disabled", "disabled");
    AllCustomer = null;
    BindDocType();
}

function ddlProcess_SelectedIndexChanged() {
    BindDocType();
}

function ddlDocType_SelectedIndexChanged() {
    BindgrvDocSelection();
    $("#btnGenerate").attr("disabled", "disabled");
    AllCustomer = null;
}

function btnSearch_Click() {
    var customers = [];
    if (AllCustomer == null) {
        var searchDict = {};
        searchDict["ProjectName"] = $("#ddlProject").val() == 0 ? '' : $("select#ddlProject>option:selected").text();
        searchDict["LoginUser"] = _spPageContextInfo.userEmail;
        searchDict["IsAdmin"] = IsGroupMember(SPGroups.ADMIN);
        searchDict["IsCancelled"] = false; //GetIsCancelStatus(ddlDocType.SelectedItem.Text)); //create in masterhelper js file

        var customerList = GetCustomerData(searchDict);

        customerList.forEach(cust => {
            var newcustomer = {};
            newcustomer.SalesOrderID = cust.SalesOrderID;
            newcustomer.FlatNo = cust.FlatNo;
            newcustomer.Wing = cust.Wing;
            newcustomer.CustomerName = cust.CustomerName;
            newcustomer.CSEEmail = cust.CSEEmail;
            newcustomer.CRMEmail = cust.CRMEmail;
            newcustomer.TowerName = cust.TowerName;
            customers.push(newcustomer);
        });
        AllCustomer = customers;
    }
    if (AllCustomer != null) {
        customers = AllCustomer;
        if (customers != null && customers.length != 0) {
            if (!IsGroupMember(SPGroups.ADMIN)) {
                // customers = customers.Where(p => p.CSEEmail.ToLower().Contains(LoginUser.UserEmail.ToLower()) || p.CRMEmail.ToLower().Contains(LoginUser.UserEmail.ToLower())).ToList();

                //customers = customers.filter(c=> c.CSEEmail.toLowerCase().indexOf())
            }
            if (!IsNullOrUndefined($("#ddlTower").val()) && $("#ddlTower").val() != 0) {
                customers = customers.filter(c => c.TowerName == $("select#ddlTower>option:selected").text());
            }
            if (!IsNullOrUndefined($("#ddlWing").val()) && $("#ddlWing").val() != 0) {
                customers = customers.filter(c => c.Wing == $("select#ddlWing>option:selected").text());
            }
            if (!IsStrNullOrEmpty($("#txtCustomerName").val())) {
                customers = customers.filter(c => c.CustomerName.toLowerCase().indexOf($("#txtCustomerName").val().toLowerCase()));
            }
            if (!IsStrNullOrEmpty($("txtSalesOrderID").val())) {
                var salesOrderIds = $("txtSalesOrderID").val().split(',');
                //Add Prefix 00 in each sales order id;

                salesOrderIds.forEach(salesOrderId => {
                    salesOrderId = IsStrNullOrEmpty(salesOrderId) ? salesOrderId : "00" + salesOrderId;
                });

                customers = customers.filter(c => salesOrderIds.indexOf(c.SalesOrderID));
                if (customers == null || customers.length == 0) {
                    ShowAlert('Sales Order is Not Mapped or Not Found');
                }
            }
            BindgrvDocSelection(customers);
            Customer = customers;
            if (customers != null && customers.length != 0)
                $("#btnGenerate").removeAttr("disabled");
            else
                $("#btnGenerate").attr("disabled", "disabled");
        }
    }
}

function BindgrvDocSelection(customers) {
    $('#tbody_grvDocSelection').empty();
    if (!IsNullOrUndefined(customers) && customers.length > 0) {
        customers.forEach(cust => {
            var tr = $('<tr/>');
            tr.append("<td scope='col'> <input type='checkbox' value='a' class='childgrvChk' name='chk_grvDocSelection' /></td > ");
            tr.append("<td>" + cust.CustomerName + "</td>");
            tr.append("<td>" + cust.SalesOrderID + "</td>");
            tr.append("<td>" + cust.TowerName + "</td>");
            tr.append("<td>" + cust.Wing + "</td>");
            tr.data('data-cust', cust);
            $('#tbody_grvDocSelection').append(tr);
        });
    } else {
        var tr = $('<tr/>');
        tr.append("<td colspan='6' class='no_record'>No Record Found</td>");
    }

}

function click_btnGenerate() {
    var letters = [];
    $('[name=chk_grvDocSelection]:checked').each(function () {
        var $tr = $(this).closest('tr');
        var data = $tr.data('data-cust');
        var letter = {};
        letter.ProjectName = $("select#ddlProject>option:selected").text();
        letter.ProjectID = Number($("#ddlProject").val());
        letter.ProcessName = $("select#ddlProcess>option:selected").text();
        letter.ProcessID = Number($("#ddlProcess").val());
        letter.TemplateID = Number($("#ddlDocType").val());
        letter.DocType = $("select#ddlDocType>option:selected").text();
        letter.DocTypeID = Number($("#ddlDocType").val());

        letter.isPdf = $("#chkIsPdf").is(":checked");
        letter.SalesOrderID = data.SalesOrderID;
        letter.CustomerName = data.CustomerName;
        letter.TowerName = data.TowerName;
        letter.WingName = data.Wing;
        letter.CreatedByID = _spPageContextInfo.userId;
        letter.IsReGenerate = false;
        letter.Title = "";
        letter.ID = "";
        letter.DocTypeCode = '';
        letter.Parameter = '';
        letter.ApprovalWorkflow = false;
        letter.Approver1 = '';
        letter.Approver2 = '';
        letter.Approver3 = '';
        letter.Approver4 = '';
        letter.FinalApprover = '';
        letter.FinalSignatory = '';
        letter.ApprovalStatus = DocApprovalStatus.NotProcessed;
        letter.Comments = '';
        letter.GeneratedDate = new Date();
        letter.PublishedDate = new Date();
        letter.Platform = '';
        letter.TotalApprovers = Number();
        letter.ApprovalPending = Number();
        letter.ApprovalCompleted = Number();
        letter.CustomerCanRequest = false;
        letter.CustomerVisible = false;
        letter.CustomerRead = false;
        letter.ModeofDispatch = '';
        letter.AutomationRequirement = false;
        letter.Combiningtobedone = false;
        letter.SMSRequired = false;
        letter.SMSContent = false;
        letter.SignaturetobeShown = false;
        letter.LetterURL = '';
        letter.isDynamic = false;
        letter.PreparedBy = '';
        letter.Messages = null;
        letter.ApproverDetails = '';

        letters.push(letter);
    });

    if (letters.length != 0) {
        //Open Acknoledgement Message Popup.
        // Session["letters"] = letters;
        window.G_LETTERS = letters;
        // sessvars.$.flush();
        OpenSPModelDialog(PopupURL.AcknowledgeMessage);
    }
    else {
        ShowAlert('" + Constants.Messages.SelectCustomer + "');
    }
}

function GenerateLetters(letters, isAdmin) {
    if (IsNullOrUndefined(letters.Messages)) {
        var url = "https://generatedocuments.azurewebsites.net/api/GenerateDocuments"
        AjaxCall(
            {
                url: url,
                httpmethod: 'POST',
                async: false,
                postData: JSON.stringify(letters),
                headers:
                    {
                        "Accept": "application/json;odata=verbose",
                        "Content-Type": "application/json;odata=verbose",
                        "X-RequestDigest": $("#__REQUESTDIGEST").val()
                    },
                sucesscallbackfunction: function (data) {
                    letters = data;
                }
            });
    }
    return letters;
}

function SetApproverdata(letter) {
    var dicapprovers = GetEmailID(letter.ProjectName, letter.SalesOrderID, letter.DocType);
    if (letter.ApprovalWorkflow) {
        ////Check for Approver 1
        if (!IsNullOrUndefined(letter.Approver1) && !IsStrNullOrEmpty(letter.Approver1)) {
            if (dicapprovers.hasOwnProperty(letter.Approver1)) //DoesUserExist(dicapprovers[letter.Approver1] ---> Pending
            {
                letter.ApproverDetails = dicapprovers[letter.Approver1];
                letter.Approver1 = dicapprovers[letter.Approver1];
                letter.TotalApprovers = 1;
            }
            else {
                if (letter.Messages == null)
                    letter.Messages = [];

                //--- Pending -------------------
                // letter.Messages.Add(new Message() { ErrorMessage = string.Format(Constants.Messages.ApproverNotFound, letter.Approver1), ErrorType = ErrorType.Error });
            }
        }
        ////Check for Approver 2
        if (!IsNullOrUndefined(letter.Approver2) && !IsStrNullOrEmpty(letter.Approver2)) {

            if (dicapprovers.indexOf(letter.Approver2)) { // && helper.DoesUserExist(dicapprovers[letter.Approver2])) 
                letter.ApproverDetails = letter.ApproverDetails + dicapprovers[letter.Approver2];
                letter.Approver2 = dicapprovers[letter.Approver2];
                letter.TotalApprovers = 2;
            }
            else {
                if (letter.Messages == null)
                    letter.Messages = [];
                // letter.Messages.Add(new Message() { ErrorMessage = string.Format(Constants.Messages.ApproverNotFound, letter.Approver2), ErrorType = ErrorType.Error });
            }
        }
        ////Check for Approver 3
        if (!IsNullOrUndefined(letter.Approver3) && !IsStrNullOrEmpty(letter.Approver3)) {
            if (dicapprovers.ContainsKey(letter.Approver3)) //&& helper.DoesUserExist(dicapprovers[letter.Approver3]))
            {
                letter.ApproverDetails = letter.ApproverDetails + dicapprovers[letter.Approver3];
                letter.Approver3 = dicapprovers[letter.Approver3];
                letter.TotalApprovers = 3;
            }
            else {
                if (letter.Messages == null)
                    letter.Messages = [];
                // letter.Messages.Add(new Message() { ErrorMessage = string.Format(Constants.Messages.ApproverNotFound, letter.Approver3), ErrorType = ErrorType.Error });
            }
        }
        ////Check for Approver 4
        if (!IsNullOrUndefined(letter.Approver4) && !IsStrNullOrEmpty(letter.Approver4)) {
            if (dicapprovers.ContainsKey(letter.Approver4))//&& helper.DoesUserExist(dicapprovers[letter.Approver4])) 
            {
                letter.ApproverDetails = letter.ApproverDetails + dicapprovers[letter.Approver4];
                letter.Approver4 = dicapprovers[letter.Approver4];
                letter.TotalApprovers = 4;

            }
            else {
                if (letter.Messages == null)
                    letter.Messages = [];
                //letter.Messages.Add(new Message() { ErrorMessage = string.Format(Constants.Messages.ApproverNotFound, letter.Approver4), ErrorType = ErrorType.Error });
            }
        }

        ////Check for FinalSignatory
        if (!IsNullOrUndefined(letter.FinalSignatory) && !IsStrNullOrEmpty(letter.FinalSignatory)) {
            if (dicapprovers.ContainsKey(letter.FinalSignatory))//&& helper.DoesUserExist(dicapprovers[letter.Approver4])) 
            {
                letter.ApproverDetails = letter.ApproverDetails + dicapprovers[letter.FinalSignatory];
                letter.FinalSignatory = dicapprovers[letter.FinalSignatory];
            }
            else {
                if (letter.Messages == null)
                    letter.Messages = [];
                //letter.Messages.Add(new Message() { ErrorMessage = string.Format(Constants.Messages.ApproverNotFound, letter.Approver4), ErrorType = ErrorType.Error });
            }
        }
    }
}