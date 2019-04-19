function GetTaskDetailsByTaskID(taskID) {
    var taskitem = null;
    try {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.TASKS + "')/items(" + taskID + ")";
        GetMasterData(url, function (items) {
            taskitem = items;
        });
    }

    catch (ex) {
    }
    return taskitem;

}

function UpdateTaskItem(TaskID, Comments, ApprovalStatus, siteUrl, sEmail, isAdmin) {
    var strMessage = null;
    try {
        var userId = _spPageContextInfo.userId;
        var loginName = _spPageContextInfo.userLoginName;
        var existingTaskItem = GetTaskDetailsByTaskID(TaskID);

        if(existingTaskItem["Approval_x0020_Status"] == TaskStatus.Pending && existingTaskItem["Approval_x0020_Pending"] != 0){

        }

    }
    catch (ex) {

    }
}

function GetSPFileByLibAndDocID(DocLibID, DocID){

}

function GetTemplateFileItemByID(templateID) {
    var templateitem = null;
    try {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROJECTTEMPLATES + "')/items(" + templateID + ")";
        GetMasterData(url, function (items) {
            templateitem = items;
        });
    }

    catch (ex) {
    }
    return templateitem;

}