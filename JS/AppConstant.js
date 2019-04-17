const CommonConstant = {
    SPSITEURL: _spPageContextInfo.webAbsoluteUrl
}
Object.freeze(CommonConstant);

const ListNames = {
    PROJECTMASTER: "Projects",
    PROCESSMASTER: "Processes",
    PROJECTTEMPLATES: "Project Templates",
    PROPERTYLETTERS: "Property Letters",
    APPROVERMASTER: "ApproverMaster"
}
Object.freeze(ListNames);

const SPGroups = {
    ADMIN: 'Administrator'
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
    submitAcceptance: "/_layouts/15/PLG.DMS/AcceptAndPublish.aspx?IsDlg=1&ID="
}
Object.freeze(PopupURL);


const DocTypes = {
    CoveringwithWelcomeKit: "Covering with Welcome Kit",
    LetterofIntentwithOC: "Letter of Intent with OC",
    LetterOfIntentWithOCSUBV: "Letter of Intent with OC Subvention",
    LetterofIntentwithoutOC: "Letter of Intent without OC",
    LetterOfIntentWithoutOCSUBV: "Letter of Intent without OC Subvention",
    AgreementforSaleAFS: "Agreement for Sale (AFS)",
    CancellationRefundmemo: "Cancellation Refund Memo",
    CancellationRefundCoveringLetter: "Cancellation Refund Covering Letter",
    InteriorDepositRefundmemo: "Interior Deposit Refund memo",
    KeyHandoverMemo: "Key Handover Memo",
    MvatDebitNote: "MVAT Debit Memo to Taxation",
    ROCrequestfinance: "ROC request letter to Finance",
    RequestCustInteriorWork: "Req from Cust for Interior Works (Non-Resale)",
    RequestCustInteriorWorkResale: "Req from Cust for Interior Works (Resale)",
    UndertakingNonResale: "Undertaking-cum-Indemnity (Non Resale)",
    UndertakingResale: "Undertaking-cum-Indemnity (Resale)",
    Possessionforinteriorworksresale: "Possession letter for interior work (Resale)",
    Possessionforinteriorworksnonresale: "Possession letter for interior work (Non-Resale)",
    PossessionletterwithOC: "Possession letter With OC (Resale)",
    PossessionletterwithOCNonResale: "Possession Letter with OC (Non-Resale)",
    IndexII: "Index II",
    VolCancelLetter: "Voluntary Cancellation Letter",   //signed unsigned
    FinalTerminateLetter: "Final Termination Letter",
    FinalNOCTRFMrtgBanks: "Final NOC for transfer of Mortgage bank",
    PreterminationNotice: "Pre-Termination Notice",
    ProvisionalReslaeNOC: "Provisional Resale NOC",
    FNResNOCTrfLoan: "Final Resale NOC - ongoing Loan",
    FNResNOCnonTrfLoan: "Final Resale NOC - No Loan",
    FinalResaleNOCNameChange: "Final Resale NOC informing of name change",
    ModificationRebateMemo: "Modification Rebate Memo",
    RebateModificationCL: "Rebate against modification covering letter",
    OwnerConfirmationLetter: "Ownership Confirmation letter",
    LienReleaseLetter: "Lien Release Letter",
    FirstReminerPaymentDue: "1st Reminder for payments due",
    SecondReminerPaymentDue: "2nd Reminder for payments due",
    ThirdReminerPaymentDue: "3rd Reminder for Payments due",
    ReqLtrforLLNOC: "Request from Customer for L and L NOC",
    FinalLLNOC: "Final L and L NOC",
    ProvisionalLLNOC: "Provisional L and L NOC",
    WelcomeEmail: "Welcome Email",
    CoveringLtrforAFS: "Covering Letter for AFS",
    NOCformortSBI: "NOC for mortgage - SBI",
    NOCformortotherbanks: "NOC for mortgage - other banks",
    ProvisionalNOCtransferMortBnk: "Provisional NOC for transfer of Mortgage bank",
    ReminderforStampdutyandRegistration: "Reminder for Stamp duty and Registration",
    PossessionDemandletter: "Possession Demand letter",
    RegistrationReceipt: "Registration Receipt",
    FlatmodificationRequestfromcustomer: "Flat modification Request letter from customer",
    FlatmodificationmemofromEstimationsTeam: " ",
    FlatmodificationmemofromProjectsTeam: "Flat modification memo from Projects team",
    ExcessAmountRefundmemo: "Excess Amount Refund Memo",
    StampDutyReceipt: "Stamp Duty Receipt",
    NoDuesCertificate: "No Dues certificate",
    InterestStatement: "Interest Statement",
    MemoFromEstimationTeam: "Flat modification memo from Estimations Team",
    MemoFromProjectTeam: "Flat modification memo from Projects team",
    RequestfromCustomerforInteriorDepositRefund: "Request letter for Interior Deposit refund",
    RequestfromtransferorandtransfereeforNOC: "Request from transferor and transferee for NOC",
    MemofromProjectsTeamforreleaseofInteriorDepositRefund: "Memo from Projects Team for release of Interior Deposit Refund",
    ResaleAFSpostpossessionBetweenbuyerseller: "Resale AFS post possession (Between buyer and seller)",
    ResaleAFSpriortopossessionTripartite: "Resale AFS prior to possession (Tripartite)",
    ProvisionalResaleNOCLoan: "Prov Resale NOC - ongoing Loan",
    ResaleAgreementcoveringletter: "Resale Agreement covering letter",
    DeedofCancellation: "Deed of Cancellation"
}
Object.freeze(DocTypes);