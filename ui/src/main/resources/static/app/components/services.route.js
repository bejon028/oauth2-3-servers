/**
 * Created by Md. Moniruzzaman (md.moniruzzaman@konasl.com) on 1/26/2016.
 */

angular.module('operationDeskAppServices')
    .service('routeService', [ 'authorizationService', function (authorizationService) {
        var routeData = [];
        var menuIdData = [];
        var menuData = [];
        var i = 0;
        this.config = function(data){
            console.log(data);
            window.menu = data;
            var isAuthorised = function(menuEntity){
                if(authorizationService.isAuthorized(menuEntity.menuId, 'view')){
                    return true;
                } else {
                    return false;
                }
            };

            var authFilter = function (res) {
                var _ret = {};
                if(isAuthorised(res.menuEntity)){
                    _ret['menuEntity'] = res.menuEntity;
                    _ret['subMenuMultiLevelResponses'] = [];
                    var i = 0;
                    res.subMenuMultiLevelResponses.forEach(function(res){
                        if(authFilter(res) != null) {
                            _ret.subMenuMultiLevelResponses[i++] = authFilter(res);
                        }
                    });
                    return _ret;
                } else {
                    return null;
                }
            };

            var initRouteData = function(res){
                routeData[res.menuEntity.menuId] = res.menuEntity.menuExe;

                menuIdData[res.menuEntity.menuExe] = res.menuEntity.menuId;
                res.subMenuMultiLevelResponses.forEach(function(res){
                    initRouteData(res);
                });
            };

            data.forEach(function(res){
                routeData[res.menuEntity.menuId] = res.menuEntity.menuExe;
                menuIdData[res.menuEntity.menuExe] = res.menuEntity.menuId;
                res.subMenuMultiLevelResponses.forEach(function(res){
                    initRouteData(res);
                });
                //console.log(res.menuEntity.menuId + " " + isAuthorised(res.menuEntity).toString());
                if(authFilter(res) != null) {
                    menuData[i++] = authFilter(res);
                }
            });
        };

        this.getData = function(){
            return routeData;
        };

        this.getMenuIdData = function(){
            return menuIdData;
        };

        this.getMenuData = function(){
            return menuData;
        };
    }]);
