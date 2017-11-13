 
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
  var ref = database.ref();
  var name="";  
  var player_number=0;
  // var index=0;


 $("#start_button").on("click",function(){
 		

 	ref.once('value',function(snapshot) {

 		var index = Object.keys(snapshot.val()).length;
 		console.log(index)

    if (index<3){			

  name = $("#user_name").val().trim();

 	var new_player = {
 		name: name,
 		wins: 0,
 		losses: 0
 		 	}

 	ref.child("Player"+index).update(new_player);
  player_number = index;
  display();
  } 
  }) 	

 })

 $(document).on("click",".choice", function(){

 	var choice = {
 		choice: $(this).text()};

 	ref.child("Player"+player_number).update(choice);

 })

function display(){

  var name_div = $('<div class="player_name">Player: '+name+'</div><br>');
  var choice_rock = $('<div class="choice">Rock</div>');
  var choice_paper = $('<div class="choice">Paper</div>');
  var choice_scissors = $('<div class="choice">Scissors</div>');

  $(".player_"+player_number+"_div").append(name_div);
  $(".player_"+player_number+"_div").append(choice_rock);
  $(".player_"+player_number+"_div").append(choice_paper);
  $(".player_"+player_number+"_div").append(choice_scissors);
}

  ref.on('value',function(snapshot){
    var name_1 = snapshot.val().Player1.name;
    var name_2 = snapshot.val().Player2.name;
    (".player_1_div").child(player_name).text();
    (".player_2_div").child(player_name).text();
  })