let loc=document.querySelector('.location');
let locMatrix=document.querySelector('.loc-matrix');
let columns= 10;
//создание поля
let getElement = id => document.querySelector(id);
let getElementAll = id => document.querySelectorAll(id);
class Field {
    static SHIP_DATA ={
        one: [1, 4],
        two: [2, 3],
        three: [3, 2],
        four: [4, 1]
    }
    constructor(field){
        this.field =field;
        this.matrix = []; // данные поля боя
        this.squadron = []; // данные корабля

    }
}
let human = new Field(getElement('.human'));

function creatField(columns){
   
    for (let i=0; i<columns; i++){
         let cell=document.createElement('div');
        cell.setAttribute('class','cell')
        cell.innerHTML=i
       loc.appendChild(cell); 
    }
}
//отмена выделения 
document.addEventListener('mousemove', move);
    function move(event){
        event.preventDefault();
    }
loc.addEventListener('mouseover',setCell);
locMatrix.addEventListener('mouseover',setCell);
//опрос поля с ячейками
function setCell(event){
// console.log(event.target); 
event.target.classList.add('op');
// event.preventDefault();
    
}
loc.addEventListener('mouseout',getCell);
locMatrix.addEventListener('mouseout',getCell);
//опрос поля с ячейками
function getCell(event){
// console.log(event.target); 
event.target.classList.remove('op');
// event.preventDefault();
    
}
loc.addEventListener('mousemove',downCell);
locMatrix.addEventListener('mousemove',downCell);
//опрос поля с ячейками
function downCell(event){
// console.log(event.target); 

// event.preventDefault();
    
}
function matrix(columns){
    for (let i=0; i<columns; i++){
        let cellContainer = document.createElement('div');
        cellContainer.setAttribute('class', 'form cell-container')
        locMatrix.appendChild(cellContainer)
        // console.log(locMatrix);
        // console.log(cellContainer);
        //   let cellMatrix = document.querySelector('.cell-container');
    
       for (let j=0; j<columns; j++){
            let cell=document.createElement('div');
            //console.log(cellMatrix);
            //  console.log(cell);
            cell.setAttribute('class', 'cell-matrix');
            cell.innerHTML=`${i}${j}`;
             cellContainer.appendChild(cell);
            
        }

    }
} 

creatField(100);
matrix(10);
//колличество и длина коробля 
let matrixShip =[];
for (let i=0; i<10; i++){
    matrixShip[i]=[]
    
    for (let j=0; j<10; j++){
        matrixShip[i][j]=0;
    }
    //matrixShip[i]= matrixShipJ;
//    console.log(matrixShip[i]);
}

function getMatrix (){
    for (let i=0; i<10; i++){
       
        console.log(matrixShip[i]) 
        for (let j=0; j<10; j++){
            if (matrixShip[i][j]==1) {
                
                getElementAll('.cell-container')[i].children[j].classList.add('class','red');
                
            }
        }
    }

}

console.log (`массив создан`)
getMatrix();
console.log (`массив создан`)
let shipData = {
    fourDesck: [1,4],
    threeDesck: [2,3],
    twoDesck: [3,2],
    oneDesck: [1,4]
}
// функция для создания рандомного числа
let getRandom = (num)=>Math.round(Math.random()*num);
// функция для создания первоначальных координат ХУ и 
//направления корабля кХ=0 и кУ=1 горизонтальное направление
// кХ=1 кУ=0 вертикальное направление 
function getCordDesk (deck){
    let kX = getRandom(1);
    let kY = (kX == 0)? 1: 0;
    let x,y;
    if (kX == 0){
        x = getRandom(9);
        y = getRandom(9-deck);
    }
    else {
        x = getRandom(9-deck);
        y = getRandom(9);
    }
    let obj = {x, y, kX, kY};
    return obj;
}
let ship={
    coordinatShip: []
}
//создания области корабля (это одна ячейка вокруг коробля+сам корабль) 
function createShip(arr, obj, deck){
    let {x,y,kX,kY} = obj;
    let arayShip=[];
    let toX, toY, zX, zY;
    
    if (x==0 || x==9){
        toX=(x==0)?0:x-1;
        zX=1;
    } else{
        zX=2;
        toX=x-1;
    } 
    if (y==0 || y==9){
        toY=(y==0)?0:y-1;
        zY=1;
    } else{
        zY=2;
        toY=y-1;
    }
  console.log(`toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
    if (kX==0){
          console.log(`gor toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
        for (let i=toX; i<toX+1+zX;i++ ){
            for (let j=toY; j<toY+deck+zY; j++){
                console.log(`toX=${i} toY=${j}`);
                arayShip.push([i,j]);
            }
        }
    } else {
          console.log(`vert toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
        for (let i=toX; i<toX+deck+zX;i++ ){
            for (let j=toY; j<toY+1+zY; j++){
                console.log(`toX=${i} toY=${j}`);
                arayShip.push([i,j]);
            }
        }
    }
    console.log(`arayShip=${arayShip}`)
    console.log(arayShip);
    return arayShip;
    
}
function check (arr){
     for (let key of ship.coordinatShip){
         console.log(` key `,key)
        for (let keyShip of arr)
            {
                if (key[0]==keyShip[0] && key[1]==keyShip[1])
                { 
                    // console.log(true)
                }                
            }
            
            // if (!key.includes(keyShip)){
            //     locationShip (obj, deck);
            // }
            // console.log(false)
    }

    
}
// функция координат коробля 
function locationShip (obj,deck){
    let {x,y,kX,kY} = obj;
    let k=0;
    let arrShip=[];
    while  (k< deck){
        let ix = x+k*kX;
        let jy = y+k*kY;
        k++;
        matrixShip[ix][jy]=1;
        
        arrShip.push([ix,jy]);

    }
   // console.log(`${obj}   ${deck}`)
    // console.log (check(arrShip));
    ship.coordinatShip.push(createShip(arrShip, obj, deck));
   // createShip(arrShip, obj, deck);
    console.log (arrShip);
 
    console.log(`XY Coordinaty=${x}, ${y}, ${kX}, ${kY}  `)
    
}

for (let  i=1; i<5; i++){
//    console.log(getRandom(i))
//let {x,y,kX,kY} = getCordDesk(i);
locationShip(getCordDesk(i),i);
//console.log(`XY Coordinaty=${x}, ${y}, ${kX}, ${kY}  type=${typeof(getCordDesk(i))}`)
}
console.log (`массив создан`);
getMatrix();
// console.log (`массив создан`)
// console.log(ship.coordinatShip)

