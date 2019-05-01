var AllDocuments;
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
    var documents = [];
    if (AllDocuments == null) {
        
        var documentList = GetSentDocuments();
        if (!IsNullOrUndefined(documentList) && documentList.length != 0) {
            BindgrvDocSelection(documentList);
        }
    }
    
}

function GetSentDocuments() {
    try {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERS + "')/Items?$select=*,Author/Title,File&$filter=Approval_x0020_Status eq 'Published'";
        if (!IsNullOrUndefined($("#ddlProject").val()) && $("#ddlProject").val() != 0) {
            url += " and Project_x0020_Name eq '" + $("select#ddlProject>option:selected").text() +"'";
        }
        if (!IsNullOrUndefined($("#ddlProcess").val()) && $("#ddlProcess").val() != 0) {
            url += " and Process_x0020_Name eq '" + $("select#ddlProcess>option:selected").text() + "'";
        }
        if (!IsNullOrUndefined($("#ddlDocType").val()) && $("#ddlDocType").val() != 0) {
            url += " and DocType_x0020_Title eq '" + $("select#ddlDocType>option:selected").text() + "'";
        }
        if (!IsNullOrUndefined($("#ddlTower").val()) && $("#ddlTower").val() != 0) {
            url += " and Tower_x0020_Name eq '" + $("select#ddlTower>option:selected").text() + "'";
        }
        if (!IsNullOrUndefined($("#ddlWing").val()) && $("#ddlWing").val() != 0) {
            url += " and Wing_x0020_Name eq '" + $("select#ddlWing>option:selected").text() + "'";
        }
        if (!IsStrNullOrEmpty($("#txtCustomerName").val())) {
            url += " and substringof('" + $("#txtCustomerName").val() + "'" + ",Customer_x0020_Name)";
        }
        if (!IsStrNullOrEmpty($("#txtSalesOrderID").val())) {
            url += " and substringof('" + $("#txtSalesOrderID").val() + "'" + ",Sales_x0020_Order_x0020_ID)";
        }
        
        var data = GetListData(url);
        return data.d.results;
    }
    catch (exception) {
        console.log(exception);
        return null;
    }
}

function BindgrvDocSelection(documents) {
    tblGenLett = $('#grvDocSelection').DataTable({
        "destroy": true,
        "data": documents,
        "columns": [
            { "data": "File.Name" },
            { "data": "DocVersion" },
            { "data": "Sales_x0020_Order_x0020_ID" },
            { "data": "Customer_x0020_Name" },
            { "data": "Tower_x0020_Name" },
            { "data": "Generated_x0020_Date" },
            { "data": "Published_x0020_Date" },
            { "data": "Published_x0020_Date" },
            {
                "data": null,
                "className": "center",
                //"defaultContent": '<a id="grvGeneratedDoc_lnkCancel" class="lnkCancel" href="#">Cancel</a>',
                "orderable": false,
                "render": function (data, type, row, meta) {
                    return "<a onclick='lnkCancel_Click(\"" + row.File.ServerRelativeUrl + "\")'>Download</a>";
                }
            }
        ]
    });

}