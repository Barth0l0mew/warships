let getElement = id => document.querySelector(id)
let getElementAll = id => document.querySelectorAll(id)
const humans = getElement('.human');
const comps = getElement('.comp');
humans.addEventListener('mouseover',(event)=>{
    event.target.classList.add('op')
})

humans.addEventListener('mouseout',(event)=>{
    event.target.classList.remove('op');
})
comps.addEventListener('mouseover',(event)=>{
    event.target.classList.add('op')
})

comps.addEventListener('mouseout',(event)=>{
    event.target.classList.remove('op');
})
comps.addEventListener('click',(event)=>{
    console.log(event.target.innerHTML)
   
    let fire= event.target.innerHTML;

    if (comp.matrixShip[fire[0]][fire[1]]==1){
        event.target.classList.add('fire');
        console.log (comp.fire++)
        

    }else {
        event.target.classList.add('holt')
    }

})
document.addEventListener('mousemove',(event)=>{
    event.preventDefault();
})
class Field {
    static SIZE=10;
    
    constructor (field){
        this.human = field;
        this.matrixShip=[];
        this.ship={
            coordinatShip: []
        }
        this.war=[],
        this.fire=0
    }
    createArea(){
        for (let i=0;i<Field.SIZE;i++){
            let cellMatrix=document.createElement('div');
            cellMatrix.setAttribute('class','form cell-container');
            
            this.human.appendChild(cellMatrix)
            //getElement('.loc-matrix').appendChild(cellMatrix);
                 for (let j=0;j<Field.SIZE;j++){
                     let cell=document.createElement('div');
                     cell.setAttribute('class','cell-matrix');
                     cell.setAttribute('value',`${i}${j}`)
                     cell.innerHTML=`${i}${j}`;
                    cellMatrix.appendChild(cell);
                }   
        }
    }
    random(){
        this.matrix();
        
        for (let i=1; i<5;i++){
            for (let j=5-i; j>0;j--){
                this.getCordDesk(i);
            }
                
       
        // console.log (`DECK=${i} SHIP=`,this.ship.coordinatShip[i])
       
        }
        
        this.getMatrix();
       
    }
    matrix (){
       
        this.matrixShip=[...Array(Field.SIZE)].map(()=> Array(Field.SIZE).fill(0))
        console.log('create matrix 0',this.matrixShip)
        
    }
    getMatrix(){
        console.log (this.human.children)
       console.log('get matix ',this.matrixShip);
        console.log (this.ship.coordinatShip)
        
        for (let i=0; i<Field.SIZE; i++)
        {   
            for (let j=0; j<Field.SIZE; j++){
                
                if (this.matrixShip[i][j]==1){
                    //console.log (this)
                    this.human.children[i].children[j].classList.add('red')
                    //getElementAll('.cell-container')[i].children[j].classList.add('red')
                }
            }
        }
    }
    getRandom (num){
        return Math.round(Math.random()*num)
    }

    locationShip (obj){
        let {x,y,kX,kY,deck} = obj;
        let k=0;
        let arrShip=[];
        while  (k< deck){
            let ix = x+k*kX;
            let jy = y+k*kY;
            k++;
            //this.matrixShip[ix][jy]=1;
        
            arrShip.push([ix,jy]);

        }
        obj.arr=arrShip;
      
        // console.log (`DECK=${deck} LOCATIONSHIP `,arrShip);
      
        return this.createShip(obj)
    }
    check (obj){
        let {x,y,kX,kY,deck,arr,arayShip} = obj;
        let k=0;
        let i=0;
        let jj=0;
       //console.log('check=',arr)
       // console.log('ship=',this.ship.coordinatShip)
        for (let key of this.ship.coordinatShip){
           // console.log(`key=${key}`,` key `,key)
            for (let keyShip of key.arayShip){
                for (let item of arr){
                    if (keyShip[0]==item[0] && keyShip[1]==item[1]) {
                        //console.log ('no creat ship')
                        return true;
                    } 
                }
            }
                
           
        }
        // console.log ('create ship')
        return false;
    }
    // функция для создания первоначальных координат ХУ и 
    //направления корабля кХ=0 и кУ=1 горизонтальное направление
    // кХ=1 кУ=0 вертикальное направление 
    getCordDesk (deck){
    let kX = this.getRandom(1);
    let kY = (kX == 0)? 1: 0;
    let x,y;
    if (kX == 0){
        x = this.getRandom(9);
        y = this.getRandom(9-deck);
    }
    else {
        x = this.getRandom(9-deck);
        y = this.getRandom(9);
    }
    let obj = {x, y, kX, kY, deck};
    // console.log(`Deck=${deck} GETCORDDESK create coordinate desk=`,obj)
   // return this.locationShip(obj);
   let objShip=this.locationShip(obj);
    if (this.check(objShip))
        {
            this.getCordDesk(deck)
        }else {
            // console.log ('OBJICSHIP=',objShip);
            for (let key of objShip.arr){
                // console.log (key[0],key[1])
                
                this.matrixShip[key[0]][key[1]]=1
            }
            
            this.ship.coordinatShip.push(objShip)

        }
    }
    //создания области корабля (это одна ячейка вокруг коробля+сам корабль) 
    createShip(obj){
    
        let {x,y,kX,kY,deck,arr} = obj;
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
        // console.log(`toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
        if (kX==0){
            // console.log(`gor toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
            for (let i=toX; i<toX+1+zX;i++ ){
                for (let j=toY; j<toY+deck+zY; j++){
                    // console.log(`toX=${i} toY=${j}`);
                    arayShip.push([i,j]);
                }
            }
        } else {
            // console.log(`vert toX=${toX} toY=${toY} zX=${zX} zY=${zY} deck=${deck} kX=${kX} kY=${kY} `)  
            for (let i=toX; i<toX+deck+zX;i++ ){
                for (let j=toY; j<toY+1+zY; j++){
                    // console.log(`toX=${i} toY=${j}`);
                    arayShip.push([i,j]);
                }
            }
        }
      
        // console.log(`DECK=${deck} CREATESHIP AreaShip`,arayShip);
        obj.arayShip=arayShip;
        return obj;
    
    }

}
const human = new Field (humans)
human.createArea()
//human.matrix()
human.random();

const comp = new Field (comps)
comp.createArea()
//human.matrix()

comp.random();
function play (){
    while (true){
        if (comp.fire==46 || human.fire==46){
            breack;
        } 

    }
}
