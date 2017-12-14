//animation canvas
var myGamePiece;

function dropCharm() {
    myGamePiece = new component(10, 10, "red", 80, 75);
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);        
    },
    stop : function() {
        clearInterval(this.interval);
    },    
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;    
    this.speedX = 0;
    this.speedY = 0;    
    this.gravity = 0.1;
    this.gravitySpeed = 0;
    this.bounce = 0.2;
    this.update = function() {
        ctx = myGameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
        this.hitBottom();
    }
    this.hitBottom = function() {
        var rockbottom = myGameArea.canvas.height - 150;
        if (this.y > rockbottom) {
            this.y = rockbottom;
            this.gravitySpeed = -(this.gravitySpeed * this.bounce);
        }
    }
}

function updateGameArea() {
    myGameArea.clear();
    myGamePiece.newPos();
    myGamePiece.update();
}

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
        }
        else{
            if(!$scope.vLocket.checkCapacity()){
                $scope.vLocket.charms.push(locketItem);
                $scope.cart.items.push(addItem);
                $scope.vLocket.actual();
                drop()
            }
            else{
                alert("Locket is full.");
            }
        }
        
        /////
        
    }

    //animations / canvas
    $scope.dropCharm = function(){
        myGamePiece = new component(10, 10, "red", 80, 75);
        myGameArea.start();
    }

    $scope.myGameArea = {
        canvas : document.createElement("canvas"),
        start : function() {
            this.canvas.width = 200;
            this.canvas.height = 400;
            this.context = this.canvas.getContext("2d");
            document.body.insertBefore(this.canvas, document.body.childNodes[0]);
            this.interval = setInterval(updateGameArea, 20);        
        },
        stop : function() {
            clearInterval(this.interval);
        },    
        clear : function() {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    function component(width, height, color, x, y, type) {
        this.type = type;
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;    
        this.speedX = 0;
        this.speedY = 0;    
        this.gravity = 0.1;
        this.gravitySpeed = 0;
        this.bounce = 0.2;
        this.update = function() {
            ctx = myGameArea.context;
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
        this.newPos = function() {
            this.gravitySpeed += this.gravity;
            this.x += this.speedX;
            this.y += this.speedY + this.gravitySpeed;
            this.hitBottom();
        }
        this.hitBottom = function() {
            var rockbottom = myGameArea.canvas.height - 150;
            if (this.y > rockbottom) {
                this.y = rockbottom;
                this.gravitySpeed = -(this.gravitySpeed * this.bounce);
            }
        }
    }

    function drop(){
        var comp = new component(10, 10, "blue", 100, 125)
    }

    function updateGameArea() {
        myGameArea.clear();
        myGamePiece.newPos();
        myGamePiece.update();
    }

    // function createTable(items, category){
    //     if($('#'+category+' tr').length > 0){
    //         $('#'+category).empty();
    //     }
    //     else{
    //         var content = "<table>"
    //         for(var i=0; i<items.length; i++){
    //             content += '<tr><td>'+  items[i].name + '</td></tr>';
    //         }
    //         content += "</table>"
    //         $('#'+category).append(content);
    //     }
        
    // } 

});

