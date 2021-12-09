
/* javascript */

function capitalize (str) {

    //split the above string into an array of strings
    //whenever a blank space is encountered

    const arr = str.split(" ");

    //loop through each element of the array and capitalize the first letter.


    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }
    //Join all the elements of the array back into a string
    //using a blankspace as a separator
    const str2 = arr.join(" ");
    return str2;

}

var words = ["Kill", "Killed","Kills", "Died", "Dies", "Dying", "Die", "Terrorism", "Panick", "Panicked", "Worry", "Worries", "Worried", "Concern", "Concerns", "Concerned", "Apprehension", "Uneasy", "Unease", "Fear", "Afraid", "Scare", "Risk", "Risks", "Risky","Alarm", "Alarming", "Alarmed"];

const addHeadline = (ev) => {
  ev.preventDefault();
  var str = document.getElementById("fname").value;
  var str1 = capitalize(str);
  console.log(str1);
  var score = 0;
  var length = 0;
  var alert = 0;
  var data = {"text": str1};
  var sentiment = 0;

  fetch("https://sentim-api.herokuapp.com/api/v1/", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((data1) => {


      if (data1.result.polarity < -0.5) {
        sentiment = 50;
      } else if (data1.result.polarity > 0.5) {
        sentiment = 30;
      } else if (data1.result.polarity < 0) {
        sentiment = 40;
      } else if (data1.result.polarity > 0) {
        sentiment = 25;
      }


      if (str.split(" ").length < 5 || str.split(" ").length > 10 ) {
        length = 0;
      } else {
        length = 25;
      }

      for (let i = 0; i < words.length; i++) {
        if (str1.includes(words[i])) {
          alert = 25;
        }
      }

      score = sentiment + length + alert;




      document.querySelector('#score').innerHTML = ("Engagement Score <br>"+ score);
      document.querySelector('#start').innerHTML = ("Score Analysis");
      document.querySelector("#btn1").innerHTML =  ("Analyze Another Headline");
      document.querySelector("#btn1").setAttribute("onClick", "location.href='index.html';");

      $(".openner").hide();
      $(".slidecontainer").hide();




      if (sentiment >= 40) {
        document.querySelector('#analysis').innerHTML = ("Limited use of positive sentiment");
        document.querySelector('#sanalysis').innerHTML = ("Bad news sells! Conveying positive emotions can build positive associations with your brand, but can just as easily disinterest the reader.");
      }  else {
        document.querySelector('#analysis').innerHTML = ("Lack of negative sentiment");
        document.querySelector('#sanalysis').innerHTML = ("Bad news sells! Conveying negative emotions in your headline can increase engagement. ");

      }

      if (length == 0) {
        document.querySelector('#a2').innerHTML = ("Increase headline length");
        document.querySelector('#a2length').innerHTML = ("Try to increase your headline length, but keep it under 10 words");
      } else {
        document.querySelector('#a2').innerHTML = (" Headline length is perfect");
        document.querySelector('#a2length').innerHTML = ("More is better. Longer headlines increase engagement and can tell a better story.");
      }

      if (alert == 0) {
        document.querySelector('#a3').innerHTML = ("Use more alert words");
        document.querySelector('#a3alert').innerHTML = ("Humans react more strongly to words that make us feel anxious, like: afraid, scare, risk and alarm. Use them wisely: these words are great for engagement, but don’t necessarily build positive associations with your brand.");
      } else {
        document.querySelector('#a3').innerHTML = ("Good use of alert words");
        document.querySelector('#a3alert').innerHTML = ("Humans react more strongly to words that make us feel anxious like: afraid, scare, risk and alarm. Use them wisely: these words are great for engagement, but don’t necessarily build positive associations with your brand.");
      }



    }
  );
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn1').addEventListener("click", addHeadline);


});
