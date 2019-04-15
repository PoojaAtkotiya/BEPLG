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
    BindDDL(null, 'ddlTower');
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
    BindDDL(null, 'ddlWing');
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

        letter.isPdf = $("#chkIsPdf").is(":checked");
        letter.SalesOrderID = data.SalesOrderID;
        letter.CustomerName = data.CustomerName;
        letter.TowerName = data.TowerName;
        letter.WingName = data.Wing;
        letter.CreatedByID = _spPageContextInfo.userId;
        letter.IsReGenerate = false;
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

    return letters;
}