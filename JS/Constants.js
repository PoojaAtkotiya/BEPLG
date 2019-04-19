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

const Messages = {
    
    TaskRelatedDocumentDeleted : "This task related document has been deleted hence you can't approver/reject this task.However you can cancel this task."
    
}
Object.freeze(Messages);