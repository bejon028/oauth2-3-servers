/**
 * Created by Moni on 12/28/2015.
 */
angular.module('operationDeskAppI18nFilters')
    .filter('test_filter', ['$locale', function ($locale) {
        var formats = $locale.NUMBER_FORMATS;
        return function(number) {

            return (number == null)
                ? number
                : number + formats.CURRENCY_SYM;
        };
    }]);