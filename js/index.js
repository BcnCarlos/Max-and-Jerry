

function buildGameScreen() {
  document.body.innerHTML = ` <canvas id="board"></canvas>`;

  const game = new Game();
  game.paly();
}

function buildSpalshScreen() {
  document.body.innerHTML = `
    <div>  
            <h1>Max, Jerry and the thurnderstorm</h1>
            <img src="./pics/MaxAndJerry.jpeg" alt="MaxAndJerry">
            <h3>Max and Jerry are best friends and they keep each other company when their parents are not home.    </h3>
            <h3>Max is very bossy and barks at everyone that walks by his door; Jerry is very mischeavous and there is no cabinet safe with him.</h3> 
            <h3>They live in the beautiful city of Barcelona which they love to explore</h3>
            <h3>Jerry is awfully afraid of thunder and sometimes runs and hides.</h3> 
        </div>
        <div>
            <h3> Off in the distance, they hear a soft rumble of thunder. Maybe it will pass, they hope. But not this time. </h3>
            <h2> Jerry has gone missing!</h2> 
            <h4> Help Max find his best friend, but Max gets distracted collecting Bones and Balls. 
                Use the Up, Down, Left, Right Arrows to collect as many as you can in 60 seconds.
                Max loves Tennis Balls and gets really excited...
             </h4>
        </div>
        <div class="center">
        <button onclick='buildGameScreen()'>Start</button>
        </div>
    `;
}

window.addEventListener("load", buildSpalshScreen);
