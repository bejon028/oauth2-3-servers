angular.module('operationDeskAppControllers')

    .controller('ApplicationSettingsViewController', ['$scope', 'config', '$routeParams', '$http', 'resourcePaths',
        function ApplicationSettingsViewController($scope, config, $routeParams, $http, resourcePaths) {
            $scope.listViewPath = config.indexUrl;

            $http.get(resourcePaths.baseUrl + "/" + resourcePaths.applicationSettingsPath + '/' + $routeParams.id).then(function (rsp) {
                $scope.data = rsp.data;
            }).catch(function () {
                modalService.showServerErrorDialog();
            });

        }])


    .controller('ApplicationSettingsAddController', [
        '$scope', '$http', 'config', 'resourcePaths', 'modalService', '$location', '$routeParams', '$q',
        function ApplicationSettingsAddController($scope, $http, config, resourcePaths, modalService, $location, $routeParams, $q) {

            function initScope() {
                $scope.listViewPath = config.indexUrl;
                $scope.config = config;
                $scope.data = initData();
                $scope.properties = [];
            }

            function loadDataDependencies() {

                var promiseList = [];
                promiseList.push($http.get(resourcePaths.baseUrl + "/" + resourcePaths.enumPath + '/application-settings-property'));
                promiseList.push($http.get(resourcePaths.baseUrl + "/" + resourcePaths.applicationSettingsPath));

                if (config.operationName != 'add') {

                    promiseList.push($http.get(resourcePaths.baseUrl + "/" + resourcePaths.applicationSettingsPath + '/' + $routeParams.id));
                }

                $q.all(promiseList).then(function (rspList) {
                    return {
                        enums: rspList[0].data || [],
                        settings: rspList[1].data || [],
                        data: (rspList[2] || {}).data
                    };
                }).then(function (tuple) {
                    var propertyMap = tuple.settings.reduce(function (map, cur) {
                        map[cur.property] = true;
                        return map;
                    }, {});

                    $scope.properties = tuple.enums.filter(function (prop) {
                        return !propertyMap[prop];
                    });

                    $scope.properties = $scope.properties || [];

                    if (!!tuple.data) {
                        $scope.properties.push(tuple.data.property);
                    }

                    $scope.properties = $scope.properties.sort(function (a, b) {
                        return a > b ? 1 : a < b ? -1 : 0;
                    });

                    return tuple;
                }).then(function (tuple) {

                    $scope.data = tuple.data || initData();

                }).catch(function () {
                    modalService.showServerErrorDialog();
                });

            }


            function defineFunctions() {

                $scope.isEdit = function () {
                    return config.operationName == 'edit';
                }

                $scope.isFormInvalid = function isFormValid(data) {
                    return false;
                }

                $scope.resetData = function () {
                    $scope.data = initData();
                }

                $scope.submit = function submit(data) {

                    var url = config.operationName == 'add' ? config.resourceUrl : config.resourceUrl + '/' + $routeParams.id;
                    $http[config.operationName == 'add' ? 'post' : 'put'](url, data).then(function (rsp) {

                        modalService[config.operationName == 'add' ? 'showAddSuccessModal' : 'showUpdateSuccessModal']({
                            onViewList: function () {
                                $location.path(config.indexUrl);
                                console.log("onView,,,")
                            },
                            onAddAnother: function () {
                                $scope.mForm.$setPristine(true);
                                $scope.resetData();
                                console.log("onAddAnother,..,,")
                            }
                        });
                    }).catch(function () {
                        modalService.showServerErrorDialog();
                    });
                    console.log('submit');
                }
            }

            initScope();

            defineFunctions();

            loadDataDependencies();

        }
    ]);

function initData() {
    return {};
}
;