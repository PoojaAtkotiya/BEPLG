var G_Emailbody;
$(document).ready(function () {
    var id = getUrlParameter("ID");
    if (!IsNullOrUndefined(id) && !IsStrNullOrEmpty(id)) {
        $("#lblFrom").html(_spPageContextInfo.userEmail);
        $("#lblbcc").html(_spPageContextInfo.userEmail);

        var letter = GetPropertyLetterByID(id);
        if (!IsNullOrUndefined(letter)) {
            var template = GetProjectTemplateByID(letter["TemplateID"]);
            if (!IsNullOrUndefined(template)) {
                var projectname = letter["Project_x0020_Name"].Title;
                var documentType = letter["DocType_x0020_Title"].DocType_x0020_Title;

                var Emails = GetEmailID(projectname, letter["Sales_x0020_Order_x0020_ID"], documentType);
                if (letter["Mode_x0020_Of_x0020_Dispatch"] == ModeOfDispatch.EmailBody) {
                    if (Emails.hasOwnProperty("Customer")) {
                        $("#lblto").html(Emails["Customer"]);
                    }
                    else {
                        $("#lblError").html(Messages.CustomerEmailNotFound);
                    }
                }
                else {
                    var strinternalEmailid = GetInternalEmailID(documentType, Emails);
                    if (!IsStrNullOrEmpty(strinternalEmailid)) {
                        $("#lblto").html(strinternalEmailid);
                    }
                    else {
                        $("#lblError").html(Messages.InternalEmailNotFound);
                    }
                }

                $("#lblcc").html(Emails["CRM"]);


                $("#lblSubject").html(GetEmailSubject(letter));

                var customerEmailBody = !IsNullOrUndefined(template["Customer_x0020_Email_x0020_Body"]) ? template["Customer_x0020_Email_x0020_Body"] : '';

                if (!IsStrNullOrEmpty(customerEmailBody)) {
                    // customerEmailBody = $("<div/>").html(customerEmailBody).text();
                    var objPropertyLetter = {};
                    objPropertyLetter.SalesOrderID = letter["Sales_x0020_Order_x0020_ID"];
                    objPropertyLetter.DocTypeCode = letter["DocTypeCode"];
                    objPropertyLetter.DocType = letter["DocType_x0020_Title"].DocType_x0020_Title;
                    //   customerEmailBody = PrepeareEmailBody(customerEmailBody, objPropertyLetter);
                }

                $("#divemailbody").html(customerEmailBody);
                G_Emailbody = customerEmailBody;
            }
        }
    }
});

function GetInternalEmailID(documentType, Emails) {
    var strinternalEmail = '';
    try {
        switch (documentType) {
            //INTERNAL EMAIL TO FINANCE SPOC
            case DocType.ROCrequestfinance:
                strinternalEmail = Emails.hasOwnProperty(SPGroups.AccountsSPOC2) ? Emails[SPGroups.AccountsSPOC2] : '';
                break;

            //INTERNAL EMAIL TO Projects SPOC
            case DocType.KeyHandoverMemo:
                strinternalEmail = Emails.hasOwnProperty(SPGroups.AccountsSPOC3) ? Emails[SPGroups.AccountsSPOC3] : '';
                break;

            //INTERNAL EMAIL TO Finance SPOC
            case DocType.MvatDebitNote:
                strinternalEmail = Emails.hasOwnProperty(SPGroups.Finance) ? Emails[SPGroups.Finance] : '';
                break;

            //INTERNAL EMAIL TO Accounts

            case DocType.CancellationRefundmemo:
            case DocType.ExcessAmountRefundmemo:
            case DocType.ModificationRebateMemo:
            case DocType.InteriorDepositRefundmemo:
                strinternalEmail = Emails.hasOwnProperty(SPGroups.Accounts) ? Emails[SPGroups.Accounts] : '';
                break;

            default:
                break;
        }
    }
    catch (ex) {
        //ApplicationLog.LogError(ex);
        ("#btnSendEmail").attr("disabled", "disabled");
        $("#lblError").html(Messages.TechnicalIssueOccurrred);
    }
    return strinternalEmail;
}

// function PrepeareEmailBody(emailBody, objPropertyLetter) {
//     try {

