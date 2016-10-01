/**
 * Created by Nayan on 12/7/2015.
 */
var authorizationServiceFunction = function(){
  var accessMatrix = {};

  this.config = function(data){
    for(var i = 0, size = data.length; i < size; i++){
      var resourceAccessMatrix = data[i];
      var accessPermissions = {
        'add': resourceAccessMatrix.canAdd,
        'edit': resourceAccessMatrix.canEdit,
        'view': resourceAccessMatrix.canView,
        'delete': resourceAccessMatrix.canDelete
      };
      accessMatrix[resourceAccessMatrix['resource']] = accessPermissions;
    }
  };

  this.isAuthorized = function(resourceName, accessName){
    return true;
    /*
    if(accessMatrix[resourceName] && accessMatrix[resourceName][accessName]){
      return true;
    } else {
      return false;
    }*/
  };
};

angular.module('authorizationServiceModule', []).service('authorizationService', authorizationServiceFunction);
