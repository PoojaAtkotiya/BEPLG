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