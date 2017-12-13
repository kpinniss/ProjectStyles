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

var cart = {
    items:[],
    locket:{name:"", price:0},
    chain:{name:"", price:0},
    total:function(){
        var result = 0;
        for(var i = 0; i < this.items.length; i++){
            result += this.items[i].price
        }
        var formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            // the default value for minimumFractionDigits depends on the currency
            // and is usually already 2
          });
          result += (this.locket.price + this.chain.price);
          result = formatter.format(result);
            return result;
    }
};

var vLocket = {
    charms:[],
    locket: {},
    chain:{},
    actual: function(){
        var actualSize = 0;
        for(var i =0; i < this.charms.length; i++){
            actualSize += this.charms[i].size;
        }
        return actualSize;
    }, 
    max_capacity:8, //make actual check itself and return its own vals 
    checkCapacity: function(){
        if(this.actual() > this.max_capacity){
            alert("Max capacity met please remove some charms from your locket.");
        }
    }

};


var app = angular.module("Locket-Builder", []);
app.controller("Main", function ($scope, $http) {
    $scope.categories = categories;
    $scope.chains =  getItems("chains");
    $scope.charms = getItems("charms");
    $scope.lockets = getItems("lockets");
    $scope.showTable = false;
    $scope.showCategory = "chains";
    $scope.cart = cart;
    $scope.vLocket = vLocket;

    function getItems(category){
        var itemsToReturn = [];
        for(var i =0; i < items.length; i++){
            if(items[i].category == category){
                itemsToReturn.push(items[i]);
            }
        }
         return itemsToReturn;
    }
    
    $scope.show = function(show,category){
        if(show == true){
            $scope.showTable = false;
            $scope.showCategory = "";
        }
        else{
            $scope.showTable = true;
            $scope.showCategory = category
        }
    }

    function remove(array, element) {
        const index = array.indexOf(element);
        array.splice(index, 1);
    }

    $scope.addToCart = function(item){
        var addItem = {
            name: item.name,
            price: item.price,
            category:item.category
        };
        var locketItem = {
            size:item.size
        };
           
        if(addItem.category =="chains"){
            $scope.cart.chain.price = addItem.price;
            $scope.cart.chain.name = addItem.name;
        }
        else if(addItem.category =="lockets"){
            $scope.cart.locket.price = addItem.price;
            $scope.cart.locket.name = addItem.name;
        }
        else{
            $scope.vLocket.charms.push(locketItem);
            $scope.cart.items.push(addItem);
            $scope.vLocket.actual();
            $scope.vLocket.checkCapacity();
        }
        
        /////
        
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
