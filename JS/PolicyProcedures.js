$(function () {
    BindPolicyTypes();
    BindProcessTypes();
});

function BindPolicyTypes() {
    var url = _spPageContextInfo.webAbsoluteUrl + "/_api/web/lists/GetByTitle('" + ListNames.POLICYTYPES + "')/items?";
    var data = GetListData(url);
    var result = data.d;
}

function BindProcessTypes() {

}