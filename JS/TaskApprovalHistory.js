var DocID = "";
var IsRejected;

$(document).ready(function () {
    DocID = getUrlParameter("DocID");
    IsRejected = getUrlParameter("IsRejected");
    try {
        if (!IsStrNullOrEmpty(DocID)) {

            if (!IsNullOrUndefined(IsRejected) && !IsStrNullOrEmpty(IsRejected)) {

                BindTasks(Number(DocID));
            }
            else {
                BindApprovalHistory(Convert.ToInt32(Request.QueryString["DocID"].ToString()));
            }
        }

        else {
            ScriptManager.RegisterStartupScript(updpnlPage, updpnlPage.GetType(), "ClosePopup", "ClosePopup(1);", true);
        }
    }
    ////Generic Exception Handle
    catch (Exception ex) {
        ApplicationLog.LogError(ex);
        lblMsg.Text = Constants.Messages.TechnicalIssueOccurrred;
    }
});
