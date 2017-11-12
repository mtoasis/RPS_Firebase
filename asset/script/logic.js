  


  var config = {
    apiKey: "AIzaSyD6SExX8S4MVIv8ThYVcCZLUdtEHStaYTk",
    authDomain: "rps-firebase-e9c20.firebaseapp.com",
    databaseURL: "https://rps-firebase-e9c20.firebaseio.com",
    projectId: "rps-firebase-e9c20",
    storageBucket: "rps-firebase-e9c20.appspot.com",
    messagingSenderId: "243677795433"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  var index = 0;
  var player_count = 0;



  database.ref().on("value", function(snapshot){
  	index +=1;
  	console.log(index)

  })

 $("#start_button").on("click",function(){
 	player_count +=1;

 	var name = $("#user_name").val().trim();

 	var new_player = {
 		name: name,
 		wins: 0,
 		losses: 0
 	}

 	database.ref().child("Player"+index).set(new_player); 	

 	var name_div = $('<div class="player_name">Player: '+name+'</div><br>');
 	var choice_rock = $('<div class="choice">Rock</div>');
 	var choice_paper = $('<div class="choice">Paper</div>');
 	var choice_scissors = $('<div class="choice">Scissors</div>');

 	$(".player_"+player_count+"_div").append(name_div);
 	$(".player_"+player_count+"_div").append(choice_rock);
 	$(".player_"+player_count+"_div").append(choice_paper);
 	$(".player_"+player_count+"_div").append(choice_scissors);

 })

 $(document).on("click",".choice")
