Webcam.set({
    width:350,
    height:300,
    image_format:'jpg',
    jpg_quality:90
});

var camera = document.getElementById("camera");
Webcam.attach( '#camera' );

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML ='<img id="SnapShot" src="'+data_uri+'">';
    });
}

console.log("ml5 version:",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-ynmkcqQ7/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

var prediction1="";
var prediction2="";

function speak(){
var synth = window.speechSynthesis;
speak_data_1="The first prediction is"+prediction1;
speak_data_2="The second prediction is"+prediction2;
var utter_this = new SpeechSynthesisUtterance( speak_data_1+speak_data_2 );
synth.speak(utter_this);
}

function check(){
    img = document.getElementById('SnapShot');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if (error){
        console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name_2").innerHTML = results[1].label;
        prediction1 = results[0].label;
        prediction2 = results[1].label;
        speak();

        if (results[0].label == "happy"){
            document.getElementById("updating_emoji").innerHTML = '&#128512';
        }
        if (results[0].label == "sad"){
            document.getElementById("updating_emoji").innerHTML = '&#128553';
        }
        if (results[0].label == "terrified"){
            document.getElementById("updating_emoji").innerHTML = '&#128552';
        }


        if (results[1].label == "happy"){
            document.getElementById("updating_emoji").innerHTML = '&#128512';
        }
        if (results[1].label == "sad"){
            document.getElementById('updating_emoji').innerHTML = '&#128553';
        }
        if (results[1].label == "terrified"){
            document.getElementById("updating_emoji").innerHTML = '&#128552';
        }
    }
}