$(document).ready(function () {
    LoadTaskDetails(taskID);
});

function LoadTaskDetails(TaskID){
var item = GetTaskDetailsByTaskID(TaskID);
if(item != null){
  if(item["Total_x0020_Approvers"] == item["Approval_x0020_Completed"] || item["Approval_x0020_Status"] != TaskStatus.Pending){

}
}
}