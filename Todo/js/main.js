(function(){

    /*
        I dont want to consider time for date
    */
    Date.prototype.withoutTime = function(){
        var d = new Date(this);
        d.setHours(0, 0, 0, 0);
        return d;
    }
    
    Date.prototype.setHoursZero = function(){
        this.setHours(0, 0, 0, 0);
    }

	var todoApp = angular.module('Todo',[]);
    
})();