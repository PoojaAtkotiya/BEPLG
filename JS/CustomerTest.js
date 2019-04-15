function GetCustomerData(searchDict) {
    var objCustomerList = [];
    var objCustomer = {};
    objCustomer.BookingDate = "12/08/2012";
    objCustomer.BookingStatus = "Active";
    objCustomer.CRMEmail = "virag@kalpataru.com";
    objCustomer.CRMName = "Virag";
    objCustomer.CSEEmail = "vimal@kalpataru.com";
    objCustomer.CSEName = "Vimal";
    objCustomer.CustomerContact = "8795649875";
    objCustomer.CustomerEmail = "Vipul@synoverge.com";
    objCustomer.CustomerName = "Vipul";
    objCustomer.LOIDate = "16/08/2012";
    objCustomer.OCDate = "12/08/2014";
    objCustomer.FlatNo = "202";
    objCustomer.ProjectName = "Kalpataru Aura";
    objCustomer.SalesOrderID = "111";
    objCustomer.TowerName = "Silver";
    objCustomer.Wing = "TowerA";
    objCustomerList.push(objCustomer);

    objCustomer = {};
    objCustomer.BookingDate = "12/08/2012";
    objCustomer.BookingStatus = "Active";
    objCustomer.CRMEmail = "virag@kalpataru.com";
    objCustomer.CRMName = "Virag";
    objCustomer.CSEEmail = "vimal@kalpataru.com";
    objCustomer.CSEName = "Vimal";
    objCustomer.CustomerContact = "8795649875";
    objCustomer.CustomerEmail = "Vimal@synoverge.com";
    objCustomer.CustomerName = "Vimal";
    objCustomer.LOIDate = "16/08/2012";
    objCustomer.OCDate = "12/08/2014";
    objCustomer.FlatNo = "203";
    objCustomer.ProjectName = "Kalpataru Green";
    objCustomer.SalesOrderID = "112";
    objCustomer.TowerName = "Gold";
    objCustomer.Wing = "TowerB";
    objCustomerList.push(objCustomer);

    objCustomer = {};
    objCustomer.BookingDate = "12/08/2012";
    objCustomer.BookingStatus = "Active";
    objCustomer.CRMEmail = "virag@kalpataru.com";
    objCustomer.CRMName = "Virag";
    objCustomer.CSEEmail = "vimal@kalpataru.com";
    objCustomer.CSEName = "Vimal";
    objCustomer.CustomerContact = "8795649875";
    objCustomer.CustomerEmail = "Nayan@synoverge.com";
    objCustomer.CustomerName = "Nayan";
    objCustomer.LOIDate = "16/08/2012";
    objCustomer.OCDate = "12/08/2014";
    objCustomer.FlatNo = "204";
    objCustomer.ProjectName = "Kalpataru Aura";
    objCustomer.SalesOrderID = "123";
    objCustomer.TowerName = "Platinum";
    objCustomer.Wing = "TowerC";
    objCustomerList.push(objCustomer);

    return objCustomerList;
}

function GetTowersOfProject(dict) {
    var towerList = ["Silver", "Gold", "Platinum"];
    return towerList;
}

function GetWingsOfProject(dict) {
    var wingList = ["WingA", "WingB", "WingC"];
    return wingList;

}