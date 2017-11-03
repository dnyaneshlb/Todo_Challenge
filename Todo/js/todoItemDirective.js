(function(){
    var todoApp = angular.module('Todo');
    
    todoApp.directive("todoItem",function(){
        return {
            templateUrl : './js/todoItem.html',
            restrict : "E",
            scope: true,
            controller : function($scope){
                $scope.editIcon = "edit.png";
                
                $scope.editItem = function(){
                    $scope.editMode = !$scope.editMode;  
                    $scope.editIcon = $scope.editIcon === "save.png" ? "edit.png" : "save.png";
                }
            },
            compile : function(tElement, tAttributes){
                return {
                    post : function(scope, iElement, iAttributes, controller){
                        if(scope.item){
                            
                            if(scope.item.isCompleted === true){
                                //add css to visually appeal as completed
                                iElement.find('div').addClass('completed-item');
                                
                                //We dont want edit capability to completed item
                                iElement.find("img")[0].remove();
                            }
                            else{
                                //define styling for todo items
                                iElement.find('div').addClass('todo-item');
                                scope.$odd ? iElement.find('div').addClass('odd-todo-item') :
                                    iElement.find('div').addClass('even-todo-item');
                            }
                        }
                    }
                }
            }
        }
    });
    
})();