/**
 * Created by Md. Moniruzzaman (md.moniruzzaman@konasl.com) on 3/1/2016.
 */

angular.module('operationDeskAppServices')
    .service('optionCodesService', [ function () {

        var optionCodes = {};

        this.config = function(data){
            console.log(data);
            optionCodes = data;
        };

        this.getData = function(){
            return optionCodes;
        };
    }]);