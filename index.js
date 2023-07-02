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
let win=false;
let reset=false;
let turn=0;
const gamePage=document.getElementById('game_page')
const startPage=document.getElementById('start_page')
const startBtn=document.getElementById('start_button')
const gameText=document.getElementById('game_headline')
const resetBtn=document.getElementById('reset_button')




startBtn.addEventListener('click',()=>{
    gamePage.style.display='block'
    startPage.style.display='none'
 })

 resetBtn.addEventListener('click',()=>{
    gameBoard=["","","","","","","","",""];
    gameText.innerText='Player 1(X)';
    currentPlayer='x';
    win=false;
    turn=0;
     gameBoxs.forEach(box=>{ 
         box.innerText="";
         box.style.backgroundColor='#E3F4F4'
     })
 })


gameBoxs.forEach(box=>{
  box.addEventListener('click',()=>{
      if(box.innerText==="" && !win){
      turn++;
      console.log(turn)
       box.innerText=currentPlayer;
       let index=Number(box.getAttribute('id'))
       gameBoard[index-1]=currentPlayer;
       checkWin()
      if(currentPlayer==='x' && !win){
        gameText.innerText='Player 2(O)';
        currentPlayer="o";
        
        }else if(!win){
          currentPlayer='x';
          gameText.innerText='Player 1(X)';

        } 
        
        if(win){
            gameText.innerText+=" Wins";
          }    
        if(turn===9&&!win){
            gameText.innerText='Its a Tie';

        }   
      } 
    
  })
})

function checkWin(){

  for( let combo of winCombos){
      let [a,b,c]=combo;
        if(!(gameBoard[a]==="")&&!(gameBoard[b]==="")&&!(gameBoard[c]==="")){
          if(gameBoard[a]===gameBoard[b]&&gameBoard[b]===gameBoard[c]&&gameBoard[a]===gameBoard[c]){
            win=true;
            const box1=document.getElementById(`${a+1}`)
            const box2=document.getElementById(`${b+1}`)
            const box3=document.getElementById(`${c+1}`)
              box1.style.backgroundColor='green'
              box2.style.backgroundColor='green'
              box3.style.backgroundColor='green'

           }
        }
  }
}

