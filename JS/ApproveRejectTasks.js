$(document).ready(function () {
  LoadTaskDetails(taskID);
});

function LoadTaskDetails(TaskID) {
  try {

    var item = GetTaskDetailsByTaskID(TaskID);
    if (item != null) {
      if (item["Total_x0020_Approvers"] == item["Approval_x0020_Completed"] || item["Approval_x0020_Status"] != TaskStatus.Pending) {
        $("#lblMsg").text("Approval process completed for the task.(ID- " + TaskID + ")");
        DisableApproveRejecteButtons();
      }

      $("#lblMsg").text(item["Title"]);
      $("#lblProjectName").text(item["Project_x0020_Name"]);
      $("#lblProcessName").text(item["Process_x0020_Name"]);
      $("#lblSalesOrderID").text(item["Sales_x0020_Order_x0020_ID"]);
      $("#lblCustomerName").text(item["Customer_x0020_Name"]);

      var letter = GetPropertyLetterByID(item["DocumentID"]);
      if (letter == null) {
        $("#lblMsg").text(Messages.TaskRelatedDocumentDeleted);
        DisableApproveRejecteButtons();
        ("#btnDeleteTask").visible = true;

      }
      $("#lblDueDate").text(item["Due_x0020_Date"]);

      $("#lblAssignedTo").text(item["Assigned_x0020_To"]);

    }
    else {
      $("#lblMsg").text("No details found for the task.(ID- " + TaskID + ")");
      DisableApproveRejecteButtons();
    }
  }
  catch (ex) {

  }
}

function DisableApproveRejecteButtons() {
  $("#btnApprove").visible = false;
  $("#btnReject").visible = false;
}

function btnApprove_click(){
  $("#btnReject").enabled = false;
  $("#btnApprove").enabled = false;

}