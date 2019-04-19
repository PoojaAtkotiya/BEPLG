const CommonConstant = {
    SPSITEURL: _spPageContextInfo.webAbsoluteUrl
}
Object.freeze(CommonConstant);

const ListNames = {
    PROJECTMASTER: "Projects",
    PROCESSMASTER: "Processes",
    PROJECTTEMPLATES: "Project Templates",
    PROPERTYLETTERS: "Property Letters",
    APPROVERMASTER: "ApproverMaster",
    POLICYTYPES: "Policy Types",
    PROCESSTYPES: "Process Types",
    PROPERTYLETTERSTEMPLATE: "Property Letter Templates",

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

const Messages = {
    SAPisNotAvailable: "SAP is not available.",
    TechnicalIssueOccurrred: "Technical issue occurred, kindly contact your System Administrator.",
    WebserviceDown: "Currently web service has been down, kindly contact your System Administrator.",
    SomethingWentWrong: "Something went wrong with document generation process, hence document can't generated.",
    EmailSubjectandRecipient: "Email recipient and/or Subject not found, hence email can't Send.",

    DocumentGeneratedSuccess: "Document has been generated successfully.",
    AlreadyGenerated: "Please, Process all generated documents before generate new document.",
    ProcessCancel: "Document process has been cancelled.",
    ProcessDelete: "Document has been deleted.",
    SelectCustomer: "Please select customer to generate letter.",

    PublishDocumentConfirm: "This action will send the document to the DMS storage and also save the document on the Customer's portal. As per policy, you need to take a print out of this document and send the same to the customer as a hard copy. Do you wish to proceed?",
    PublishDocumentSuccess: "Document saved in DMS and Customer portal. Please print and send to customer after necessary signatures.",

    SkipApprovalConfirm: "Are you sure want to Skip approval Process.",
    SkipApprovalSuccess: "Approval process has been skip successfully.",

    SendApprovalConfirm: "This action will send the document for approval.",
    SendApprovalSuccess: "Approval process has been started successfully.",
    TaskRelatedDocumentDeleted: "This task related document has been deleted hence you can't approver/reject this task.However you can cancel this task.",
    TaskApproved: "Task has been Approved.",
    TaskRejected: "Task has been Rejected.",
    TaskCanceled: "Task has been Canceled.",

    SendEmailBodyConfirm: "This action will send the document to the customer via email and also save the doc in the DMS storage and on the Customer's portal. Do you wish to proceed?",
    SendEmailBodySuccess: "Email sent to customer and document saved in DMS and Customer portal.",

    ApproverNotFound: "{0} has not been maintained for the approval process in SAP/SharePoint. Hence the document cannot be generated. Please maintain and re-generate.",
    CustomerEmailNotFound: "Email cannot be send, customer email address not available in the system.",
    InternalEmailNotFound: "Email cannot be send, Internal Team email address not available in the system.",

    ValidationCoveringLetter: "Welcome email date not found hence letter can't generate.",
    ValidationLetterAlreadyGenerated: "This letter has already been generated. Hence, the same cannot be re-generated. Please contact your local Admin (Abhijeet Roy) for assistance.",
    ValidationAnnexureNOTFound: "No annexure found for",
    ProblemMergingAnnexuers: "Problem in merging Annexures",
    ValidationNODocTypeFound: "For this document, annexure not found/published - ",
    ValidationAnnexureAminities: "The amenities list was not found for this customer. It is recommended to cancel this document and upload the Amenities List and re-generate the document",
    ValidationAnnexureLienReleaseletter: "The Lien Release Letter was not found for this customer. It is recommended to cancel this document and upload the Lien Release Letter and re-generate the document",
    ValidationAnnexureIndexII: "The Index II was not found for this customer. It is recommended to cancel this document and upload the Index II and re-generate the document",
    ValidationAnnexureRegistrationReceipt: "The Registration Receipt was not found for this customer. It is recommended to cancel this document and upload the Registration Receipt and re-generate the document",
    ValidationAnnexureNoDues: "The No dues Certificate was not found for this customer. It is recommended to cancel this document and upload the No dues Certificate and re-generate the document",
    ValidationAnnexureAOS: "The Agreement for Sale was not found for this customer. It is recommended to cancel this document and upload the Agreement for Sale and re-generate the document",
    ValidationAnnexureSDR: "The SDR Receipt was not found for this customer. It is recommended to cancel this document and upload the SDR Receipt and re-generate the document",
    ValidationAnnexureNOCtoMortgageCopy: "The NOC to mortgage copy was not found for this customer. It is recommended to cancel this document and upload the NOC to mortgage and re-generate the document",
    ValidationAnnexureInterestStatement: "The Interest statement was not found for this customer. It is recommended to cancel this document and upload the Interest statement and re-generate the document",
    ValidationAnnexureRequestFromCustomerForModification: "The Flat modification Request letter from customer was not found for this customer. It is recommended to cancel this document and upload the Flat modification Request letter from customer and re-generate the document.",
    ValidationAnnexureMemoEstimationTeam: "The Flat modification memo from Estimations Team was not found for this customer. It is recommended to cancel this document and upload the Flat modification memo from Estimations Team and re-generate the document.",
    ValidationAnnexureMemoProjectTeam: "The Flat modification memo from Projects team was not found for this customer. It is recommended to cancel this document and upload the Flat modification memo from Projects team and re-generate the document",
    ValidationSignedVoluntaryFinalTermination: "The Signed Voluntary Cancellation Letter or the Final Termination Letter were not found for this customer. It is recommended to cancel this document and upload the Signed Voluntary Cancellation Letter or the Final Termination Letter and re-generate the document",
    ValidationAnnexureRequestCustInteriorWork: "The Request from Customer for Interior Deposit Refund was not found for this Customer. It is recommended that you cancel this letter and upload the Request from Customer for Interior Deposit Refund & regenerate the document again.",
    ValidationAnnexureDeedofCancellation: "The Deed of Cancellation was not found for this Customer. It is recommended that you cancel this letter and upload the Deed of Cancellation & regenerate the document again.",
    ValidationAnnexureMemofromProjectsTeam: "The Memo from Projects Team for release of Interior Deposit Refund was not found for this Customer. It is recommended that you cancel this letter and upload the Memo from Projects Team for release of Interior Deposit Refund & regenerate the document again.",
    SignedLOINotFound: "Signed Letter of Intent not found for this customer It is recommended that you cancel this letter and upload the signed Letter of Intent & regenerate the document again.",
}
Object.freeze(Messages);
