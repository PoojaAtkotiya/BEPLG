var GPOLICYTYPES = [];
var GPROCESSTYPES = [];
var PolicyTypesSet = [];
var ProcessTypesSet = [];

$(function () {
    BindPolicyTypes();
    BindProcessTypes();
});

function BindPolicyTypes() {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.POLICYTYPES + "')/items?$select=*,Modified&$orderby=Modified";
    var data = GetListData(url);
    var policyTypes = data.d.results;

    if (!IsNullOrUndefined(policyTypes) && policyTypes.length > 0) {
        policyTypes.forEach(policyType => {
            policyType["FileLeafRef"] = "/" + ListNames.POLICYTYPES + "/" + policyType["FileLeafRef"].toString();
        });
        GPOLICYTYPES = policyTypes;
        PolicyTypesSet = GPOLICYTYPES;
    }
    else {
        GPOLICYTYPES = null;
    }

    $('#grvPolicyTypes').DataTable({
        "data": PolicyTypesSet,
        "columns": [
            { "data": "PolicyType" },
            { "data": "Owner" },
            { "data": "ModifiedDate" },
            { "data": "ModifiedBy" },
            { "data": "CreatedDate" },
            { "data": "CreatedBy" },
            { "data": "Action" }
        ]
    });
}

function BindProcessTypes() {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.PROCESSTYPES + "')/items?$select=*,Modified&$orderby=Modified";
    var data = GetListData(url);
    var processTypes = data.d.results;

    if (!IsNullOrUndefined(processTypes) && processTypes.length > 0) {
        processTypes.forEach(processType => {
            processType["FileLeafRef"] = "/" + ListNames.PROCESSTYPES + "/" + processType["FileLeafRef"].toString();
        });
        GPROCESSTYPES = processTypes;
        ProcessTypesSet = GPROCESSTYPES;
    }
    else {
        GPROCESSTYPES = null;
    }

    $('#grvProcessTypes').DataTable({
        "data": ProcessTypesSet,
        "columns": [
            { "data": "PolicyType" },
            { "data": "Owner" },
            { "data": "Modified" },
            { "data": "ModifiedBy" },
            { "data": "Created" },
            { "data": "CreatedBy" },
            { "data": "Action" }
        ]
    });
}


