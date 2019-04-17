function GetTaskDetailsByTaskID(taskID){
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

function GetTemplateFileItemByID(templateID){
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