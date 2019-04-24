var id;
var tblProject;
$(document).ready(function () {
    id = getUrlParameter("ID");
    if (!IsNullOrUndefined(id) && !IsStrNullOrEmpty(id)) {
        BindProjectGrid();
    }
    else {
        BindGrid([]);
    }
});

function BindProjectGrid() {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROJECTMASTER + "')/Items?$select=ID,Title,City,State&$orderby=Title&$filter=IsActive eq 1";
    var data = GetListData(url);
    var projects = data.d.results;
    if (!IsNullOrUndefined(projects) && projects.length > 0) {
        BindGrid(projects);
    }
}

function btnPublish_Click() {
    // return confirm(Messages.PublishDocumentConfirm);
    if (!IsNullOrUndefined(id) && !isNaN(id)) {
        //ShowWaitDialog();
        //get file from PropertyLettersTemplate library 
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROPERTYLETTERSTEMPLATE + "')/Items(" + id + ")/?$select=File,ID,Process_x0020_NameId&$expand=File";
        var data = GetListData(url);
        var template = data.d;
        if (!IsNullOrUndefined(template) && !IsNullOrUndefined(template) && !IsNullOrUndefined(template.File) && !IsStrNullOrEmpty(template.File.ServerRelativeUrl)) {
            var serverRelUrl = template.File.ServerRelativeUrl;
            var fileName = template.File.Name;
            var templateId = template.Id;
            var processNameId = template["Process_x0020_NameId"];
            $('[name=chkProjects]:checked').each(function () {
                var $tr = $(this).closest('tr');
                var data = tblProject.row($tr[0]).data();

                //var projectName = data.Title;
                var projectId = data.ID;
                var toPath = '/sites/PLG_Dev/' + ListNames.PROJECTTEMPLATES + '/' + projectId + '_' + fileName;
                var fileItemResult = CopyFile(serverRelUrl, toPath);
                var newId = (!IsNullOrUndefined(fileItemResult) && !IsNullOrUndefined(fileItemResult.ID)) ? fileItemResult.ID : null;

                //update other file properties in project temp library
                if (!IsNullOrUndefined(newId) && !isNaN(newId)) {
                    var listData = {};
                    listData["__metadata"] = { type: 'SP.Data.Project_x0020_TemplatesItem' }
                    listData["DocType_x0020_TitleId"] = templateId;
                    listData["Process_x0020_NameId"] = processNameId;
                    listData["Project_x0020_NameId"] = projectId;

                    $.ajax({
                        url: _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.PROJECTTEMPLATES + "')/items(" + newId + ")",
                        type: 'POST',
                        data: JSON.stringify(listData),
                        async: false,
                        headers:
                            {
                                "Accept": "application/json;odata=verbose",
                                "Content-Type": "application/json;odata=verbose",
                                "X-RequestDigest": $("#__REQUESTDIGEST").val(),
                                "IF-MATCH": "*",
                                "X-HTTP-Method": "MERGE"
                            },
                        success: function (data) {
                        },
                        error: function (data) {
                        }
                    });
                }

            });
        }
        ClosePopup(1);
    }

}

function BindGrid(projects) {

    tblProject = $('#grvProjects').DataTable({
        "data": projects,
        "columns": [
            {
                "data": null,
                "className": "center",
                "defaultContent": '<input  type="checkbox" name="chkProjects" class="childgrvProjects">',
                "orderable": false

            },
            { "data": "Title" },
            { "data": "ID", "class": "hiddencol" },
            { "data": "State" },
            { "data": "City" }
        ]
    });
}