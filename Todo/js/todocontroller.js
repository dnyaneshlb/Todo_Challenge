(function(){
    var todoApp = angular.module('Todo');
    todoApp.controller("todoController",["$scope",function($scope){
        
        this.todoList = [new TodoItem("Add Something in List",
                                      "Some quick example text to build on the card title and make up the bulk of the card's content.",
                                      new Date(),
                                      false)];
        
        this.todoSortedTodoList = [];
        this.todoSortedTodoList.todayItems = [];
        this.todoSortedTodoList.tommorowItems = [];
        this.todoSortedTodoList.laterThisWeekItems = [];
        this.todoSortedTodoList.laterThisMonthitems = [];
        this.todoSortedTodoList.laterThisYearItems = [];
        
        this.doneList = [];
        
        this.addItem = function(event){
            var item = new TodoItem($scope.title, $scope.description, $scope.date, false);
            
            if(item.date){
                
                item.date.setHoursZero();
                
                var date = item.date.getDate();
                var month = item.date.getMonth();
                var year = item.date.getYear();
                var  today = new Date().withoutTime();
                var todaysDate = today.getDate();
                var todaysMonth = today.getMonth();
                var todaysYear = today.getYear(); 
                
                if(today.valueOf() === item.date.valueOf()){
                    this.todoSortedTodoList.todayItems.push(item);    
                }
                else if(true){
                    this.todoSortedTodoList.tommorowItems.push(item);    
                }
                else{
                    this.todoList.push(item);
                }
            }
        }
        
        
        this.deleteItem = function(index){
            this.todoList.splice(index,1);
        }
        
        
        /*A class denoting an item in todo list*/
        function TodoItem(title, description, date, isCompleted){
            this.title = title;
            this.description = description;
            this.date = date;
            this.isCompleted = isCompleted;
        };
        
    }]);
})();