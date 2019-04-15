(function () {

//   Initialize the variables for overrides objects
	var overrideCtx = {};
	overrideCtx.Templates = {};
	alert(1);
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
		'Name': { 'View' : 'View Document' }
	};
		
    /*
     * Register the template overrides.
     */
	SPClientTemplates.TemplateManager.RegisterTemplateOverrides(overrideCtx);
})();