angular.module('operationDeskAppControllers')
    .controller('TransactionLogsController', ['$scope', '$controller', 'resourcePaths', 'routeMap', '$http',
        function ($scope, $controller, resourcePaths, routeMap, $http) {
            $scope.listViewPath = routeMap['menu'];
            $scope.resourceApiUrl = resourcePaths.baseUrl + '/' + resourcePaths.transactionLogsPaths + '/find-all';
            $http.get($scope.resourceApiUrl).then(function (responseData) {
                $scope.data = responseData.data.transactionLogDtos;
            });
        }]);