//         var JsonSerialised = JSON.stringify(objPropertyLetter);
//         var jsonString1 = objWCFTemplateService.ValidateReportData(JsonSerialised, LoginUser.IsAdmin, "Letter");
//         var objReportValidationResponse = JsonConvert.DeserializeObject<ReportValidationResponse>(jsonString1);
//         List < Message > objMsgs = objReportValidationResponse.Messages;
//         if (objMsgs != null) {
//             if (objMsgs.Exists(t => t.ErrorType == ErrorType.Error) == false) {
//                 List < KeyVal > objResults = objReportValidationResponse.SAPData;
//                 KeyVal isSuccess = objResults.Find(m => m.SAPName == "Success");
//                 if (isSuccess.Value.Trim() == "00") {
//                     List < KeyVal > SingleFieldsList = objResults.FindAll(s => s.Type == "Single");
//                     if (SingleFieldsList != null) {
//                         foreach(KeyVal kv in SingleFieldsList)
//                         {
//                             string strvalue = string.IsNullOrEmpty(kv.Value) ? " " : kv.Value;
//                             emailBody = emailBody.Replace("{{SRC:" + kv.SAPName.ToUpper() + "}}", strvalue);
//                         }
//                     }


//                     //Update Tables in Letter
//                     MasterHelper helper = new MasterHelper();
//                     DataTable tables = helper.GetLetterTableName(objPropertyLetter.DocType);
//                     if (tables != null && tables.Rows.Count != 0) {
//                         foreach(DataRow dr in tables.Rows)
//                         {
//                             KeyVal TableFieldsList = objResults.Find(s => s.Type == "Table" && s.TableName == dr["Title"].ToString());
//                             DataTable datatable = null;
//                             if (TableFieldsList != null && TableFieldsList.Value != null)
//                                 datatable = (DataTable)JsonConvert.DeserializeObject(TableFieldsList.Value, (typeof (DataTable)));

//                             DataTable tablefields = helper.GetLetterTableFieldList(dr["Title"].ToString());
//                             if (tablefields != null && tablefields.Rows.Count != 0) {
//                                 string[] columns = tablefields.AsEnumerable().Select(r => r.Field<string>("Field_x0020_Name")).ToArray();
//                                 datatable = datatable.DefaultView.ToTable(true, columns);

//                                 foreach(string columnname in columns)
//                                 {

//                                     string cname = (from t in tablefields.AsEnumerable()
//                                     where t.Field<string>("Field_x0020_Name") == columnname
//                                     select new { cname = t.Field<string>("Field_x0020_Name_x003a_Logical_x") }).FirstOrDefault().cname;

//                                     datatable.Columns[columnname].ColumnName = cname;
//                                 }


//                                 if (datatable != null) {

//                                     string htmltable = ConvertDataTableToHTML(datatable);
//                                     emailBody = emailBody.Replace("{{" + dr["Title"].ToString() + "}}", htmltable);
//                                 }


//                             }


//                         }
//                     }

//                     // emailBody.Replace().Replace().Replace();
//                     emailBody = emailBody.Replace(",  ,", string.Empty);
//                     emailBody = emailBody.Replace(",  ", string.Empty);
//                     emailBody = emailBody.Replace("<<   >>,", "<<   >>");
//                     //emailBody.Replace("<p><<  >></p>", string.Empty);
//                     emailBody = emailBody.Replace("<< ", "##");
//                     emailBody = emailBody.Replace(" >>", "##");

//                     HtmlDocument hDoc = new HtmlDocument();
//                     hDoc.DocumentNode.InnerHtml = emailBody;
//                     //hDoc.LoadHtml(emailBody);
//                     var paragraphs = hDoc.DocumentNode.SelectNodes("//p");
//                     for (int i = 0; i < paragraphs.Count; i++)
//                     {
//                         if (paragraphs[i].InnerText.Contains("## ##"))
//                             paragraphs[i].ParentNode.RemoveChild(paragraphs[i]);

//                     }

//                     emailBody = emailBody = hDoc.DocumentNode.OuterHtml;
//                     //emailBody = emailBody.Replace("=\"""", String.Empty);
//                     emailBody = emailBody.Replace("##", string.Empty);
//                 }
//                 else {
//                     KeyVal serviceMesssage = objResults.Find(m => m.FieldName == "StatusMessage");
//                     lblError.Text = serviceMesssage.Value;
//                     btnSendEmail.Enabled = false;
//                 }
//             }
//             else {
//                 string errors = "<b>Please resolve below Errors before sending email :</b><br /> ";
//                 foreach(Message msg in objMsgs)
//                 {
//                     errors += msg.ErrorMessage + "<br /> ";
//                 }
//                 lblError.Text = errors.Substring(0, errors.Length - 7);
//                 btnSendEmail.Enabled = false;
//             }
//         }
//     }
//     ////WCF Service Exception
//     catch (FaultException fe) {
//         lblError.Text = Constants.Messages.SAPisNotAvailable;
//         btnSendEmail.Enabled = false;
//         ApplicationLog.LogError(fe);
//     }
//     ////Generic Exception Handle
//     catch (Exception ex) {
//         ApplicationLog.LogError(ex);
//         btnSendEmail.Enabled = false;
//         lblError.Text = Constants.Messages.TechnicalIssueOccurrred;
//     }
//     return emailBody;
// }