 
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
  var player_number;
  var flag=true;
  var name ="";
  var winner;


  var connectionsRef = database.ref("Players");
  var connectedRef = database.ref(".info/connected");

  connectedRef.once("value", function(snap) {  

    ref.child("Players").on("value",function(snap){ 
    
    if (snap.numChildren()==0){
      ref.child("Messages").remove();
    }
  })

     $("#start_button").on("click",function(){

        if (flag){
          flag =false;

        name = $("#user_name").val().trim();        

        var new_player = {
          name: name,
          wins: 0,
          losses: 0,
          choice: "undecided"
            }

        ref.child("Players").once("value",function(snap){


          if (snap.numChildren()<=2){

            if (snap.numChildren()==0 || snap.hasChild("Player2")){
            ref.child("Players").child("Player1").set(new_player);
            player_number = 1;


            }
            
            else if (snap.hasChild("Player1")){
            ref.child("Players").child("Player2").set(new_player);
            player_number = 2;

            }
              database.ref().child("Messages").push("<b>"+name+"</b> entered the game");
              display()
              console.log("mynumberis :"+player_number)

            }

          if (player_number ==1){
                  ref.child("Players").child("Player1").onDisconnect().remove();                  
                }
          else if (player_number ==2){
                  ref.child("Players").child("Player2").onDisconnect().remove();
          }

             $(document).on("click",".choice", function(){

                var choice = {
                choice: $(this).text()};
                var choice_text = $(this).text();

                ref.child("Players").child("Player"+player_number).update(choice);
                var choice_div = $(".player_"+player_number+"_ready_div");
                choice_div.text("Your choice: "+choice_text)

              })

             if (player_number==1){
             ref.child("Players").child("Player2").on("value", function(snap){
              var isReady = snap.val().choice;
              if (isReady!="undecided"){
                $(".player_2_ready_div").text("READY");
              }
            })
            }
           else if (player_number==2){
            ref.child("Players").child("Player1").on("value", function(snap){
              var isReady = snap.val().choice;
                if (isReady!="undecided"){
                $(".player_1_ready_div").text("READY");
              }
           })
          }




      })
      }        
  })

});

function display(){

  var choice_rock = $('<div class="choice">Rock</div>');
  var choice_paper = $('<div class="choice">Paper</div>');
  var choice_scissors = $('<div class="choice">Scissors</div>');

  $(".player_"+player_number+"_div").append(choice_rock);
  $(".player_"+player_number+"_div").append(choice_paper);
  $(".player_"+player_number+"_div").append(choice_scissors);
}


  ref.child("Players").on('value',function(snapshot){

    if (snapshot.hasChild("Player1") || snapshot.hasChild("Player2")){
   
    var index = snapshot.numChildren();

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


  ref.child("Players").on("value", function(snapshot){
    var i=1;
    snapshot.forEach(function(childsnap){
      var win_stat = childsnap.val().wins;
      var lose_stat = childsnap.val().losses;
      var stat_div = ".stat_"+i+"_div"

      $(stat_div).text("wins: "+win_stat+"   "+"losses: "+lose_stat);
      i+=1;
    })
  })





$("#message_input_button").on("click",function(){

  var message = $("#message_input").val();
  ref.child("Messages").push("<b>"+name+"</b>"+" : "+message);
  $("#message_input").val("");
})


database.ref().child("Messages").on("child_added",function(snapshot){

  var new_message = snapshot.val();

  $(".message_display_div").append(new_message+"<br>")
  $(".message_display_div").scrollTop($(".message_display_div")[0].scrollHeight);
})



  ref.child("Players").on('value',function(snapshot){ //operation
    $(".winner_div").text("Waiting for Players");

    var winner = "";

    if (snapshot.hasChild("Player1") && snapshot.hasChild("Player2")){
    var name_1 = snapshot.val().Player1.name;
    var name_2 = snapshot.val().Player2.name;
    var player_1_choice = snapshot.val().Player1.choice;
    var player_2_choice = snapshot.val().Player2.choice;

  
  if (player_1_choice=="undecided" || player_2_choice=="undecided"){
  }

  else if (player_1_choice=="Rock" && player_2_choice=="Rock"){

    winner = "Tie";
    

  }
  else if (player_1_choice=="Scissors" && player_2_choice=="Scissors"){

     winner = "Tie";
     
  }
  else if (player_1_choice=="Paper" && player_2_choice=="Paper"){

     winner = "Tie";
     
  }
  else if (player_1_choice=="Rock" && player_2_choice =="Scissors"){

    winner = name_1;
    

  }
  else if (player_1_choice=="Rock" && player_2_choice =="Paper"){

    winner = name_2;
    
  }
  else if (player_1_choice=="Scissors" && player_2_choice =="Paper"){

    winner = name_1;
    
  }
  else if (player_1_choice=="Scissors" && player_2_choice =="Rock"){

    winner = name_2;
    
  }
  else if (player_1_choice=="Paper" && player_2_choice =="Rock"){

    winner = name_1;
    
  }
  else if (player_1_choice=="Paper" && player_2_choice =="Scissors"){

    winner = name_2;
    
  }    

  var win_p;
  var lose_p;

  if (winner == name_1){
    win_p = "Player1";
    lose_p = "Player2";
    initialize();
    remove_ready();

  }
  else if (winner ==name_2){
     win_p = "Player2";
    lose_p = "Player1";
    initialize();
    remove_ready(); 
    }
  else if (winner =="Tie"){
    initialize();
    remove_ready(); 
  }

  if(winner !=""){
    ref.child("Players").child(win_p).once("value",function(snap){
      var wins = {wins: snap.val().wins+1};
      ref.child("Players").child(win_p).update(wins)
    })

    ref.child("Players").child(lose_p).once("value",function(snap){
      var losses = {losses: snap.val().losses+1}
      ref.child("Players").child(lose_p).update(losses)
    })

    $(".winner_div").text("Winner is: "+winner);


  }

  else{
    $(".winner_div").text("Waiting...");
  }

}
})


function initialize(){
    var choice = {
    choice: "undecided"
  };

  ref.child("Players").child("Player1").update(choice);
  ref.child("Players").child("Player2").update(choice);  
};

function remove_ready(){
    $(".player_1_ready_div").remove()
    $(".player_2_ready_div").remove()
    $(".game_display_div").append('<div class="player_1_ready_div">')
    $(".game_display_div").append('<div class="player_2_ready_div">')
}




