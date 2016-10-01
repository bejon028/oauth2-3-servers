/**
 * Created by Nayan on 10/26/2015.
 */

//Note: to set commonAuthorizationDisable true, you have to stop apache agent
//commonAuthorizationDisable is used for only our development purpose
//usage: app.js, navigation.js
//todo: commonAuthorizationDisable will be removed before final realease
var commonAuthorizationDisable = true;

angular.module('operationDeskAppControllers')
    .controller('ListViewDataController', ['$scope', '$http', 'modalService', '$location', '$cookieStore',
        function ($scope, $http, modalService, $location, $cookieStore) {
            var resourceUrl = $scope.resourceUrl;
            console.log(resourceUrl);
            $scope.basePath = $location.path();
            $scope.data = [];
            $scope.isSearchFormShown = false;
            $scope.searchParams = {};

            $scope.sortByCol = '';
            $scope.sortOrder = 'asc';

            $scope.pageParams = {
                curPage: 1,
                pageCount: 0,
                totalItems: 0,
                pageSize: 20
            };
            if(typeof $scope.inputPageSize != 'undefined'){
                $scope.pageParams.pageSize = $scope.inputPageSize;
            }
            $scope.inputPageSize = $scope.pageParams.pageSize;
            var submittedSearchParams = {};

            var loadData = function () {
                var apiParams = {
                    pageSize: $scope.pageParams.pageSize,
                    page: $scope.pageParams.curPage
                };

                //apiParams['submittedSearchParams'] = submittedSearchParams;
                for (var key in submittedSearchParams) {
                    if (angular.isNumber(submittedSearchParams[key]) || submittedSearchParams[key].trim()) {
                        apiParams[key] = submittedSearchParams[key];
                    }
                }

                if ('' != $scope.sortByCol) {
                    apiParams['sortBy'] = $scope.sortByCol;
                    apiParams['sortOrder'] = $scope.sortOrder;
                }
                console.log(apiParams);
                if(typeof $scope.onClickSelect === 'undefined') {
                    if (typeof $cookieStore.get('apiParams') === 'undefined') {
                        console.log('----- undefined cookie apiParams');
                        $cookieStore.put('apiParams', apiParams);
                    } else {
                        console.log($cookieStore.get('apiParams'));
                        apiParams = $cookieStore.get('apiParams');
                        $scope.pageParams.pageSize = $scope.inputPageSize = apiParams.pageSize;
                    }
                }
                $http.get(resourceUrl, {params: apiParams}).then(function (response) {

                    $scope.data = response.data.content;
                    console.log($scope.data);
                    $scope.pageParams.curPage = 1 + response.data.number;
                    $scope.pageParams.pageCount = response.data.totalPages;
                    $scope.pageParams.totalItems = response.data.totalElements;

                    $scope.startIndex = ($scope.pageParams.curPage - 1) * $scope.pageParams.pageSize + 1;
                    $scope.endIndex = $scope.startIndex + response.data.numberOfElements - 1;

                    $scope.searchParams = submittedSearchParams;
                });
            };

            loadData();

            $scope.pageParamChanged = function () {
                if(typeof $scope.onClickSelect === 'undefined') {
                    $cookieStore.remove('apiParams');
                }
                loadData();
            };

            var removeDataFromScope = function (objId) {
                var toDeleteIndex = -1;
                for (var index = 0, size = $scope.data.length; index < size; index++) {
                    if (objId === $scope.data[index].id) {
                        toDeleteIndex = index;
                    }
                }
                if (toDeleteIndex > -1) {
                    $scope.data.splice(toDeleteIndex, 1);
                }
            };

            var onDeleteFailure = function (responseData) {
                modalService.showErrorMessageModal({message: responseData.data.message});
            };

            var onConfirmDelete = function (id) {
                $http.delete(resourceUrl + '/' + id).then(function (response) {
                    removeDataFromScope(id);
                }, onDeleteFailure);
            };

            $scope.onClickDelete = function (id) {
                modalService.showDeleteConfirmPrompt({resource: id, onConfirmDelete: onConfirmDelete});
            };

            $scope.search = function () {
                if(typeof $scope.onClickSelect === 'undefined') {
                    $cookieStore.remove('apiParams');
                }
                for (var key in $scope.searchParams) {
                    submittedSearchParams[key] = $scope.searchParams[key];
                }
                console.log($scope.searchParams);
                $scope.pageParams.curPage = 1;
                loadData();
            };

            $scope.onKeyPressForSearch = function (keyEvent) {
                if (keyEvent.which === 13) {
                    $scope.search();
                }
            };

            $scope.setPageSize = function () {
                if(typeof $scope.onClickSelect === 'undefined') {
                    $cookieStore.remove('apiParams');
                }
                $scope.pageParams.pageSize = $scope.inputPageSize;
                $scope.pageParams.curPage = 1;
                loadData();
            };

            $scope.showSearchForm = function () {
                $scope.isSearchFormShown = true;
            };

            $scope.resetSearch = function () {
                if(typeof $scope.onClickSelect === 'undefined') {
                    $cookieStore.remove('apiParams');
                }
                submittedSearchParams = {};
                $scope.searchParams = {};
                $scope.isSearchFormShown = false;
                if (angular.isDefined($scope.clearParams)) {
                    $scope.clearParams();
                }
                loadData();
            };
            $scope.reloadData=function(){
                loadData();
            };

      $scope.sortBy = function (colName) {
        if (colName === $scope.sortByCol) {
          if ($scope.sortOrder === 'asc') {
            $scope.sortOrder = 'desc';
          } else {
            $scope.sortOrder = 'asc';
          }
        } else {
          $scope.sortByCol = colName;
          $scope.sortOrder = 'asc';
        }

        loadData();
      };
    }
  ])
  .controller('BasicListViewController', ['$scope', '$http', 'modalService', 'config', '$location',
    function ($scope, $http, modalService, config, $location) {
      var month_name_short = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      $scope.data = [];

      $scope.basePath = $location.path();

      var resourceUrl = config.resourceUrl;
      var viewPath = config.viewPath;
      $scope.listViewPath = config.listViewPath;
      $http.get(resourceUrl).then(function (response) {
        $scope.data = response.data;
        console.log(resourceUrl)
        console.log($scope.data);
        if(config.datePropName && $scope.data){
          for(var i=0; i < $scope.data.length; i++){
            var dt = $scope.data[i][config.datePropName];
            if(dt){
              if(dt.length == 4){ //MMDD
                //$scope.data[i][config.datePropName] = month_name_short[parseInt(dt.substr(0,2))] + " " + dt.substr(2); // Jan 01
                $scope.data[i][config.datePropName] = dt.substr(0,2) + "-" + dt.substr(2); // Jan 01
              }
              if(dt.length == 8){ //YYYYMMDD
                //$scope.data[i][config.datePropName] = month_name_short[parseInt(dt.substr(4,2))] + " " + dt.substr(6) + ", " + dt.substr(0,4); // Jan 01, 2000
                $scope.data[i][config.datePropName] = dt.substr(0,4) + "-" + dt.substr(4,2) + "-" + dt.substr(6);
              }
            }

          }
        }
      });

      var removeDataFromScope = function (objId) {
        var toDeleteIndex = -1;
        for (var index = 0, size = $scope.data.length; index < size; index++) {
          if (objId === $scope.data[index].id) {
            toDeleteIndex = index;
          }
        }
        if (toDeleteIndex > -1) {
          $scope.data.splice(toDeleteIndex, 1);
        }
      };

      var onDeleteFailure = function (responseData) {
        modalService.showErrorMessageModal({message: responseData.data.message});
      };

      var onConfirmDelete = function (id) {
        $http.delete(resourceUrl + '/' + id).then(function (response) {
          removeDataFromScope(id);
        }, onDeleteFailure);
      };

      $scope.onClickDelete = function (id) {
        modalService.showDeleteConfirmPrompt({resource: id, onConfirmDelete: onConfirmDelete});
      };
      $scope.onClickDetails = function (obj) {
        modalService.showDetailsModal(obj, '', viewPath, 'DetailsController');
      }
    }
  ])
  .controller('CommonFormController', ['$scope', '$http', '$location', '$routeParams', 'modalService',
    function ($scope, $http, $location, $routeParams, modalService) {

      var resourceApiUrl = $scope.resourceApiUrl;
      var submitMethod = 'POST';
      var successCallBack;

      $scope.data = $scope.data || {};
      $scope.update=false;

      var modalConfig = {
        'onAddAnother': function () {
          $scope.data = {};
          $scope.mForm.$setPristine(true);
        },
        'onViewList': function () {
          $location.path($scope.listViewPath);
        }
      };

      var errorCallBack = function (responseData) {
        modalService.showErrorMessageModal({message: responseData.data.message});
        //modalService.showErrorMessageModal({message: responseData});
      };

      //$scope.operationName = $location.path().split('/')[3];
      var pathArray = $location.path().split('/');
      if(pathArray.indexOf("add")>-1){
        $scope.operationName = 'add';
      } else if(pathArray.indexOf("edit")>-1){
        $scope.operationName = 'edit';
      } else if(pathArray.indexOf("view")>-1){
        $scope.operationName = 'view';
      }
      console.log("commonForm");
      console.log($location.path());
      console.log($scope.operationName);

      if ($scope.operationName === 'add' || $scope.modal) {
        successCallBack = function (responseData) {
          if($scope.modal){
            $scope.onCreate(responseData);
          }else {
            modalService.showAddSuccessModal(modalConfig);
          }
        };
      }
      else if ($scope.operationName === 'edit') {
        $scope.update=true;
        resourceApiUrl += ('/' + $routeParams.id);
        $http.get(resourceApiUrl).then(function (response) {
          $scope.data = response.data; // may require further processing
          console.log(resourceApiUrl);
          console.log($scope.data);
        });
        submitMethod = 'PUT';
        successCallBack = function (responseData) {
          modalService.showUpdateSuccessModal(modalConfig);
        };
      }
      else if ($scope.operationName === 'view') {
        resourceApiUrl += ('/' + $routeParams.id);
        $http.get(resourceApiUrl).then(function (response) {
          $scope.data = response.data;
        });
      }

      $scope.submit = function () {
        // may require further processing
          if($scope.preSubmitCallback && typeof $scope.preSubmitCallback === 'function'){
              $scope.preSubmitCallback();
          }
        $scope.data.updateOperatorId = "7";
        console.log(resourceApiUrl);
        $http({
          method: submitMethod,
          url: resourceApiUrl,
          data: $scope.data
        }).then(successCallBack, errorCallBack);
      };
    }])
    .controller('InnerModalFormController', ['$scope', '$controller', '$modalInstance','config', 'optionCodes',

      function ($scope, $controller,$modalInstance, config, optionCodes) {
        $scope.optionCodes = optionCodes;
        $scope.modal = true;
        $scope.resourceApiUrl=config.apiUrl;
        $scope.onCreate = function(responseData){
          config.onCreate(responseData);
          $modalInstance.dismiss('cancel');
        };

        angular.extend(this, $controller('CommonFormController', {$scope: $scope}));
        $scope.close = function () {
          $modalInstance.dismiss('cancel');
        };
      }
    ])
  .controller('LanguageChangeController', ['$scope', '$cookies','$window','$http','resourcePaths',
    function ($scope, $cookies, $window,$http,resourcePaths) {

      var localeUrl = resourcePaths.baseUrl+'/'+resourcePaths.localePath;
      $http.get(localeUrl).then(function (response) {
        console.log(response.data);
        $scope.langs = response.data;
      });

      if(!$cookies.get('lang')){
        $cookies.put('lang', "EN");
      }
      $scope.language = $cookies.get('lang');
      $scope.onChangeLang = function () {
        $cookies.lang = $scope.language;
        $cookies.put('lang', $scope.language);
        $window.location.reload();
      }
    }]);
