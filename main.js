function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(615, 208);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modelLoaded)
}
function modelLoaded() 
{
  console.log('Model Loaded!')
}
function draw() 
{
  image(video, 0, 0, 400, 300)
  classifier.classify(video, gotResult)
}

var previous_result = ""

function gotResult(error, result) 
{
  console.log('result');

  if (error) 
  {
    console.log('error')
  } 
  else 
  {
    if(result[0].confidence > 0.5 && result[0].label != previous_result)
    {
      previous_result = result[0].label

      document.getElementById('result_object_name').innerHTML = result[0].label
      document.getElementById('result_object_accuracy').innerHTML = (result[0].confidence*100).toFixed(2) + "%"

      var synth = window.speechSynthesis
      speakdata  = "Object detected is " + result[0].label
      var utterThis = new SpeechSynthesisUtterance(speakdata)
      synth.speak(utterThis);
    }
  }
}