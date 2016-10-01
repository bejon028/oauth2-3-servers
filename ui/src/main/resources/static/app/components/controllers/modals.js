/**
 * Created by Nayan on 10/21/2015.
 */
angular.module('operationDeskAppControllers')
    .controller('ModalCloseController', function ($scope, $modalInstance) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ConfirmDeleteModalController', function ($scope, $modalInstance, modalConfig) {

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.confirmDelete = function () {
            $modalInstance.dismiss('cancel');
            modalConfig.onConfirmDelete(modalConfig.resource);
        };
    })
    .controller('AddSuccessModalController', function ($scope, $modalInstance, modalConfig) {

        $scope.addAnother = function () {
            $modalInstance.dismiss('cancel');
            modalConfig.onAddAnother();
        };

        $scope.viewList = function () {
            $modalInstance.dismiss('cancel');
            modalConfig.onViewList();
        };

    })
    .controller('InfoSuccessModalController', function ($scope, $modalInstance,modalConfig) {
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
            modalConfig.reload();
        };

    })
    .controller('UpdateSuccessModalController', function ($scope, $modalInstance, modalConfig) {

        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.viewList = function () {
            $modalInstance.dismiss('cancel');
            modalConfig.onViewList();
        };
    })
    .controller('DetailsController', function ($scope, $modalInstance, modalData,modalService) {
        $scope.showXML=false;
        $scope.data = modalData;
        $scope.toggleView = function () {
            $scope.showXML = !$scope.showXML;
        }
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.showElementGroup=function(obj){
            modalService.showDetailsModal(obj,'lg','app/templates/provisioning/view-data-element-group.html','DataElementGroupController');
        }
        $scope.showScript=function(obj){
            modalService.showDetailsModal(obj,'lg','app/templates/provisioning/view-script.html','ScriptController');
        }
    })
    .controller('InputModalController', function ($scope, $modalInstance) {
        $scope.modal=true;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('DataElementGroupController',function($scope, $modalInstance, modalData){
        $scope.data = modalData;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ScriptController',function($scope, $modalInstance, modalData){
        $scope.data = modalData;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    })
    .controller('ErrorMessageModalController', function ($scope, $modalInstance, modalConfig) {
        $scope.message = modalConfig.message;
        $scope.close = function () {
            $modalInstance.dismiss('cancel');
        };
    });

