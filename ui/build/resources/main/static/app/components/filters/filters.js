/**
 * Created by Mamun on 10/12/2015.
 */
angular.module('operationDeskAppFilters')
  .filter('translate', ['$resource', '$cookies', function ($resource, $cookies) {

    var language = $cookies.get('lang').toLowerCase();
    var translation = null;
    var translation_en = null;
    var serviceInvoked = false;

    function realFilter(input){
        return (translation && translation_en) ? translation[input] || translation_en[input] || '-' : '-';
    }

    filterStub.$stateful = true;
    function filterStub (input) {
        if(!translation){
            if(!serviceInvoked){
                serviceInvoked = true;
                var languageFilePath = 'app/components/data/translation_' + language + '.json';
                var resource=$resource(languageFilePath);
                resource.get().$promise.then(function (data) {
                    translation = data;
                    if(!translation_en)
                    $resource('app/components/data/translation_en.json').get().$promise.then(function (data_en) {
                        translation_en = data_en;
                    });
                });
            }
            return '-';
        }
        else{
            return realFilter(input);
        }
    }
    return filterStub;
}])
    .filter('oddate',function($filter){
        var angularDateFilter = $filter('date');
        return function(input){
            return angularDateFilter(input, 'yyyy/MM/dd');
        }
    })
    .filter('feeDate',function(){
        return function(input){
            if(input){
                var data = input.toString();
                if(data && data.length == 8){
                    return data.substr(0,4)+'/'+data.substr(4,2)+'/'+data.substr(6);
                }
            }
            return input;
        }
    });
