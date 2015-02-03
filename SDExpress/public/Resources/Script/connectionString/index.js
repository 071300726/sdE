'use strict';

/* App Module */

var courseApp = angular.module('app', [
  'connectionStringCtrls'
]);

var connectionStringCtrls = angular.module('connectionStringCtrls', []);

connectionStringCtrls.directive('editable', function () {
    return {
        link: function (scope, element, attrs) {
			var $this = $(element);
			var $span = $this.find('span');
			var $input = $this.find('input');
			
			$input.hide();
			
            $this.click(function(){
				$span.hide();
				$input.show().focus();
			});
			
			$this.find('input').blur(function(){
				$input.hide();
				$span.show();
			});
        }
    };
});


connectionStringCtrls.controller('defaultCtrl', ['$scope', '$http',
function ($scope, $http) {
	var onNamespaceChanged = function(){
		var params={
			namespace:$scope.filter.namespace
		};
		$http.get('/efconfig/service/connectionstringnamespace',{params:params}).success(function(response){
			$scope.namespaceList = response.data;
		});
	}
	
	var init = function(){
		$scope.filter = {namespace:''};
		$scope.namespaceList=[];
		$scope.onNamespaceChanged=onNamespaceChanged;
		onNamespaceChanged();
	}
	
	init();
	
}]);