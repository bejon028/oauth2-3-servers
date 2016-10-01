/**
 * Created by Moni on 1/5/2016.
 */

angular.module('operationDeskAppControllers')
    .controller('menuTreeController', ['$scope', 'menuData', '$cookies', '$location',
        function ($scope, menuData, $cookies, $location) {
            $scope.my_data = menuData;
            $scope.my_tree = tree = {};
            //$scope.branch = {};
            //
            //var isInitSelect = false;
            //$scope.my_tree_handler = function(branch){
            //    if(!isInitSelect){
            //        isInitSelect = true;
            //        tree.select_branch_by_menu_id($cookies.get('initialSelection'));
            //    }
            //    $cookies.put('initialSelection', branch.menuEntity.menuId);
            //    $location.url(branch.menuEntity.menuExe);
            //};
        }]);

