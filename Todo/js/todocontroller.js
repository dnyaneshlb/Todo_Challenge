(function(){
    var todoApp = angular.module('Todo');
    todoApp.controller("todoController",["$scope","$filter",function($scope, $filter){
        
        this.todoSortedTodoList = [];
        this.todoSortedTodoList.todayItems = [];
        this.todoSortedTodoList.tommorowItems = [];
        this.todoSortedTodoList.laterThisWeekItems = [];
        this.todoSortedTodoList.laterThisMonthitems = [];
        this.todoSortedTodoList.laterThisYearItems = [new TodoItem("Add Something in List",
                                      "Some quick example text to build on the card title and make up the bulk of the card's content.",
                                      new Date().withoutTime(),
                                      false)];
        
        this.doneList = [];
        this.editIcon = "edit.png";
        
        /*
            Add completed task back to todo list.
        */
        this.addBack = function (item){
            this.addItem(item);
        }
        
        /*
            Edit a todo item.
        */
        this.editItem = function(index, item){
            
            
            item.editMode = !item.editMode;  
            this.editIcon = this.editIcon === "save.png" ? "edit.png" : "save.png";
            
            
        }
        
        /*
            Add item in todo list
        */
        this.addItem = function(item){
            
            if(!item){
                item = new TodoItem($scope.title, $scope.description, $scope.date, false);
            }
            
            if(item.date){
                
                item.date.setHoursZero();
                var  today = new Date().withoutTime();
                
                if(today.getTime() === item.date.getTime()){
                    this.todoSortedTodoList.todayItems.push(item);    
                }
                else if(today.getTime() < item.date.getTime()){
                    //Future date
                    
                    var nextWeek = new Date().withoutTime();
                    nextWeek.setDate(nextWeek.getDate() + 6);
                    
                    var thisMonth = new Date().withoutTime();
                    
                    if(thisMonth.getYear() === item.date.getYear())
                    {
                        this.todoSortedTodoList.laterThisYearItems.push(item);    
                        
                        if(thisMonth.getMonth() === item.date.getMonth())
                        {
                            this.todoSortedTodoList.laterThisMonthitems.push(item);    
                            
                            //Check if it is this week's date
                            var thisWeekBounds = getThisWeekBounds(today);
                            if(thisWeekBounds.endDay.getTime() >= item.date.getTime()){
                                
                                this.todoSortedTodoList.laterThisWeekItems.push(item);
                                //check if it is tomorrow's date
                                var tomorrow = new Date().withoutTime();
                                tomorrow.setDate(tomorrow.getDate() + 1);
                                
                                if(tomorrow.getTime() === item.date.getTime()){
                                    this.todoSortedTodoList.tommorowItems.push(item);    
                                }
                            }
                        }    
                    }
                }
                else if(today.getTime() > item.date.getTime()){
                    //Date in Past
                    alert("Sorry You cannot add date of past");
                }
                else{
                    alert("IMpossible usecase");
                }
            }
            else{
                //no date selection
                this.todoSortedTodoList.laterThisYearItems.push(item);
            }
        }
        
        
        /*
            This function deletes an item from todoList
            This will take care of removing items from all associated lists like tomorrow's list, this week's list etc.
        */
        this.deleteItem = function(index, item){
            
            if(item.isCompleted){
                removeItem(this.doneList,item);    
            }
            else{
                removeItem(this.todoSortedTodoList.laterThisYearItems,item);
                removeItem(this.todoSortedTodoList.laterThisMonthitems,item);
                removeItem(this.todoSortedTodoList.laterThisWeekItems,item);
                removeItem(this.todoSortedTodoList.tommorowItems,item);
                removeItem(this.todoSortedTodoList.todayItems,item);
            }
            
        }
        
        /*
            Mark task as complete.
        */
        this.markComplete = function(index, item){
            if(item.isCompleted){
                this.doneList.push(item);
                item.isCompleted = false;
                this.deleteItem(index, item);
                item.isCompleted = true;
            }
            else{
                this.doneList.splice(index, 1);
                this.addBack(item);
            }
        }
        
        
        
        function removeItem (list,todoItem)
        {
            if(list.length > 0){
                var ss = $filter('filter')(list, todoItem); 
                if(ss.length > 0){
                    list.splice(list.indexOf(ss[0],1));
                }
            }
            
        }
        
        
        /*
            This function returns this week bounds - today is startDay and sunday as endDay of the week
        */
        function getThisWeekBounds(date){
            var thisWeek = {
                currentDay : date,
                endDay : new Date().withoutTime()
            }
            
            if(date instanceof Date){
                var dayInWeek = date.getDay();
                thisWeek.endDay.setDate(date.getDate() + (7 - date.getDay()) % 7);
                
            }
            
            return thisWeek;
        }
        
        
        /*
            A class denoting an item in todo list
        */
        function TodoItem(title, description, date, isCompleted, editMode){
            this.title = title;
            this.description = description;
            this.date = date;
            this.isCompleted = isCompleted;
            this.editMode = editMode;
        };
        
    }]);
})();
