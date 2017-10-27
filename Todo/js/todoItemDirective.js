(function(){
    var todoApp = angular.module('Todo');
    
    todoApp.directive("todoItem",function(){
        return {
            templateUrl : './js/todoItem.html',
            restrict : "E"
        }
    });
    
})();