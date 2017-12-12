var categories =[
    "lockets","charms","chains"
];

var items =[
    {name:"red charm", price:3.99, category:"charms", size:1},
    {name:"blue charm", price:3.99, category:"chamrs", size:1},
    {name:"green charm", price:3.99, category:"charms", size:1},
    {name:"purple charm", price:3.99, category:"charms", size:1},
    {name:"gold locket", price:8.99, category:"lockets", size:5},
    {name:"silver locket", price:8.99, category:"lockets", size:5},
    {name:"gold chain", price:5.99, category:"chains", size:0},
    {name:"silver chain", price:5.99, category:"chains", size:0},
    {name:"large Red Charm", price:4.99, category:"charms", size:2},
    {name:"large Purple Charm", price:4.99, category:"charms", size:2},
    {name:"large Green Charm", price:4.99, category:"charms", size:2},
];


var app = angular.module("Locket-Builder", []);
app.controller("Main", function ($scope, $http) {
    $scope.categories = categories;
    
    //get chains
    $scope.getItems = function(category){
        var itemsToReturn = [];
        for(var i =0; i < items.length; i++){
            if(items[i].category == category){
                itemsToReturn.push(items[i]);
            }
        }
         createTable(itemsToReturn, category);
    }
    
    function createTable(items, category){
        if($('#'+category+' tr').length > 0){
            $('#'+category).empty();
        }
        else{
            var content = "<table>"
            for(var i=0; i<items.length; i++){
                content += '<tr><td>'+  items[i].name + '</td></tr>';
            }
            content += "</table>"
            $('#'+category).append(content);
        }
        
    } 

});
