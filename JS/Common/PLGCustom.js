var ImageType = ['jpg', 'jpeg', 'tif', 'png', 'gif'];
var ImgList = "gif ,jpg ,jpeg ,png ,tif";

//Open Popup without return value on close
function OpenSPModelDialogWithoutRefreshPage(popupurl) {

    var options = {
        url: popupurl, //'/_layouts/15/PLG.DMS/Acknowledgement.aspx?IsDlg=1',
        width: 640,
        height: 400,

    }
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    return false;

}
//Open Popup without return value on close

function OpenSPModelDialog(popupurl) {
    var options = {
        url: popupurl,
        //showClose: false,
        width: 1100,
        height: 700,
        dialogReturnValueCallback: CloseCallback
    }
    SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.showModalDialog', options);
    return false;
}
//function  (dialogResult) {            
//    SP.UI.ModalDialog.RefreshPage(dialogResult)
//}
function CloseCallback(dialogResult, returnValue) {
    if (returnValue != null && returnValue == "1") {
        //SP.UI.ModalDialog.RefreshPage(returnValue)
        SP.SOD.execute('sp.ui.dialog.js', 'SP.UI.ModalDialog.RefreshPage', returnValue);
    }
}

//Open Alert Box with Message
function ShowAlert(msg) {
    if (msg != "") {
        alert(msg);
    }
    else {
        return false;
    }
}

//Close Popup with Value
function ClosePopup(value) {
  window.frameElement.commitPopup(value)
}

//Show Wait Message
function ShowWaitDialog() {
    try {
        if (waitDialog == null) {
            waitDialog = SP.UI.ModalDialog.showWaitScreenWithNoClose('Processing...', 'Please wait while request is in progress...', 76, 330);
        }
    } catch (ex) { }
};
jQuery(document).ready(function () {
    var liburl= decodeURI(location.href);
    $('a:contains("Upload files using Windows Explorer instead")').hide();
    $('input.ms-fileinput').closest('td').append('<label id="lblmsg" style="color:#BF0000;font-weight:normal;display:none"></label>');        	
    $('input.ms-fileinput').change(function(){
        $('input[value="OK"]').attr('disabled','disabled');   
        //Images Library                  		
        if (liburl.indexOf('<%=Constants.Lists.ConstructionImages%>') >= 0 || liburl.indexOf('<%=Constants.Lists.ConstructionImages%>') >= 0) {
             validatefile(ImageType,ImgList);       
        }
        else {
            $('input[value="OK"]').removeAttr('disabled');
        }

    });
});
function validatefile(fileType, errmsg) {
    var fileName = $('input.ms-fileinput').val();
    var fileExt = fileName.split('.').reverse()[0];
    if (fileType.indexOf(fileExt.toLowerCase()) != -1) {
        $('#lblmsg').attr("style", "display:none");
        $('input[value="OK"]').removeAttr('disabled');
    }
    else {
        $('#lblmsg').text("Please enter file in " + errmsg + " format.");
        $('#lblmsg').attr("style", "visibility:visible;color:#BF0000;font-weight:normal;");
    }
}
