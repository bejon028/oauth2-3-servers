/**
 * Created by Mamun on 2016-05-24.
 */
operationDeskApp.directive('ckEditor', function () {
    return {
        require: '?ngModel',
        link: function (scope, elm, attr, ngModel) {
            var ck = CKEDITOR.replace(elm[0]);
            if (!ngModel) return;
            ck.on('instanceReady', function () {
                ck.setData(ngModel.$viewValue);
            });
            function updateModel() {
                /*if(!scope.$$phase) {// never use $$phase--this is for angular internal and not future safe
                    scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                }*/
                setTimeout(function(){
                    scope.$apply(function () {
                        ngModel.$setViewValue(ck.getData());
                    });
                },2000);
            }
            ck.on('change', updateModel);
            ck.on('key', updateModel);
            ck.on('dataReady', updateModel);

            ngModel.$render = function (value) {
                ck.setData(ngModel.$viewValue);
            };
        }
    };
});