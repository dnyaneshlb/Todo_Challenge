(function(){
    var todoApp = angular.module('Todo');
    
    todoApp.directive("todoItem",function(){
        return {
            templateUrl : './js/todoItem.html',
            restrict : "E",
            compile : function(tElement, tAttributes){
                return {
                    post : function(scope, iElement, iAttributes, controller){
                        if(scope.item){
                            if(scope.item.isCompleted === true){
                                //add css to visually appeal as completed
                                iElement.addClass('completed-item');
                                
                                //We dont want edit capability to completed item
                                iElement.find("img")[0].remove();
                            }
                        }
                    }
                }
            }
        }
    });
    
})();