const CommonConstant = {
    SPSITEURL: _spPageContextInfo.webAbsoluteUrl
}
Object.freeze(CommonConstant);

const ListNames = {
    PROJECTMASTER: "Projects",
    PROCESSMASTER: "Processes",
    PROJECTTEMPLATES: "Project Templates",
    PROPERTYLETTERS: "Property Letters",

}
Object.freeze(ListNames);

const SPGroups = {
    ADMIN: 'Administrator',


}
Object.freeze(SPGroups);

const PopupURL = {
    AcknowledgeMessage: "https://synoverge.sharepoint.com/sites/PLG_Dev/Pages/Acknowledgement.aspx?IsDlg=1",
    PublishDocument: "/_layouts/15/PLG.DMS/PublishDocument.aspx?IsDlg=1",
    SendForApproval: "/_layouts/15/PLG.DMS/SendForApproval.aspx?IsDlg=1",
    SendEmailBody: "/_layouts/15/PLG.DMS/SendEmailBody.aspx?IsDlg=1",
    SendEmailWithAttachment: "/_layouts/15/PLG.DMS/SendEmailWithAttachment.aspx?IsDlg=1",
    Upload: "/_layouts/15/Upload.aspx?List={0}&RootFolder=",
    LinkToSalesRegister: "/_layouts/15/PLG.DMS.Reports/SalesRegisterReport.aspx?SOD={0}",
    EditCustomerDetails: "/Lists/Customers/CustomEdit.aspx?IsDlg=1&ID={0}",
    EditProjectTemplate: "/Project%20Templates/Forms/EditForm.aspx?IsDlg=1&ID={0}",
    EditConstructionUpdate: "/Construction%20Images/Forms/EditForm.aspx?IsDlg=1&ID={0}",
    BravaViewerURL: "http://bomvspstst01.kalpatarugroup.com:8090/BravaViewer/RenderHTML.aspx?fileurl=",
    ImportExcel: "/_layouts/15/PLG.DMS/ImportFromExcel.aspx?IsDlg=1",
    MyTask: "/_layouts/15/PLG.DMS/MyTask.aspx",
    unauthorizedURL: "/_layouts/15/PLG.DMS.Reports/UnAuthorized.aspx",
    submitRejection: "/_layouts/15/PLG.DMS/SubmitScanDocRejection.aspx?IsDlg=1&ID=",
    submitAcceptance: "/_layouts/15/PLG.DMS/AcceptAndPublish.aspx?IsDlg=1&ID=",
}
Object.freeze(PopupURL);