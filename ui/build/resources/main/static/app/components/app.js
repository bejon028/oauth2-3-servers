/**
 * Created by Nayan on 10/8/2015.
 */

angular.module('operationDeskAppControllers', ['ntt.TreeDnD', 'mwl.calendar', 'ngAnimate', 'ui.bootstrap']); // declare a module for controllers
angular.module('operationDeskAppFilters', ['ntt.TreeDnD']); // declare a module for filters
angular.module('operationDeskAppI18nFilters', ['ntt.TreeDnD']); // declare a module for internationalization filters
angular.module('operationDeskAppServices', []); // declare a module for services
angular.module('angularBootstrapNavTree', []); // declare a module for services
var operationDeskApp = angular.module('operationDeskApp', [
    'ngRoute',
    'ngResource',
    'ngCookies',
    'ngAnimate',
    'operationDeskAppControllers',
    'operationDeskAppServices',
    'operationDeskAppDatePicker',
    'operationDeskAppFilters',
    'operationDeskAppI18nFilters',
    'angularjs-dropdown-multiselect',
    'operationDeskAppConstants',
    'angularBootstrapNavTree',
    'isteven-multi-select'
]);

operationDeskApp.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|file|blob):/);
    }]);
operationDeskApp.config(['$httpProvider', function ($httpProvider) {//disable http cache
    //initialize get if not there
    //if (!$httpProvider.defaults.headers.get) {
    //    $httpProvider.defaults.headers.get = {};
    //}
    //
    //// Answer edited to include suggestions from comments
    //// because previous version of code introduced browser-related errors
    //
    ////disable IE ajax request caching
    //$httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    //// extra
    //$httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    //$httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
operationDeskApp.config(['$routeProvider', 'resourcePaths', 'routeMap',
    function ($routeProvider, resourcePaths, routeMap) {

        $routeProvider
            .when(routeMap['transaction-logs'], {
                templateUrl: 'app/templates/common/generic/list-view.html',
                controller: 'GenericListViewController',
                resolve: {
                    config: function () {
                        return {
                            'resourceUrl': resourcePaths.baseUrl + '/' + resourcePaths.transactionLogsPaths,
                            'title': 'TRANSACTION_LOGS_TITLE',
                            'headers': [
                                {'TITLE': 'TRANSACTION_TIME', 'COLUMN': 'tmsTransactionDateAndTime'},
                                {'TITLE': 'PAN', 'COLUMN': 'tokenizedPan'},
                                {'TITLE': 'ATC', 'COLUMN': 'atcValue'},
                                {'TITLE': 'TRANSACTION_TYPE', 'COLUMN': 'transactionType'},
                                {'TITLE': 'AMOUNT', 'COLUMN': 'amount'},
                                {'TITLE': 'MERCHANT_CODE', 'COLUMN': 'merchantCode'},
                                {'TITLE': 'RESULT', 'COLUMN': 'transactionResult'},
                                {'TITLE': 'CURRENCY', 'COLUMN': 'currency'},
                                {'TITLE': 'DESCRIPTION', 'COLUMN': 'transactionDescription'},
                                {'TITLE': 'FAILURE_REASON', 'COLUMN': 'failureReason'},
                            ],
                            'options': {
                                add: false,
                                edit: false,
                                delete: false,
                                view: false,
                                pagination: true
                            }
                        }
                    }
                }
            })
            .when(routeMap['application-settings'], {
                templateUrl: 'app/templates/common/generic/list-view.html',
                controller: 'GenericListViewController',
                resolve: {
                    config: function () {
                        return {
                            'resourceUrl': resourcePaths.baseUrl + '/' + resourcePaths.applicationSettingsPath,
                            'title': 'APPLICATION_SETTINGS',
                            'headers': [
                                {'TITLE': 'PROPERTY', 'COLUMN': 'property'},
                                {'TITLE': 'VALUE', 'COLUMN': 'value'}
                            ],
                            'options': {
                                add: true,
                                edit: true,
                                delete: true,
                                view: true
                            }
                        }
                    }
                }
            })

            .when(routeMap['application-settings'] + "/add", {
                templateUrl: 'app/templates/application-settings/add.html',
                controller: 'ApplicationSettingsAddController',
                resolve: {
                    config: function () {
                        return {
                            'resourceUrl': resourcePaths.baseUrl + '/' + resourcePaths.applicationSettingsPath,
                            title: 'APPLICATION_SETTINGS_ADD_TITLE',
                            operationName: 'add',
                            indexUrl: routeMap['application-settings']
                        }
                    }
                }
            })
            .when(routeMap['application-settings'] + "/edit/:id", {
                templateUrl: 'app/templates/application-settings/add.html',
                controller: 'ApplicationSettingsAddController',
                resolve: {
                    config: function () {
                        return {
                            'resourceUrl': resourcePaths.baseUrl + '/' + resourcePaths.applicationSettingsPath,
                            title: 'APPLICATION_SETTINGS_EDIT_TITLE',
                            operationName: 'edit',
                            indexUrl: routeMap['application-settings']
                        }
                    }
                }
            })
            .when(routeMap['application-settings'] + "/view/:id", {
                templateUrl: 'app/templates/application-settings/view.html',
                controller: 'ApplicationSettingsViewController',
                resolve: {
                    config: function () {
                        return {
                            'resourceUrl': resourcePaths.baseUrl + '/' + resourcePaths.applicationSettingsPath,
                            title: 'APPLICATION_SETTINGS_VIEW_TITLE',
                            operationName: 'view',
                            indexUrl: routeMap['application-settings']
                        }
                    }
                }
            })


            .when('/', {
                templateUrl: 'app/templates/home.html',
                controller: 'HomeController',
                isPublic: true
            })
            .when('/404', {
                templateUrl: 'app/templates/404.html',
                isPublic: true
            })
            .when('/403', {
                templateUrl: 'app/templates/403.html',
                isPublic: true
            })
            .otherwise({
                redirectTo: '/404'
            });
    }
]);

operationDeskApp.run(['authorizationService', '$rootScope', '$location', 'menuIdData', '$cookieStore',
    function (authorizationService, $rootScope, $location, menuIdData, $cookieStore) {

        var getOperationName = function (routeObj) {
            if (routeObj.params['operation']) {
                return routeObj.params['operation'];
            } else {
                return "view";
            }
        };

        $rootScope.$on("$routeChangeStart", function (event, next, current) {

            if (!next.isPublic) {

                var operation = getOperationName(next);

                var pathToken = "";
                var resourceName = "";
                if (operation != 'view') {
                    pathToken = $location.path().split('/' + operation);
                } else {
                    pathToken = $location.path();
                }
                resourceName = menuIdData[pathToken[0]];
                var originalPath = next.$$route.originalPath.split('/')[1];
                if ($cookieStore.get('oldResourceName') != originalPath) {
                    $cookieStore.put('oldResourceName', originalPath);
                    $cookieStore.remove('apiParams');
                }
                //console.log(next.$$route.originalPath);
                //console.log("pathToken: ");
                //console.log(pathToken);
                console.log("----- oldResourceName: " + originalPath);
                //console.log("resourceName: "+resourceName);
                //console.log("operation: "+operation);
                //todo: commonAuthorizationDisable will be removed before final release
                if ($location.path() && !authorizationService.isAuthorized(resourceName, operation) && !commonAuthorizationDisable) {
                    $location.path("/403");
                }
            }

        });
    }
]);

angular.element(document).ready(function () {
    var initInjector = angular.injector(["ng", 'operationDeskAppConstants', 'authorizationServiceModule', 'operationDeskAppServices']);
    var $http = initInjector.get("$http");
    var resourcePaths = initInjector.get('resourcePaths');
    var authorizationService = initInjector.get('authorizationService');
    var routeService = initInjector.get('routeService');
    var optionCodesService = initInjector.get('optionCodesService');
    var multiMenuData = initInjector.get('navigationProfile');

    var getCookie = function (cookieName) {
        var name = cookieName + "=";
        var ca = document.cookie.split(";");
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i].trim();
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }

        return "";
    };

    var loadLocaleScript = function (fileName) {
        var fileRef = document.createElement('script');
        fileRef.setAttribute("type", "text/javascript");
        fileRef.setAttribute("src", fileName);
        document.getElementsByTagName("head")[0].appendChild(fileRef);
    };
    var localeLang = getCookie("lang") == "" ? "en" : getCookie("lang").toLowerCase();
    var i18nLocalePath = "libs/angular-1.4.8/i18n/ngLocale/angular-locale_" + localeLang + ".js";
    loadLocaleScript(i18nLocalePath);

    operationDeskApp.service('authorizationService', function () {
        return authorizationService;
    });

    routeService.config(multiMenuData);
    operationDeskApp.constant('routeMap', routeService.getData());
    operationDeskApp.constant('menuIdData', routeService.getMenuIdData());
    operationDeskApp.constant('menuData', multiMenuData);
    angular.bootstrap(document, ['operationDeskApp']);

});
