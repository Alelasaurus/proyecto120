prediction_1=""
prediction_2=""

Webcam.set({
width:350,
height:300,
image_format:'png',
png_quality:90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src=" '+data_uri+'"/>';

    });
}
console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/-avpaYrry/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded1!');
}

function speak(){
    var synth=window.speechSynthesis;
    speak_data_1="la primera prediccion es"+ prediction_1;
    speak_data_2="y la segunda prediccion es"+prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1+speak_data_2);
    synth.speak(utterThis);
}

function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, goResult);
}


function goResult(error,results){
    if (error){
        console.error(error);
    }else{
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML=results[0].label;
        document.getElementById("result_emotion_name2").innerHTML=results[1].label;
        prediction_1=results[0].label;
        prediction_2=results[1].label;
        speak();
        if(results[0].label=="feliz"){
            document.getElementById("update_emoji").innerHTML="&#128512;";
        }
        if(results[0].label=="triste"){
            document.getElementById("update_emoji").innerHTML="&#128543;";
        }
        if(results[0].label=="enojado"){
            document.getElementById("update_emoji").innerHTML="&#128542;";
        }
        if(results[0].label=="asustado"){
            document.getElementById("update_emoji").innerHTML="&#128545;";
        }
        if(results[0].label=="feliz"){
            document.getElementById("update_emoji2").innerHTML="&#128512;";
        }
        if(results[0].label=="triste"){
            document.getElementById("update_emoji2").innerHTML="&#128543;";
        }
        if(results[0].label=="enojado"){
            document.getElementById("update_emoji2").innerHTML="&#128542;";
        }
        if(results[0].label=="asustado"){
            document.getElementById("update_emoji2").innerHTML="&#128545;";
        }
    }
}