var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imageObj = new Image(200,200);




var categories =[
    "lockets","charms","chains"
];

var items =[
    {name:"red charm", price:3.99, category:"charms", size:1, img:"https://cdn.origamiowl.com/images/products/CH3073/0/CH3073-January_Round_Birthstone__Charm-V3.jpg"},
    {name:"blue charm", price:3.99, category:"chamrs", size:1, img:"https://cdn.origamiowl.com/images/products/CH3075/0/CH3075-March_Round_Birthstone__Charm-V3.jpg"},
    {name:"green charm", price:3.99, category:"charms", size:1, img:"https://cdn.origamiowl.com/images/products/CH3077/0/CH3077-May_Round_Birthstone__Charm-V3.jpg"},
    {name:"purple charm", price:3.99, category:"charms", size:1, img:"https://cdn.origamiowl.com/images/products/CH3074/0/CH3074-February_Round_Birthstone__Charm-V3.jpg"},
    {name:"gold locket", price:8.99, category:"lockets", size:5, img:"https://cdn.origamiowl.com/images/products/LK1030/0/LK1030-Large_Gold_Legacy_Living_Locket_with_Swarovski_Crystals copy.jpg"},
    {name:"silver locket", price:8.99, category:"lockets", size:5, img:"https://cdn.origamiowl.com/images/products/LK1012/0/LK1012-Large_Silver_Hinged_Living_Locket-V2.jpg"},
    {name:"gold chain", price:5.99, category:"chains", size:0, img:"https://cdn.origamiowl.com/images/products/CN6057/0/CN6057_Gold-Rectangle-Link-Chain-V2.jpg"},
    {name:"silver chain", price:5.99, category:"chains", size:0, img:"https://cdn.origamiowl.com/images/products/CN5017/0/CN5017-16__Faceted_Ball_Chain-1.jpg"},
    {name:"large Red Charm", price:4.99, category:"charms", size:2, img:"https://cdn.origamiowl.com/images/products/CH3079/0/CH3079-July_Round_Birthstone__Charm-V3.jpg"},
    {name:"large Purple Charm", price:4.99, category:"charms", size:2, img:"https://cdn.origamiowl.com/images/products/CH3081/0/CH3081-September_Round_Birthstone__Charm-V3.jpg"},
    {name:"large Green Charm", price:4.99, category:"charms", size:2, img:"https://cdn.origamiowl.com/images/products/CH3080/0/CH3080-August_Round_Birthstone_Charm-V3.jpg"},
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
            // check 
            return this.actual() > this.max_capacity;
        }

};



 
   ////               /// ////////////////
  ////              //// ////  
 ////Angular Module///  ////      //////   
/////         ///////  ////////////////
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
    $scope.locketDisplay = "https://cdn.origamiowl.com/images/products/LK1012/0/LK1012-Large_Silver_Hinged_Living_Locket-V2.jpg";
    
////////////////////////////////
////get item data
    function getItems(category){
        var itemsToReturn = [];
        for(var i =0; i < items.length; i++){
            if(items[i].category == category){
                itemsToReturn.push(items[i]);
            }
        }
         return itemsToReturn;
    }
/////////////////////////////////    
//hide show for dynamic selectors
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
////remove object from arry (charm, locket etc...)
    function remove(array, element) {
        const index = array.indexOf(element);
        array.splice(index, 1);
    }

///////////////////////////////    
//add to cart alot happens here
    $scope.addToCart = function(item){
        var addItem = {
            name: item.name,
            price: item.price,
            category:item.category,
            img:item.img
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
            $scope.locketDisplay = addItem.img;
            imageObj.onload = function() {
                context.drawImage(imageObj, 0, 0, 400, 400);
              };
              imageObj.src = addItem.img;
        }
        else{
            if(!$scope.vLocket.checkCapacity()){
                $scope.vLocket.charms.push(locketItem);
                $scope.cart.items.push(addItem);
                $scope.vLocket.actual();
                drop();
            }
            else{
                alert("Locket is full.");
            }
        }
    }

    ///Canvas animations///
});

