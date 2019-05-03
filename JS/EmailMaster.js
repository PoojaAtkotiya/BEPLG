function SendEmail(mail) {
    $.ajax({
        url: CommonConstant.SENDMAILURL,
        type: 'POST',
        headers: {
            "content-type": "application/json",
            "cache-control": "no-cache"
        },
        data: JSON.stringify(mail),
        async: false,
        error: function (error) {
            console.log(error);
        }
    });

}

function GetEmailSubject(letter) {
    debugger
    var subject = '';
    try {
        if (!IsNullOrUndefined(letter)) {
            var doctype = letter["DocType_x0020_Title"].DocType_x0020_Title;
            subject = String.format("{0} | {1} | {2}", letter["Sales_x0020_Order_x0020_ID"], letter["Customer_x0020_Name"], doctype);
        }
    }
    catch (ex) {
        //  ApplicationLog.LogError(ex);
        return subject;
    }
    return subject;
}