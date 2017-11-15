 
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
  var index=0;
  var flag=true;
  var result_on = false;


//   var connectionsRef = database.ref("/connections");
//   var connectedRef = database.ref(".info/connected");

//   connectedRef.on("value", function(snap) {

//   if (snap.val()) {

//     var con = connectionsRef.push(true);
//     con.onDisconnect().remove();
//   }
// });


database.ref().once("value",function(snapshot){

  if (!snapshot.hasChild("Player1") && !snapshot.hasChild("Player2")){
    database.ref().child("Messages").set("Welcome to RPS Game!");

  }
});


 $("#start_button").on("click",function(){ 

    ref.once('value',function(snapshot) {


     index = (Object.keys(snapshot.val()).length);

    });    

  if (index>0 && index<3 && flag){
  name = $("#user_name").val().trim();
  database.ref().child("Messages").push("<b>"+name+"</b> entered the game");

 	var new_player = {
 		name: name,
 		wins: 0,
 		losses: 0,
    choice: "undecided"
 		 	}

 	ref.child("Player"+index).update(new_player);
  player_number = index;

  display();
  console.log("player number: "+player_number)
  flag = false;
  } 
  }) 	



 $(document).on("click",".choice", function(){

 	var choice = {
 		choice: $(this).text()};

 	ref.child("Player"+index).update(choice);

 })

function display(){

  var choice_rock = $('<div class="choice">Rock</div>');
  var choice_paper = $('<div class="choice">Paper</div>');
  var choice_scissors = $('<div class="choice">Scissors</div>');

  $(".player_"+player_number+"_div").append(choice_rock);
  $(".player_"+player_number+"_div").append(choice_paper);
  $(".player_"+player_number+"_div").append(choice_scissors);
}

  ref.on('value',function(snapshot){

    if (snapshot.hasChild("Player1") || snapshot.hasChild("Player2")){
   
  var index = Object.keys(snapshot.val()).length;

    if (snapshot.hasChild("Player1")){    
    var name_1 = snapshot.val().Player1.name;    
    $(".player_1_div").children(".player_name").text(name_1);
    }

    if (snapshot.hasChild("Player2")){
    var name_2 = snapshot.val().Player2.name;
    $(".player_2_div").children(".player_name").text(name_2);
  }
}
    
  })


  ref.on('value',function(snapshot){ //operation
    $(".winner_div").text("Waiting for Players");

    var winner = "";

    if (snapshot.hasChild("Player1") && snapshot.hasChild("Player2")){
    var name_1 = snapshot.val().Player1.name;
    var name_2 = snapshot.val().Player2.name;
    var player_1_choice = snapshot.val().Player1.choice;
    var player_2_choice = snapshot.val().Player2.choice;

  
  if (player_1_choice=="undecided" || player_2_choice=="undecided"){

    winner = "Waiting..."
  }

  else if (player_1_choice=="Rock" && player_2_choice=="Rock"){

    winner = "Tie";
    initialize();

  }
  else if (player_1_choice=="Scissors" && player_2_choice=="Scissors"){

     winner = "Tie";
     initialize();
  }
  else if (player_1_choice=="Paper" && player_2_choice=="Paper"){

     winner = "Tie";
     initialize();
  }
  else if (player_1_choice=="Rock" && player_2_choice =="Scissors"){

    winner = name_1;
    initialize();

  }
  else if (player_1_choice=="Rock" && player_2_choice =="Paper"){

    winner = name_2;
    initialize();
  }
  else if (player_1_choice=="Scissors" && player_2_choice =="Paper"){

    winner = name_1;
    initialize();
  }
  else if (player_1_choice=="Scissors" && player_2_choice =="Rock"){

    winner = name_2;
    initialize();
  }
  else if (player_1_choice=="Paper" && player_2_choice =="Rock"){

    winner = name_1;
    initialize();
  }
  else if (player_1_choice=="Paper" && player_2_choice =="Scissors"){

    winner = name_2;
    initialize();
  }

     $(".winner_div").text("Winner is: "+winner);
 
}
})




function initialize(){
    var choice = {
    choice: "undecided"
  };

  ref.child("Player1").update(choice);
  ref.child("Player2").update(choice);
  
};



$("#message_input_button").on("click",function(){

  var message = $("#message_input").val();
  ref.child("Messages").push("<b>"+name+"</b>"+" : "+message);
  $("#message_input").val() = "";
})


database.ref().child("Messages").on("child_added",function(snapshot){

  var new_message = snapshot.val();

  $(".message_display_div").append(new_message+"<br>")
  $(".message_display_div").scrollTop($(".message_display_div")[0].scrollHeight);
})


database.ref().child("Connection").onDisconnect().remove();


