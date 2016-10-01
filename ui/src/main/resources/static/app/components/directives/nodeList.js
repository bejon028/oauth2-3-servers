function Node(name, children) {
    this.name = name;
    this.children = children || [];
}

angular.module('operationDeskAppControllers', ['ui.bootstrap'])

    .directive('nodeList', ['$compile', '$http', function($compile, $http) {
        return {
            restrict: 'E',
            terminal: true,
            scope: {
                nodes: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
                if (angular.isArray($scope.nodes)) {
                    $element.append('<div><node ng-repeat="item in nodes" ng-model="item"></node></div>');
                }
                $compile($element.contents())($scope.$new());
            }
        };
    }])

    .directive('node', ['$compile', '$http', 'resourcePaths', function($compile, $http, resourcePaths) {
        return {
            restrict: 'E',
            terminal: true,
            scope: {
                node: '=ngModel'
            },
            link: function ($scope, $element, $attrs) {
                $scope.addNew = function(node){
                    var id = node.merchantEntity.merchantId;
                    var parentId = node.id;
                    console.log('id:'+id);
                    //find a node from data by id
                    var resourceApiUrl = resourcePaths.baseUrl + '/' + 'merchant-group/'+id+'/childs';
                    $http.get(resourceApiUrl).then(function (response) {
                        //$scope.nodes = response.data;
                        console.log(resourceApiUrl);
                        console.log(response.data);
                        $scope.node["childrens"] = [];
                        var childrens = response.data;
                        $scope.node.childrens.push(childrens);

                        console.log( $scope.node);
                        var e = angular.element(document.querySelector("#id"+parentId));
                        console.log("id"+parentId);
                        console.log(e);
                        //element.append('<div id="id{{id}}" ng-click="addNew(node)">{{node.name}}<div ng-model="node.children"></div></div>');
                        childrens.forEach( function(children){
                            console.log(children);
                            $scope.children = children;
                            if (angular.isArray($scope.node.childrens) && $scope.node.childrens.length > 0) {
                                e.append('<div id="id{{children.id}}" ng-click="addNew(children)">{{node.name}}<div ng-model="node.children"></div></div>');
                            } else {
                                e.append('<div id="id{{children.id}}" ng-click="addNew(children)">{{node.name}}</div>');
                            }
                        });

                        $compile($element.contents())($scope.$new());
                    });
                };
                console.log("isReached");
                if (angular.isArray($scope.node.childrens) && $scope.node.childrens.length > 0) {
                    $element.append('<div  id="id{{node.id}}" class="node" ng-click="addNew(node)">{{node.name}}<div ng-model="node.children"></div></div>');
                } else {
                    $element.append('<div  id="id{{node.id}}" class="node"  ng-click="addNew(node)">{{node.name}}</div>');
                }
                $compile($element.contents())($scope.$new());

                $element.bind('click',function(){});
            }
        };
    }])

    .controller('myView', function($scope) {
        var element = angular.element(document.getElementsByClassName("<div/>"));
        $scope.testing = function(){
            console.log($scope.data);
            console.log(element);
        };
        element.html("<h1>NODE</h1>");
        $scope.data = [
            {
                "created_by": "KONAPAY SYSTEM",
                "modified_by": "KONAPAY SYSTEM",
                "id": 350000,
                "merchantEntity": {
                    "created_by": "KONAPAY SYSTEM",
                    "modified_by": "KONAPAY SYSTEM",
                    "id": 352500,
                    "merchantId": "065680000070004",
                    "merchantName": "Merchant Parent2",
                    "webYN": "YES",
                    "webId": "065680000070004",
                    "operationStatus": null,
                    "corporateYN": "YES",
                    "suspendedDate": null,
                    "suspendedReason": null,
                    "homePage": null,
                    "merchantClsEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "merchantClsCode": 12,
                        "merchantClsParentCode": 0,
                        "treeLvl": 0,
                        "feeRateEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 250000,
                            "feeCode": "12",
                            "feeName": "fee rate",
                            "use": "YES",
                            "note": null,
                            "updateOperatorId": "7"
                        },
                        "clsName": "merchn cls",
                        "useYesNo": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "feeRateEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "feeCode": "12",
                        "feeName": "fee rate",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "clearingType": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "clearingTypeCode": "12",
                        "clearingTypeName": "clearing",
                        "mergeIssuer": "MERGE",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "creditLevelCode": "32",
                    "etc1": null,
                    "etc2": null,
                    "etc3": null,
                    "note": null,
                    "updateOperatorId": null,
                    "merchantDetailEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 350000,
                        "countryEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 50050,
                            "code": "BD",
                            "name": "Bangladesh",
                            "isoCode": "050"
                        },
                        "representativeName": "gfhfgh",
                        "telephoneNumber": "5445",
                        "faxNumber": null,
                        "mobileNumber": null,
                        "contactName": null,
                        "contactTelephone": null,
                        "email": null,
                        "bankCode": "3434",
                        "accountNumber": "3545",
                        "accountNumberAuthYesNo": "YES",
                        "accountName": "fdfdf",
                        "signboardName": null,
                        "corporationNo": null,
                        "corporationName": null,
                        "businessLicenseNo": null,
                        "addressCase": 1,
                        "zipCode1": null,
                        "addressDetails1": null,
                        "zipCode2": null,
                        "addressDetails2": null,
                        "addressDetails2ref": null,
                        "taxBizCode1": null,
                        "taxBizCode2": null,
                        "realnmNo": null,
                        "realnmAuthYN": "YES",
                        "taxDeductionType": null,
                        "passwordUpdateDate": 1457064192402,
                        "failCount": 0,
                        "webPwd1": null,
                        "webPwd2": null,
                        "webPwd3": null,
                        "webPwd4": null
                    }
                },
                "merchantParentEntity": {
                    "created_by": "KONAPAY SYSTEM",
                    "modified_by": "KONAPAY SYSTEM",
                    "id": 352500,
                    "merchantId": "065680000070004",
                    "merchantName": "Merchant Parent2",
                    "webYN": "YES",
                    "webId": "065680000070004",
                    "operationStatus": null,
                    "corporateYN": "YES",
                    "suspendedDate": null,
                    "suspendedReason": null,
                    "homePage": null,
                    "merchantClsEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "merchantClsCode": 12,
                        "merchantClsParentCode": 0,
                        "treeLvl": 0,
                        "feeRateEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 250000,
                            "feeCode": "12",
                            "feeName": "fee rate",
                            "use": "YES",
                            "note": null,
                            "updateOperatorId": "7"
                        },
                        "clsName": "merchn cls",
                        "useYesNo": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "feeRateEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "feeCode": "12",
                        "feeName": "fee rate",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "clearingType": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "clearingTypeCode": "12",
                        "clearingTypeName": "clearing",
                        "mergeIssuer": "MERGE",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "creditLevelCode": "32",
                    "etc1": null,
                    "etc2": null,
                    "etc3": null,
                    "note": null,
                    "updateOperatorId": null,
                    "merchantDetailEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 350000,
                        "countryEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 50050,
                            "code": "BD",
                            "name": "Bangladesh",
                            "isoCode": "050"
                        },
                        "representativeName": "gfhfgh",
                        "telephoneNumber": "5445",
                        "faxNumber": null,
                        "mobileNumber": null,
                        "contactName": null,
                        "contactTelephone": null,
                        "email": null,
                        "bankCode": "3434",
                        "accountNumber": "3545",
                        "accountNumberAuthYesNo": "YES",
                        "accountName": "fdfdf",
                        "signboardName": null,
                        "corporationNo": null,
                        "corporationName": null,
                        "businessLicenseNo": null,
                        "addressCase": 1,
                        "zipCode1": null,
                        "addressDetails1": null,
                        "zipCode2": null,
                        "addressDetails2": null,
                        "addressDetails2ref": null,
                        "taxBizCode1": null,
                        "taxBizCode2": null,
                        "realnmNo": null,
                        "realnmAuthYN": "YES",
                        "taxDeductionType": null,
                        "passwordUpdateDate": 1457064192402,
                        "failCount": 0,
                        "webPwd1": null,
                        "webPwd2": null,
                        "webPwd3": null,
                        "webPwd4": null
                    }
                },
                "treeLevel": 1,
                "name": "Merchant Group 2",
                "settlementMerchantId": null,
                "useYN": "YES",
                "note": null,
                "updateOperatorId": "7"
            },
            {
                "created_by": "KONAPAY SYSTEM",
                "modified_by": "KONAPAY SYSTEM",
                "id": 250000,
                "merchantEntity": {
                    "created_by": "KONAPAY SYSTEM",
                    "modified_by": "KONAPAY SYSTEM",
                    "id": 252500,
                    "merchantId": "065660000050008",
                    "merchantName": "Merchant",
                    "webYN": "YES",
                    "webId": "065660000050008",
                    "operationStatus": "OK",
                    "corporateYN": "YES",
                    "suspendedDate": null,
                    "suspendedReason": null,
                    "homePage": null,
                    "merchantClsEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "merchantClsCode": 12,
                        "merchantClsParentCode": 0,
                        "treeLvl": 0,
                        "feeRateEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 250000,
                            "feeCode": "12",
                            "feeName": "fee rate",
                            "use": "YES",
                            "note": null,
                            "updateOperatorId": "7"
                        },
                        "clsName": "merchn cls",
                        "useYesNo": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "feeRateEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "feeCode": "12",
                        "feeName": "fee rate",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "clearingType": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "clearingTypeCode": "12",
                        "clearingTypeName": "clearing",
                        "mergeIssuer": "MERGE",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "creditLevelCode": "23",
                    "etc1": null,
                    "etc2": null,
                    "etc3": null,
                    "note": null,
                    "updateOperatorId": null,
                    "merchantDetailEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "countryEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 50050,
                            "code": "BD",
                            "name": "Bangladesh",
                            "isoCode": "050"
                        },
                        "representativeName": "xvcv",
                        "telephoneNumber": "234242",
                        "faxNumber": null,
                        "mobileNumber": null,
                        "contactName": null,
                        "contactTelephone": null,
                        "email": null,
                        "bankCode": "3434",
                        "accountNumber": "343434",
                        "accountNumberAuthYesNo": "YES",
                        "accountName": "cvcv",
                        "signboardName": null,
                        "corporationNo": null,
                        "corporationName": null,
                        "businessLicenseNo": null,
                        "addressCase": 1,
                        "zipCode1": null,
                        "addressDetails1": null,
                        "zipCode2": null,
                        "addressDetails2": null,
                        "addressDetails2ref": null,
                        "taxBizCode1": null,
                        "taxBizCode2": null,
                        "realnmNo": null,
                        "realnmAuthYN": "YES",
                        "taxDeductionType": null,
                        "passwordUpdateDate": 1456898456309,
                        "failCount": 0,
                        "webPwd1": null,
                        "webPwd2": null,
                        "webPwd3": null,
                        "webPwd4": null
                    }
                },
                "merchantParentEntity": {
                    "created_by": "KONAPAY SYSTEM",
                    "modified_by": "KONAPAY SYSTEM",
                    "id": 252500,
                    "merchantId": "065660000050008",
                    "merchantName": "Merchant",
                    "webYN": "YES",
                    "webId": "065660000050008",
                    "operationStatus": "OK",
                    "corporateYN": "YES",
                    "suspendedDate": null,
                    "suspendedReason": null,
                    "homePage": null,
                    "merchantClsEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "merchantClsCode": 12,
                        "merchantClsParentCode": 0,
                        "treeLvl": 0,
                        "feeRateEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 250000,
                            "feeCode": "12",
                            "feeName": "fee rate",
                            "use": "YES",
                            "note": null,
                            "updateOperatorId": "7"
                        },
                        "clsName": "merchn cls",
                        "useYesNo": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "feeRateEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "feeCode": "12",
                        "feeName": "fee rate",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "clearingType": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "clearingTypeCode": "12",
                        "clearingTypeName": "clearing",
                        "mergeIssuer": "MERGE",
                        "use": "YES",
                        "note": null,
                        "updateOperatorId": "7"
                    },
                    "creditLevelCode": "23",
                    "etc1": null,
                    "etc2": null,
                    "etc3": null,
                    "note": null,
                    "updateOperatorId": null,
                    "merchantDetailEntity": {
                        "created_by": "KONAPAY SYSTEM",
                        "modified_by": "KONAPAY SYSTEM",
                        "id": 250000,
                        "countryEntity": {
                            "created_by": "KONAPAY SYSTEM",
                            "modified_by": "KONAPAY SYSTEM",
                            "id": 50050,
                            "code": "BD",
                            "name": "Bangladesh",
                            "isoCode": "050"
                        },
                        "representativeName": "xvcv",
                        "telephoneNumber": "234242",
                        "faxNumber": null,
                        "mobileNumber": null,
                        "contactName": null,
                        "contactTelephone": null,
                        "email": null,
                        "bankCode": "3434",
                        "accountNumber": "343434",
                        "accountNumberAuthYesNo": "YES",
                        "accountName": "cvcv",
                        "signboardName": null,
                        "corporationNo": null,
                        "corporationName": null,
                        "businessLicenseNo": null,
                        "addressCase": 1,
                        "zipCode1": null,
                        "addressDetails1": null,
                        "zipCode2": null,
                        "addressDetails2": null,
                        "addressDetails2ref": null,
                        "taxBizCode1": null,
                        "taxBizCode2": null,
                        "realnmNo": null,
                        "realnmAuthYN": "YES",
                        "taxDeductionType": null,
                        "passwordUpdateDate": 1456898456309,
                        "failCount": 0,
                        "webPwd1": null,
                        "webPwd2": null,
                        "webPwd3": null,
                        "webPwd4": null
                    }
                },
                "treeLevel": 1,
                "name": "Merchant group",
                "settlementMerchantId": null,
                "useYN": "YES",
                "note": null,
                "updateOperatorId": "7"
            }
        ];
    });