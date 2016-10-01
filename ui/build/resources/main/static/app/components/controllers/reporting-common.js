/**
 * Created by Nayan on 10/9/2015.
 */

angular.module('operationDeskAppControllers')
    .controller('CommonReportController', ['$scope', '$http', 'resourcePaths', 'modalService','$location','$cookies',

        function ($scope, $http, resourcePaths, modalService, $location,$cookies) {
            $scope.reportTitle = "Common report";
            $scope.report=true;
            $scope.searchParams = {};
            $scope.searchCriteria = {};
            $scope.fields = [];
            $scope.fixedLeft = 2;
            $scope.pageParams = {
                curPage: 1,
                pageCount: 0,
                totalItems: 0,
                pageSize: 20
            };
            $scope.inputPageSize = $scope.pageParams.pageSize;
            $scope.loading = true;

            var reportId = $location.path().substring($location.path().lastIndexOf('/'));
            console.log($scope.searchParams);
            var locale = $cookies.get('lang');

            var resourceUrl = resourcePaths.baseUrl + '/' + resourcePaths.reportPath + '/fields/'+locale+ reportId;
            $http.get(resourceUrl).then(function (response) {
                $scope.reportTitle = response.data.reportDetailResponseList[0].title;
                $scope.fixedLeft=response.data.numOfFieldsPk;
                $scope.columns = response.data.criteriaResponseList;
                for (i in $scope.columns) {
                    $scope.columns[i].selectable = true;
                }
                $scope.fieldsList = response.data.reportFieldResponseList;
                for (i in  $scope.fieldsList) {
                    $scope.fieldsList[i].selected = true;
                }
            });
            var dataUrl=resourcePaths.baseUrl+'/'+resourcePaths.reportPath+reportId;
            //var dataUrl="http://localhost:8080/operation-desk-core-1.0/api/report/settlement/issuer/settlementIssuerReport";


            var successCallBack = function (response) {
                $scope.data = response.data.content;

                //$scope.pageParams.curPage = 1 + response.data.number;
                $scope.pageParams.pageCount = response.data.totalPages;
                $scope.pageParams.totalItems = response.data.totalElements;

                $scope.startIndex = ($scope.pageParams.curPage - 1) * $scope.pageParams.pageSize + 1;
                $scope.endIndex = $scope.startIndex + response.data.content.length - 1;

                $scope.loading = false;
            };

            var failedCallBack = function (response) {
                $scope.loading = false;
            };

            $scope.setPageSize = function () {
                $scope.pageParams.pageSize = $scope.inputPageSize;
                $scope.pageParams.curPage = 1;
                submitCall();
            };
            $scope.pageParamChanged = function () {
                submitCall();
            };

            var initialParam={
                "pageSize":10,
                "pazeNumber":1,
                "searchParams":[]
            };
            $http({
                method: 'POST',
                url: dataUrl,
                data: initialParam
            }).then(successCallBack, failedCallBack);
            $scope.addField = function () {
                $scope.searchObj = JSON.parse($scope.searchObj);
                $scope.fields.push($scope.searchObj);
                for (i in $scope.columns) {
                    if ($scope.columns[i].columnName === $scope.searchObj.columnName) {
                        $scope.columns[i].selectable = false;
                    }
                }
            };
            $scope.removeChoice = function (index, obj) {
                $scope.fields.splice(index, 1);
                for (i in $scope.columns) {
                    if ($scope.columns[i].columnName === obj.columnName) {
                        $scope.columns[i].selectable = true;
                    }
                }
            };
            var onSelectColumns = function (data, selectedAll) {
                $scope.fieldsList = data;
            };


            $scope.selectColumns = function () {
                var config = {
                    onSelect: onSelectColumns,
                    fieldList: $scope.fieldsList
                };
                modalService.showInlineFormModal('app/templates/reporting/column-selection-modal.html', 'lg', 'ReportColumnSelectionController', config);
            };
            var getDateColumn=function(dummyName){
                var columnName;
                for(var i in $scope.columns){
                    columnName=$scope.columns[i].columnNameJson;
                    for(var j in $scope.columns[i].criteriaOptionResponseList){
                        if($scope.columns[i].criteriaOptionResponseList[j].valueJson==dummyName){
                            return columnName;
                        }
                    }
                }
            };
            var submitCall = function(){
                $scope.loading = true;

                var criteria = [];
                    for(name in $scope.searchParams){
                        var temp = {};
                        temp.key = name;
                        temp.value = $scope.searchParams[name];
                        temp.criteria = $scope.searchCriteria[name];
                        if(angular.isDate($scope.searchParams[name])){
                            temp.value = $scope.searchParams[name].getTime();
                            temp.key=getDateColumn(name);
                        }
                        criteria.push(temp);
                    }

                var criteriaWithPage={
                    pageSize:$scope.pageParams.pageSize,
                    pazeNumber:$scope.pageParams.curPage,
                    searchParams:criteria
                };
                console.log(criteriaWithPage);
               $http({
                    method: 'POST',
                    url: dataUrl,
                    data: criteriaWithPage
                }).then(successCallBack, failedCallBack);
            };
            $scope.submit = function () {
                submitCall();
            };
            $scope.resetSearchFields = function(){
                $scope.searchParams = {};
                submitCall();
            };
            $scope.$on('ngRepeatFinished', function () {
                try {
                    angular.element("#fixTable").tableHeadFixer({"left": $scope.fixedLeft});
                } catch (e) {
                    console.log("call came before other loop finished");
                }
            });


        }

    ])
    .controller('ReportColumnSelectionController', function ($scope, $modalInstance, config, $http, modalService, $controller,$cookies) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
            config.onSelect($scope.data);
        };
        $scope.data = config.fieldList;
        $scope.selectAll = true;
        $scope.changeAll = function(){
            for (i in  $scope.data) {
                $scope.data[i].selected = $scope.selectAll;
            }
        };

    });