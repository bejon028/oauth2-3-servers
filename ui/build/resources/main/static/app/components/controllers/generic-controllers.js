/**
 * Created by Nayan on 10/26/2015.
 */

/**
 * Created by Md. Moniruzzaman (md.moniruzzaman@konasl.com) on 2/10/2016.
 */


angular.module('operationDeskAppControllers')
    .controller('GenericListViewController', ['$scope', '$http', 'modalService', 'config', '$location', 'optionCodes', '$filter', '$cookieStore',
        function ($scope, $http, modalService, config, $location, optionCodes, $filter, $cookieStore) {

            //console.log($cookieStore.get('apiParams'));

            $scope.data = [];
            $scope.optionCodes = optionCodes;
            $scope.basePath = $location.path();
            $scope.title = config.title;
            $scope.headers = config.headers;
            $scope.topOptions = (typeof config.options.topOptions !== "undefined") ? config.options.topOptions : false;
            $scope.topOptionEnable = (typeof config.options.topOptions !== "undefined") ? true : false;
            $scope.addOption = (typeof config.options.add !== "undefined") ? config.options.add : true;
            $scope.editOption = (typeof config.options.edit !== "undefined") ? config.options.edit : false;
            $scope.deleteOption = (typeof config.options.delete !== "undefined") ? config.options.delete : false;
            $scope.viewOption = (typeof config.options.view !== "undefined") ? config.options.view : false;
            $scope.paginationOption = (typeof config.options.pagination !== "undefined") ? config.options.pagination : false;
            $scope.searchOption = (typeof config.options.search !== "undefined") ? config.options.search : false;

            $scope.searchOptions = [];
            $scope.headers.forEach(function (header) {
                var searchOption = {};

                searchOption['enable'] = (typeof header.SEARCH !== "undefined") ? true : false;
                if (searchOption['enable']) {
                    searchOption['placeholder'] = header.TITLE;
                    searchOption['model'] = header.COLUMN;
                    searchOption['type'] = (typeof header.SEARCH.TYPE !== "undefined") ? header.SEARCH.TYPE : false;
                    if (searchOption['type'] == 'COMBO' || searchOption['type'] == 'COMBO_PAIR') {
                        searchOption['options'] = [];
                        var optionPath = (typeof header.SEARCH.OPTION_PATH !== "undefined") ? header.SEARCH.OPTION_PATH : false;
                        if (optionPath != false) {
                            $http.get(optionPath).then(function (response) {
                                response.data.forEach(function (data) {
                                    searchOption['options'].push(data[header.COLUMN]);
                                });
                            });
                        } else {
                            searchOption['options'] = (typeof header.SEARCH.OPTIONS !== "undefined") ? header.SEARCH.OPTIONS : false;
                        }
                    }
                }
                $scope.searchOptions.push(searchOption);
            });
            console.log($scope.searchOptions);

            $scope.print_data = function (header, d) {
                if ((header.COLUMN.indexOf(".") > -1) && (header.COLUMN.indexOf(" ") > -1)) {
                    var columnArray = header.COLUMN.split(" ");
                    var pattern = header.PATTERN;
                    var columnArrayValue;
                    for (var i = 0; i < columnArray.length; i++) {
                        columnArrayValue = columnArray[i].split(".");
                        pattern = pattern.replace("{%}", d[columnArrayValue[0]][columnArrayValue[1]]);
                    }
                    return pattern
                }
                if (header.COLUMN.indexOf(".") > -1) {
                    var columnArray = header.COLUMN.split(".");
                    return d[columnArray[0]][columnArray[1]];
                }
                if (header.COLUMN.indexOf("|") > -1) {
                    var columnArray = header.COLUMN.split("|");
                    return $filter(columnArray[1])(d[columnArray[0]]);
                }
                if (header.COLUMN.indexOf("->") > -1) {
                    var columnArray = header.COLUMN.split("->");
                    var codes = optionCodes[columnArray[1]];
                    console.log(optionCodes[columnArray[1]]);
                    for(var i=0; i<codes.length; i++){
                        if(codes[i].code3 == d[columnArray[0]]){
                            return codes[i].codeDisplayName;
                        }

                    }
                }
                if (header.COLUMN.indexOf(" ") > -1) {
                    var columnArray = header.COLUMN.split(" ");
                    var pattern = header.PATTERN;
                    for (var i = 0; i < columnArray.length; i++) {
                        pattern = pattern.replace("{%}", d[columnArray[i]]);
                    }
                    return pattern;
                } else {
                    return d[header.COLUMN];
                }
            };


            //////////////////////ListViewDataController
            var resourceUrl = config.resourceUrl;
            $scope.basePath = $location.path();
            $scope.data = [];
            $scope.isSearchFormShown = false;

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

            $scope.searchParams = {};

            var submittedSearchParams = {};

            var loadData = function () {
                var apiParams = {
                    pageSize: $scope.pageParams.pageSize,
                    page: $scope.pageParams.curPage
                };
                apiParams['submittedSearchParams'] = submittedSearchParams;
                for (var key in submittedSearchParams) {
                    if (submittedSearchParams[key].trim()) {
                        apiParams[key] = submittedSearchParams[key];
                    }
                }

                if ('' != $scope.sortByCol) {
                    apiParams['sortBy'] = $scope.sortByCol;
                    apiParams['sortOrder'] = $scope.sortOrder;
                }

                if(typeof $cookieStore.get('apiParams') === 'undefined'){
                    console.log('----- undefined cookie apiParams');
                    $cookieStore.put('apiParams', apiParams);
                } else {
                    console.log('----- cookie apiParams defined');
                    console.log('----- apiParams');
                    console.log($cookieStore.get('apiParams'));
                    apiParams = $cookieStore.get('apiParams');
                    $scope.pageParams.pageSize = $scope.inputPageSize = apiParams.pageSize;
                }
                if ($scope.paginationOption) {
                    $http.get(resourceUrl, {params: apiParams}).then(function (response) {
                        $scope.data = response.data.content;
                        $scope.pageParams.curPage = 1 + response.data.number;
                        $scope.pageParams.pageCount = response.data.totalPages;
                        $scope.pageParams.totalItems = response.data.totalElements;

                        $scope.startIndex = ($scope.pageParams.curPage - 1) * $scope.pageParams.pageSize + 1;
                        $scope.endIndex = $scope.startIndex + response.data.numberOfElements - 1;
                        //console.log($scope.data);
                        $scope.searchParams = apiParams['submittedSearchParams'];
                    });
                } else {
                    var apiParams1 = {};
                    apiParams1['sortBy'] = $scope.sortByCol;
                    apiParams1['sortOrder'] = $scope.sortOrder;
                    $http.get(resourceUrl, {params: apiParams1}).then(function (response) {
                        $scope.data = response.data;
                        //console.log($scope.data);
                    });
                }
            };

            loadData();

            $scope.pageParamChanged = function () {
                $cookieStore.remove('apiParams');
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
                $cookieStore.remove('apiParams');
                for (var key in $scope.searchParams) {
                    submittedSearchParams[key] = $scope.searchParams[key];
                }
                console.log(submittedSearchParams);
                $scope.pageParams.curPage = 1;
                loadData();
            };

            $scope.setPageSize = function (inputPageSize) {
                $cookieStore.remove('apiParams');
                $scope.inputPageSize = inputPageSize;
                $scope.pageParams.pageSize = $scope.inputPageSize;
                $scope.pageParams.curPage = 1;
                loadData();
            };

            $scope.showSearchForm = function () {
                $scope.isSearchFormShown = true;
            };

            $scope.resetSearch = function () {
                $cookieStore.remove('apiParams');
                submittedSearchParams = {};
                $scope.searchParams = {};
                $scope.isSearchFormShown = false;
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

            $scope.url1 = $location.path().substring($location.path().lastIndexOf('http'));

            $scope.onKeyPressForSearch = function (keyEvent) {
                if (keyEvent.which === 13) {
                    $scope.search();
                }
            };

        }
    ])
    .controller('GenericExternalViewController', ['$scope', '$http', 'modalService', 'config', '$location', '$sce', '$cookies',
        function ($scope, $http, modalService, config, $location, $sce, $cookies) {

            console.log('locurl: ' + $location.path());
            var lan = $cookies.get("lang");
            $scope.menuurl = $location.path().substring($location.path().lastIndexOf('http')) + '?lan=' + lan;
            $scope.menuurl = $sce.trustAsResourceUrl($scope.menuurl);
            console.log($scope.menuurl);

            console.log('url: ' + $scope.menuurl);
        }
    ])
;