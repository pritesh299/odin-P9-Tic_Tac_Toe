const gameBoxs=document.querySelectorAll(".game_box")
let gameBoard=["","","","","","","","",""]
const winCombos = [
    [0,1,2],
    [0,3,6],
    [3,4,5],
    [6,7,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [0,4,8]
];

let currentPlayer='x';
let win=false

gameBoxs.forEach(box=>{

  box.addEventListener('click',()=>{

      if(box.innerText==="" && !win){

       box.innerText=currentPlayer;
       let index=Number(box.getAttribute('id'))
       gameBoard[index-1]=currentPlayer;
       

       if(currentPlayer==='x'){
       currentPlayer="o";
       }else{
         currentPlayer='x';
       }
     checkWin()

      }
  })
})

function checkWin(){

  for( let combo of winCombos){
      let [a,b,c]=combo;
        if(!(gameBoard[a]==="")&&!(gameBoard[b]==="")&&!(gameBoard[c]==="")){
        if(gameBoard[a]===gameBoard[b]&&gameBoard[b]===gameBoard[c]&&gameBoard[a]===gameBoard[c]){
        win=true;
        console.log('con')
    }
   }
  }
}