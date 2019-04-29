const DocApprovalStatus = {
    NotProcessed: "NotProcessed",
    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected",
    Published: "Published"
}
Object.freeze(DocApprovalStatus);

const ErrorType = {
    Success: "Success",
    Warning: "Warning",
    Error: "Error"
}
Object.freeze(ErrorType);

const TaskStatus = {

    Pending: "Pending",
    Approved: "Approved",
    Rejected: "Rejected"

}
Object.freeze(TaskStatus);


const ModeOfDispatch = {
    EmailBody: "Email Body",
    EmailBodyInternal: "Email Body (Internal)",
    EmailWithAttachment: "Email With Attachment",
    EmailWithAttachmentInternal: "Email With Attachment (Internal)",
    HardCopy: "Hard Copy",
    EmailFromCustomer: "Email From Customer",
    OutsideScope: "Outside Scope",
    PreprintedForm: "Pre-printed Form",
}
Object.freeze(ModeOfDispatch);

const MergeType = { OR: "Or", AND: "And" }
Object.freeze(MergeType);