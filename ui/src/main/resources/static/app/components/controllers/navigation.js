/**
 * Created by Nayan on 10/20/2015.
 */
angular.module('operationDeskAppControllers')
    .controller('NavigationController', ['$scope', '$http', '$location','resourcePaths', 'authorizationService',
      function ($scope, $http, $location, resourcePaths, authorizationService) {

      var resourceApiUrl = resourcePaths.baseUrl + '/' + resourcePaths.menuPath + '/level/5';
      $http.get(resourceApiUrl).then(function (responses) {
        $scope.multiMenuItem = responses.data;
      });

      $scope.menus = [
        {
          'title': 'Merchant',
          'isopen': false,
          'path': 'merchants',
          'submenus': [
            {'title': 'Merchant Clearance', 'path': 'merchant-clearance'},
            {'title': 'Merchant', 'path': 'merchant'},
            {'title': 'Merchant Group', 'path': 'merchant-group'},
            {'title': 'Issuer-Merchant Mapping', 'path': 'issuer-merchant'}
          ]
        },
        {
          'title': 'Configuration',
          'isopen': false,
          'path': 'configuration',
          'submenus': [
            {'title': 'Operator Group', 'path': 'operator-group'},
            {'title': 'Operator', 'path': 'operator'},
            {'title': 'Menu', 'path': 'menu'},
            {'title': 'Menu Authority', 'path': 'menu-authority'},
            {'title': 'Address', 'path': 'address'},
            {'title': 'Holidays', 'path': 'holidays'},
            {'title': 'Holiday Base', 'path': 'holiday-base'},
            {'title': 'Country', 'path': 'countries'},
            {'title': 'Fee Rate', 'path': 'fee-rate'},
            {'title': 'Fee Rate Issuer', 'path': 'fee-rate-issuer'},
            {'title': 'Fee Slide', 'path': 'fee-slide'},
            {'title': 'Clearing Type', 'path': 'clearing-type'},
            {'title': 'Deposit Account', 'path': 'deposit-account'},
            {'title': 'Clearing Type Issuer', 'path': 'clearing-type-issuer'},
            {'title': 'Issuer', 'path': 'issuers'},
            {'title': 'Code', 'path': 'code'},
            {'title': 'Error Code', 'path': 'error-code'},
            {'title': 'Error Issuer', 'path': 'error-issuer'},
            {'title': 'Acquirer', 'path': 'acquirer'}
          ]
        },
        {
          'title': 'Provisioning',
          'isopen': false,
          'path': 'provisioning',
          'submenus': [
            {'title': 'Device Eligibility', 'path': 'device-eligibility'},
            {'title': 'BIN Code', 'path': 'bin-codes'},
            {'title': 'Card Brand', 'path': 'card-brand'},
            {'title': 'Token Requester', 'path': 'token-requester'},
            {'title': 'Merchant User', 'path': 'merchant-users'},
            {'title': 'Merchant Configuration', 'path': 'merchant-configs'},
            {'title': 'Locale', 'path': 'locale'},
            {'title': 'KMS Configuration', 'path': 'kms-configs'},
            {'title': 'Key Profile', 'path': 'key-profile'},
            {'title': 'Key Profile Mapping', 'path': 'key-profile-mappings'},
            {'title': 'Service Group', 'path': 'service-groups'},
            /*{'title': 'Load File Profile', 'path': 'load-file-profiles'},
            {'title': 'Card Profile', 'path': 'card-profiles'},
            {'title': 'Application Profile', 'path': 'application-profiles'},*/
            {'title': 'Operator Company', 'path': 'operator-company'},
            {'title': 'Wallet Service Provider', 'path': 'wallet-service-provider'},
            {'title': 'Security Question', 'path': 'security-question'},
            {'title': 'Service Definition', 'path': 'service-definition'} ,
            /*{'title': 'Service PAN Range Mapping', 'path': 'service-pan-range-mappings'}*/
          ]
        },
        {
          'title': 'Integrity Management',
          'isopen': false,
          'path': 'integrity',
          'submenus': [
            {'title': 'Service State', 'path': 'service-states'},
            {'title': 'Failed Log', 'path': 'failed-requests'},
            {'title': 'Component State', 'path': 'component-states'}
          ]
        }
      ];

      angular.forEach($scope.menus, function (menu) {

        menu.isAuthorized = false;

        angular.forEach(menu.submenus, function (submenu) {

          var resourceName = menu.path + "/" + submenu.path;
/*
 * Note: to set commonAuthorizationDisable true, you have to stop apache agent
 * commonAuthorizationDisable defined at common.js
 * commonAuthorizationDisable is used for only our development purpose
 * usage: app.js, navigation.js
 * todo: commonAuthorizationDisable will be removed before final realease
 */
          if(authorizationService.isAuthorized(resourceName, 'view') || commonAuthorizationDisable){
            submenu.isAuthorized = true;
            menu.isAuthorized = true;
          } else {
            submenu.isAuthorized = false;
          }
        });
      });

      $scope.$on('$routeChangeSuccess', function () {
        var currentMenuGroupPath = $location.url().split('/')[1];
        var currentSubMenuPath = $location.url().split('/')[2];

        angular.forEach($scope.menus, function (menu) {
          if (menu.path === currentMenuGroupPath) {
            menu.isopen = true;
            angular.forEach(menu.submenus, function (submenu) {
              if (submenu.path === currentSubMenuPath) {
                submenu.selected = true;
              }
            });
          }
        });
      });

      $scope.select = function (selectedSubmenu) {

        angular.forEach($scope.menus, function (menu) {
          angular.forEach(menu.submenus, function (submenu) {
            submenu.selected = false;
          });
        });
        selectedSubmenu.selected = true;
      };

    }
  ]);
