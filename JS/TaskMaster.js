function GetTaskDetailsByTaskID(taskID) {
    var taskitem = null;
    try {
        var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.TASKS + "')/items(" + taskID + ")";

        var data = GetListData(url);
        taskitem = data.d;

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

        if (existingTaskItem["Approval_x0020_Status"] == TaskStatus.Pending && existingTaskItem["Approval_x0020_Pending"] != 0) {
            var propLetter = GetPropertyLetterByID(existingTaskItem["DocumentID"]);
            var templateID = propLetter["TemplateID"];

            if (ApprovalStatus = TaskStatus.Approved) {
                // if not last approver then only create new item
                var noOfApproverTurn = 0;
                if (existingTaskItem["Approval_x0020_Pending"] != "1") {
                    var newTask = {};
                    newTask["__metadata"] = {
                        "type": GetItemTypeForListName(ListNames.TASKS)
                    };

                    var copyItem = {};
                    for (var propertyName in sourceItem) {
                        if (sourceItem.hasOwnProperty(propertyName)) {
                            if (sourceItem[propertyName] != null && sourceItem[propertyName].hasOwnProperty('__deferred'))  //exclude deffered objects 
                            {
                                continue;
                            }
                            if (propertyName == 'GUID' || propertyName == 'ID' || propertyName == 'Id') {
                                continue;
                            }
                            if (propertyName == '__metadata') {
                                var targetItemType = GetItemTypeForListName(targetListName);
                                copyItem['__metadata'] = { 'type': targetItemType };
                            }
                            else {
                                copyItem[propertyName] = sourceItem[propertyName];
                            }
                        }
                    }


                }
            }
        }

    }
    catch (ex) {

    }
    return strMessage;
}

function GetSPFileByLibAndDocID(DocLibID, DocID) {

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