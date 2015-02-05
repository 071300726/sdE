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
connectionStringCtrls.directive('selectable', ['$rootScope', function ($rootScope) {
    return {
		require:'ngModel',
        link: function (scope, element, attrs, ngModel) {
			var $this = $(element);
			
            $this.click(function(){
				$this.siblings('.selected').removeClass('selected');
				$this.addClass('selected');
				
				$rootScope.$broadcast("ConnectionStringCtrl.Filter.Namespace.Changed",ngModel.$modelValue);
			});
			
        }
    };
}]);


		
//connectionStringNamespace
connectionStringCtrls.controller('connectionStringNamespaceCtrl', ['$scope', '$http',
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

//connectionString
connectionStringCtrls.controller('connectionStringCtrl', ['$scope', '$http', '$rootScope',
function ($scope, $http, $rootScope) {
	var onSelectedNamespaceChanged = function(event,msg){
		if($scope.filter.namespace == msg.Namespace) return;
	
		$scope.filter.namespace = msg.Namespace;

		if($scope.filter.namespace == ""){
			$scope.connectionStringList = [];
			return;
		}
		
		var params={
			namespace:$scope.filter.namespace
		};
		$http.get('/efconfig/service/connectionstring',{params:params}).success(function(response){
			$scope.connectionStringList = response.data;
		});
	};

	var init = function(){
		$scope.filter={};
		$scope.connectionStringList = [];
		$rootScope.$on("ConnectionStringCtrl.Filter.Namespace.Changed",onSelectedNamespaceChanged);
	}
	
	init();
	
}]);