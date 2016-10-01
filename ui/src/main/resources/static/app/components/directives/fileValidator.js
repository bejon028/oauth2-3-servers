/**
 * Created by Mamun on 10/26/2015.
 */
operationDeskApp.directive('validFile',function(){
    return {
        require:'ngModel',
        link:function(scope,el,attrs,ngModel){
            el.bind('change',function(){
                scope.$apply(function(){
                    ngModel.$setViewValue(el.val());
                    ngModel.$render();
                })
            })
        }
    }
});

operationDeskApp.directive('ipaddress',function(){
    return {
        require: 'ngModel',
        link: function(scope,elem,attrs,ctrl){
            ctrl.$validators.ipaddress = function (modelValue,viewValue){
                if (ctrl.$isEmpty(modelValue)){
                    return false;
                }
                var matcher;
                if ( (matcher = viewValue.match(/^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/)) != null){
                    var i;
                    var previous = "255";
                    for(i=1;i<5;i++) {
                        var octet =  parseInt(matcher[i]);
                        if (octet > 255) return false;
                    }
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
});