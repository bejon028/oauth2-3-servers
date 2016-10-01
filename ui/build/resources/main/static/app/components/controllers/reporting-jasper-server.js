angular.module('operationDeskAppControllers')
    .controller('ReportJasperServerController', ['$scope', '$http', 'resourcePaths', 'modalService', '$location', '$cookies', 'reportProfiles',

        function ($scope, $http, resourcePaths, modalService, $location, $cookies, reportProfiles) {

            var reportId = $location.path().substring($location.path().lastIndexOf('/')).substr(1);
            var reportProfile = reportProfiles[reportId];
            console.log(reportProfile);
            var resourceApiUrl = resourcePaths.baseUrl + '/' + resourcePaths.reportFromExternalServerPath;
            var resourceLoginApiUrl = resourcePaths.baseUrl + '/' + resourcePaths.loginExternalServerPath;
            var loginStatus = false;
            var reportOptionsRequest = {};
            reportOptionsRequest.reportType = "HTML";
            reportOptionsRequest.reportPath = reportProfile.reportPath;
            reportOptionsRequest.params = {};
            reportOptionsRequest.cookie = "";
            $scope.searchParams = {};
            $scope.attributes = reportProfile.attributes;
            $scope.title = reportProfile.title;

            $scope.addFilter = function () {
                for (var i = 0; i < $scope.attributes.length; i++) {
                    if ($scope.attributes[i].id == $scope.attributeId) {
                        $scope.attributes[i].selectable = false;

                    }
                }
                $scope.checkSubmitRowEnable();
            };

            $scope.checkSubmitRowEnable = function (id) {
                delete $scope.searchParams[id];
                $scope.submitRowEnable = false;
                for (var i = 0; i < $scope.attributes.length; i++) {
                    $scope.submitRowEnable |= !$scope.attributes[i].selectable;
                }

            };

            var successLoginCallBack = function (responseData) {
                $cookies.put("jasperCookie", responseData.data) ;
                $scope.loading = false;
                console.log("cookie: "+responseData.data);
            };
            var errorLoginCallBack = function (responseData) {
                console.log(responseData);
                $scope.loading = false;
                modalService.showErrorMessageModal({message: "Failed to connect to jasper server"});
            };
            var loginToReportServer = function () {
                $scope.loading = true;
                $http({
                    method: 'GET',
                    url: resourceLoginApiUrl
                })
                    .success(successLoginCallBack)
                    .error(errorLoginCallBack);
            };

            var hex2String = function(hex){
                return decodeURIComponent(escape(atob(hex)));
            };
            var successHtmlCallBack = function (responseData) {
                $("#html-view").html(
                    hex2String(responseData.data)
                );
                $scope.loading = false;
                //console.log(responseData.data);
            };
            var successPdfCallBack = function (responseData) {
                //window.open("data:application/pdf;base64," + responseData.data);
                $scope.loading = false;
                reportOptionsRequest.reportType = "PDF";
                var requestparams=$scope.searchParams;
                var downloadUrl=resourceApiUrl+"?title="+reportProfile.title+"&reportType="+reportOptionsRequest.reportType+"&reportPath="+reportProfile.reportPath+"&cookie="+reportOptionsRequest.cookie;
                if(reportOptionsRequest.params.length>0){
                    console.log(reportOptionsRequest.params);
                    for(var key in reportOptionsRequest.params){
                        downloadUrl+="&"+key+"="+reportOptionsRequest.params[key]+"&";
                    }
                    downloadUrl=downloadUrl.substring(0,downloadUrl.length-1);
                }
                //window.open(downloadUrl);
                console.log(downloadUrl);
            };
            var successExcelCallBack = function (responseData) {
                window.open("data:application/vnd.ms-excel;base64," + responseData.data);
                $scope.loading = false;
            };
            var errorCallBack = function (responseData) {
                if(responseData.message == "401 Unauthorized"){
                    $cookies.remove("jasperCookie");
                    $scope.loading = false;
                    $("#html-view").html("");
                    //modalService.showInlineFormModal('app/templates/reporting/report-server-login-modal.html', '', 'ReportServerLoginController', config);
                }else {
                    modalService.showErrorMessageModal({message: "Report Not Found"});
                }

            };
            var generateReport = function () {
                if($cookies.get("jasperCookie") == null) {
                    loginToReportServer();
                }
                if($cookies.get("jasperCookie")!=null) {
                    reportOptionsRequest.cookie = $cookies.get("jasperCookie");
                    reportOptionsRequest.reportType = "HTML";
                    reportOptionsRequest.params = $scope.searchParams;

                    for (var i = 0; i < $scope.attributes.length; i++) {
                        if (($scope.attributes[i].type == 'DATE') && ($scope.attributes[i].selectable == false)) {
                            var date = new Date($scope.searchParams[$scope.attributes[i].id]);
                            $scope.searchParams[$scope.attributes[i].id] = date.getTime();
                        }
                    }
                    $http({
                        method: 'POST',
                        url: resourceApiUrl,
                        data: reportOptionsRequest
                    })
                        .success(successHtmlCallBack)
                        .error(errorCallBack);
                }

            };
            var generateDownloadUrl=function(reportOptionsRequest){
                var cookieData=$cookies.get("jasperCookie");
                var index=cookieData.indexOf(";")
                var cookie=cookieData.substring(0,index);
                var downloadUrl=resourceApiUrl+"?title="+reportProfile.title+"&reportType="+reportOptionsRequest.reportType+"&reportPath="+reportProfile.reportPath+"&cookie="+cookie;
                for(var key in $scope.searchParams){
                    downloadUrl+="&"+key+"="+$scope.searchParams[key];
                }
                return downloadUrl;
            };

            $scope.saveAsPdf = function(){
                $scope.loading = true;
                reportOptionsRequest.reportType = "PDF";
                var downloadUrl=generateDownloadUrl(reportOptionsRequest);
                console.log(downloadUrl);
                window.open(downloadUrl);
                $scope.loading = false;
            };

            $scope.saveAsExcel = function(){
                $scope.loading = true;
                reportOptionsRequest.reportType = "EXCEL";
                var downloadUrl=generateDownloadUrl(reportOptionsRequest);
                window.open(downloadUrl);
                $scope.loading = false;
            };
            /*var config = {
                loginToReportServer: loginToReportServer
            };*/
            if($cookies.get("jasperCookie") == null) {
                loginToReportServer();
                //modalService.showInlineFormModal('app/templates/reporting/report-server-login-modal.html', '', 'ReportServerLoginController', config);
            }
            $scope.generateReport = function () {
                $scope.loading = true;
                generateReport();
            };

        }

    ])
    .controller('ReportServerLoginController', function ($scope, $modalInstance, config, $http, modalService, $controller, $cookies) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.submitLoginInfo = function () {
            config.loginToReportServer($scope.username, $scope.password);
            $scope.close();
        };

    });