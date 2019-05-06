$(document).ready(function () {
        BindProjects();
        
    
});

function BindAnnexureGrid(project) {

    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/getbytitle('" + ListNames.ANNEXURES + "')/Items?$select=Project_x0020_Name/Title,LinkFilename,Created,Author/Name&$expand=Project_x0020_Name/Title,Author/Name&$filter=Project_x0020_Name/Title eq '"+ project + "'";
    var data = GetListData(url);
    var annexures = data.d.results;
    if (!IsNullOrUndefined(annexures) && annexures.length > 0) {
        BindGrid(annexures);
    }
}

function btnSearch_Click() {
    var project = $("#ddlProject").val() == 0 ? '' : $("select#ddlProject>option:selected").text();
    BindAnnexureGrid(project);
}

function BindProjects() {
    var userName = _spPageContextInfo.userDisplayName;
    var projects = GetProjects(userName, IsGroupMember(SPGroups.ADMIN));
    if (!IsNullOrUndefined(projects) && projects.length > 0) {
        BindDDL(projects, "ddlProject");
    }
}

function BindGrid(annexures) {

    tblAnnexure = $('#grvAnnexure').DataTable({
        "data": annexures,
        "columns": [
            
            { "data": "LinkFilename" },
            { "data": "Project Name" },
            { "data": "Created By" },
            { "data": "Created On" }
        ]
    });
}