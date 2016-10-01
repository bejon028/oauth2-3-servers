/**
 * Created by Nayan on 10/22/2015.
 */
angular.module('operationDeskAppServices')
    .service('modalService', ['$uibModal', function ($uibModal) {

      this.showAddSuccessModal = function (modalConfig) {
        $uibModal.open({
          templateUrl: 'app/templates/common/add-success-modal.html',
          controller: 'AddSuccessModalController',
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };


      this.showInfoSuccessModal = function (modalConfig) {
        $uibModal.open({
          templateUrl: 'app/templates/common/info-success-modal.html',
          controller: 'InfoSuccessModalController',
          backdrop:false,
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };

      this.showInsertionSuccessModal = function (modalConfig) {
        $uibModal.open({
          templateUrl: 'app/templates/common/info-insert-success-modal.html',
          controller: 'InfoSuccessModalController',
          backdrop:false,
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };

      this.showDeleteConfirmPrompt = function (modalConfig) {
        $uibModal.open({
          templateUrl: 'app/templates/common/confirm-delete-modal.html',
          controller: 'ConfirmDeleteModalController',
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };

      this.showUpdateSuccessModal = function (modalConfig) {
        var modalInstance = $uibModal.open({
          templateUrl: 'app/templates/common/update-success-modal.html',
          controller: 'UpdateSuccessModalController',
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };

      this.showErrorMessageModal = function (modalConfig) {
        $uibModal.open({
          templateUrl: 'app/templates/common/error-message-modal.html',
          controller: 'ErrorMessageModalController',
          size: 'sm',
          resolve: {
            'modalConfig': function () {
              return modalConfig;
            }
          }
        });
      };

      this.showDetailsModal = function (data,size,detailPage,controller) {
        $uibModal.open({
          templateUrl: detailPage,
          controller: controller,
          size: size,
          resolve:{
            modalData:function(){
              return data;
            }
          }
        });
      };

      this.showInlineFormModal = function (inputPage, size, controller, config) {
        $uibModal.open({
          templateUrl: inputPage,
          controller: controller,
          backdrop:'static',
          size: size,
          resolve: {
            'config': function(){
              return config;
            }
          }
        });
      };

      this.showModal = function (templateUrl, size, scope) {
        $uibModal.open({
          templateUrl: templateUrl,
          controller: 'GenericModalController',
          backdrop: 'static',
          size: size,
          resolve: {
            'scope': function () {
              return scope;
            }
          }
        });
      }

      this.showFileUploadSuccessDialog = function (viewList, uploadMore) {
        this.showModal('app/templates/common/file-upload-success-modal.html', 'lg', {
          viewList: viewList,
          uploadMore: uploadMore
        })
      }

      this.showServerErrorDialog = function () {
        this.showModal('app/templates/common/generic-error-dialog.html', 'sm', {
          close: function () {
            this.$modalInstance.close();
          },
          title: 'UNEXPECTED_ERROR',
          message: 'UNEXPECTED_SERVER_ERROR_MESSAGE',
          buttonText: 'CLOSE',
        });
      }

      this.showAlert = function (title, message) {
        var _self = this;

        _self.showModal('app/templates/common/alert-modal.html', 'md', {
          title: title,
          message: message,
          close: function () {
            var _self = this;
            _self.$modalInstance.close();
          }
        });
      };

      this.showError = function (title, message) {
        var _self = this;

        _self.showModal('app/templates/common/error-modal.html', 'md', {
          title: title,
          message: message,
          close: function () {
            var _self = this;
            _self.$modalInstance.close();
          }
        });
      };

    }]);
