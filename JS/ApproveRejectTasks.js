$(document).ready(function () {
  taskID = getUrlParameter('ID');
  LoadTaskDetails(taskID);
  var isAdmin = IsGroupMember(SPGroups.ADMIN);
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

function btnApprove_click() {
  $("#btnReject").enabled = false;
  $("#btnApprove").enabled = false;


  var taskapprovaldetails = {};
  taskapprovaldetails.TaskID = taskID;
  taskapprovaldetails.ApprovalStatus = TaskStatus.Approved;
  taskapprovaldetails.Comments = document.getElementById('txtComments').value;
  taskapprovaldetails.UserEmail = _spPageContextInfo.userEmail;
  $("#lblMsg").text = UpdateTaskItem(taskapprovaldetails, isAdmin);

}

function UpdateTaskItem(taskapprovaldetails, isAdmin) {
  var strMessage = "";
      var url = "https://prod-21.centralindia.logic.azure.com:443/workflows/cdab15fc64f5494bb225d5c536d72267/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=8XBKNEsQXk4j_AVxt1C8jZsnGNb-wawyywRxce_OxpA"
      AjaxCall(
          {
              url: url,
              httpmethod: 'POST',
              async: false,
              postData: JSON.stringify(taskapprovaldetails),
              headers:
                  {
                      // "Accept": "application/json;odata=verbose",
                      "Content-Type": "application/json;",
                      // "X-RequestDigest": $("#__REQUESTDIGEST").val()
                  },
              sucesscallbackfunction: function (data) {
                strMessage = data;
              }
          });
  
  return strMessage;
}