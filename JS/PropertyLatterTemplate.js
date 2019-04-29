(function () {

  //   Initialize the variables for overrides objects
  var overrideCtx = {};
  overrideCtx.Templates = {};
  overrideCtx.OnPostRender = postRenderHandler;
  //overrideCtx.OnPreRender= postRenderHandler;
  //    overrideCtx.OnPostRender = [];
  //  overrideCtx.OnPostRender.push(function()
  // {

  //call your ready function here
  // });
  //	alert("Override call worked");

  //  Use BaseViewID and ListTemplateType to narrow focus/scope on 
  //	which web parts on the page are affected
  //	overrideCtx.BaseViewID = 1;
  //	overrideCtx.ListTemplateType = 100;

  /*
   * Using the Fields override leaves the rest of the rendering intact, but 
   * allows control over one or more specific fields in the existing view
   */
  overrideCtx.Templates.Fields = {
    'Action': { 'View': SetPublish }
  };
  /*
   * Register the template overrides.
   */
  SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();
function postRenderHandler(ctl) {
  $('.ms-vb-icon').removeClass('ms-vb-icon').addClass('ms-vb2');
  var tbl = $('#js-listviewthead-WPQ3')[0].childNodes[0];
  tbl.cells[tbl.cells.length - 1].className = 'ms-vh2-nofilter';
  //$('#js-listviewthead-WPQ3')[0].childNodes[0].cells[13].childNodes[0].style.display='none';
  tbl.cells[tbl.cells.length - 1].innerText = "Publish";

  var obj = $('.ms-vb-lastCell');
  for (var i = 0; i < obj.length; i++) {
    obj[i].align = 'center';
  }
}
function setPopups(url, nu) {
  var options = SP.UI.$create_DialogOptions();
  if (nu == 1)
    options.title = "Edit Properties";
  else
    options.title = "Publish Templates";

  options.width = 800;
  options.height = 800;
  options.url = url;
  options.dialogReturnValueCallback = function (dialogResult) { SP.UI.ModalDialog.RefreshPage(dialogResult); }
  SP.UI.ModalDialog.showModalDialog(options);
  return false;
}

function EditValue(ctx) {
  //onclick=return DispEx(this,event,'TRUE','FALSE','FALSE','SharePoint.OpenDocuments.3','1','SharePoint.OpenDocuments','','','','19','0','0','0x7fffffffffffffff');
  //var ret="<a href='/Property Letters Templates/" + ctx.CurrentItem.FileLeafRef + "'>Edit</a>";

  //var ret="<a href='"+ctx.CurrentItem.FileRef+"' onclick='return DispEx(this,event,'TRUE','FALSE','FALSE','SharePoint.OpenDocuments.3','1','SharePoint.OpenDocuments','','','','19','0','0','0x7fffffffffffffff');'>Edit</a>";
  var st = "/Property%20Letters%20Templates/Forms/EditForm.aspx?ID=";
  var tmp = "setPopups('" + st + ctx.CurrentItem.ID.toString() + "&isDlg=1',1);";
  var ret = "<a style='cursor:pointer;' onclick=" + tmp + " >Edit</a>";
  return ret;
}

function SetPublish(ctx) {
  //var url="/_layouts/15/PLG.DMS/PublishTemplate.aspx?ID=" + ctx.CurrentItem.ID.toString(); 
  //var tmp= "javascript:window.open('/_layouts/15/PLG.DMS/PublishTemplate.aspx?ID=" + ctx.CurrentItem.ID.toString() +"');"; 
  //var tmp="setPopups('/_layouts/15/PLG.DMS/PublishTemplate.aspx?ID=" + ctx.CurrentItem.ID.toString() +"',2);";
  var tmp = "setPopups('https://synoverge.sharepoint.com/sites/PLG_Dev/Pages/PublishTemplate.aspx?ID=" + ctx.CurrentItem.ID.toString() + "',2);"
  var ret = "<img src='/_layouts/15/images/gbwciwpt.gif' style='cursor:pointer;' onclick=" + tmp + " ></img>";
  return ret;
}

