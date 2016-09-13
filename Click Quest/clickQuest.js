
window.yourLife = 40;
window.gameOver = false;
window.damage = 1;

var trophies = [];

var monsters = {
	1: orc = {
		title: "Orc",
		time: 1000,
		damage: 2,
		life: 40,
		image: "orc.jpg"
	},
	2: grim = {
		title: "Grim Reaper",
		time: 500,
		damage: 3,
		life: 10,
		image: "reaper2.jpg"
	},
	3: dragon = {
		title: "Dragon",
		time: 2000,
		damage: 4,
		life: 60,
		image:"dragon.jpg"
	},
	4: werewolf = {
		title: "Werewolf",
		time: 2000,
		damage: 1,
		life: 20,
		image: "werewolf.jpg"
	}
};

$('#startButton').click(function() {
//$('#welcomeDiv').hide(1500);
	$('#welcomeDiv').fadeOut(800);
	setTimeout(function()
	{
		activateGame();
	}, 800); //3 seconds
});

var activateGame = function()
{
	$('.gameplay').fadeIn(400);

	//generates a monster and begins the game
	generateMonster();
};


$('#enemy').click(function()
{
	window.enemyLife = window.enemyLife -window.damage;
	if(enemyLife < 0)
	{
		enemyLife = 0;
	}

	window.update();

});

function takingTimeDamage(amount, time)
{
	setTimeout(function()
	{
		window.yourLife = window.yourLife -amount;
		if(window.yourLife < 0)
		{
			window.yourLife = 0;
		}

		window.update();

		if(window.yourLife !== 0 && window.gameOver === false && window.enemyLife !== 0)
		{
			takingTimeDamage(amount,time);
		}
		else
		{
			if(window.yourLife === 0)
			{
				youDied();

			}
			else
			{
				monsterDeath();
			}
		}
	}, time); //1 second is 1000
}

window.update = function()
{
	var life = window.yourLife;
	var enemy = window.enemyLife;
	document.getElementById('char-health').innerHTML = life;
	document.getElementById('enemy-health').innerHTML = enemy;

	if(window.yourLife === 0)
	{
		window.gameOver = true;
	}

}

var generateMonster = function()
{
	//randomly choose monster
	var generate = true;

	while(generate === true)
	{
		var monster = (Math.floor(Math.random() * 4 +1));
		generate = false;

		var size = trophies.length;

		for(var i = 0; i < size; i++)
		{
			if(trophies[i] === monster)
			{
				generate = true;
				break;
			}
		}
	}


	//set monster health
	document.getElementById('enemy-health').innerHTML = monsters[monster].life;
	window.enemyLife = monsters[monster].life;

	//set image
	document.getElementById('enemypic').src = monsters[monster].image;
	$("#enemypic").fadeIn(400);

	//monster index
	var stringMonster = monster + "";
	$("#enemy").addClass(stringMonster);

	//begin the game
	takingTimeDamage(monsters[monster].damage,monsters[monster].time);
}

var monsterDeath = function()
{
	var monsterIndex = $('#enemy').attr('class');
	$("#enemy").removeClass(monsterIndex);
	var monsterIndexInt = parseInt(monsterIndex, 10);
	trophies.push(monsterIndexInt);
	var lootMessage = loot();
	document.getElementById('game-message').innerHTML = monsters[monsterIndexInt].title + " defeated! " + lootMessage;
	$("#game-message").fadeIn();
	$("#game-message").fadeOut(1500);
	$("#enemypic").fadeOut(200);
	if(trophies.length !== 4)
	{
		generateMonster();
	}
	else
	{
		victory();
	}


}

var youDied = function()
{
	var heads = "";
	for(var i =0; i < trophies.length; i++)
	{
		heads = heads + monsters[trophies[i]].title;

		if(i !== (trophies.length)-1)
		{
			heads = heads + ", "
		}
	}

	if(trophies.length === 0)
	{
		heads = "None"
	}

	document.getElementById('game-message').innerHTML = "You died!  Head Count: "+heads;
	$("#game-message").fadeIn();
}


var victory = function()
{
	var heads = "";
	for(var i =0; i < trophies.length; i++)
	{
		heads = heads + monsters[trophies[i]].title;

		if(i !== (trophies.length)-1)
		{
			heads = heads + ", "
		}
	}
	document.getElementById('game-message').innerHTML = "Congratulations! You defeated all the monsters.  Head count: "+heads;
	$("#game-message").fadeIn();
	$("#enemy-health").fadeOut();
}

var loot = function()
{
	var lootProb = (Math.floor(Math.random() * 20 +1));
	var lootString = "";
	if(lootProb < 15)
	{
		window.yourLife = window.yourLife + 5;
		lootString = "Reward: gain 5 life."
	}
	else
	{
		window.damage = window.damage +1;
		lootString = "Reward: gain 1 damage."
	}

	update();
	return lootString;
}
