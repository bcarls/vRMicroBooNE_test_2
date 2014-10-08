#pragma strict
var idleTimer: float = 0.0;
var cam1: Camera;
var cam2: Camera;
var cam3: Camera;
var cam4: Camera;
var cam5: Camera;
var cam6: Camera;

var cam2pos: Vector3; // Original positions of the cameras
var cam3pos: Vector3;
var cam4pos: Vector3;	
var cam5pos: Vector3;
var cam6pos: Vector3;

public var fadeSpeed : float = 1.5f;            // Speed that the screen fades to and from black.
private var sceneStarting : boolean = true;     // Whether or not the scene is still fading in.

private var lastPos: Vector3;

function Start(){

	guiTexture.pixelInset = new Rect(0f, 0f, Screen.width, Screen.height);
	
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
    
    cam2pos = cam2.transform.position; 
    cam3pos = cam3.transform.position;
    cam4pos = cam4.transform.position;
    cam5pos = cam5.transform.position;
    cam6pos = cam6.transform.position;
  	lastPos = transform.position;
}

function FadeToClear ()
{
    // Lerp the colour of the texture between itself and transparent.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.clear, fadeSpeed * Time.deltaTime);
}


function FadeToBlack ()
{
    // Lerp the colour of the texture between itself and black.
    guiTexture.color = Color.Lerp(guiTexture.color, Color.black, fadeSpeed * Time.deltaTime);
}


function Update(){
	if(sceneStarting)
	StartScene();
  // calculate the velocity since last Update:
  var vel: float = Vector3.Distance(transform.position, lastPos)/Time.deltaTime;
  lastPos = transform.position; // update lastPos
  if (vel > 0.001){ // if vel slightly greater than zero...
    idleTimer = 0.0; // reset timer
  } else { // if zero or too near to zero...
    idleTimer += Time.deltaTime; // count time in idleTimer
  }
  if (idleTimer == 0 ){
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  }
  else if (idleTimer >= 6 && idleTimer < 14 && (cam1.enabled == true || cam3.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  	}
  else if (idleTimer >= 14 && idleTimer < 25 && (cam2.enabled == true || cam1.enabled == true)) {
  	cam3.transform.position = cam3pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = true;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
    }
  else if (idleTimer >= 25 && idleTimer < 30 && (cam2.enabled == true || cam3.enabled == true)) {
  	cam4.transform.position = cam4pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = true;
    cam5.enabled = false;
    cam6.enabled = false;
    }
  else if (idleTimer >= 30 && idleTimer < 35 && (cam3.enabled == true || cam4.enabled == true)) {
  	cam5.transform.position = cam5pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = true;
    cam6.enabled = false;
    }
/* else if (idleTimer >= 40 && idleTimer < 45 && (cam3.enabled == true || cam4.enabled == true)) {
  	cam6.transform.position = cam6pos;
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = true;
    } */
  else if (idleTimer >= 40 && (cam5.enabled == true || cam6.enabled == true)){
  	idleTimer = 6;
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
    cam4.enabled = false;
    cam5.enabled = false;
    cam6.enabled = false;
  	}
  	
}
function StartScene ()
{
    // Fade the texture to clear.
    FadeToClear();
    
    // If the texture is almost clear...
    if(guiTexture.color.a <= 0.05f)
    {
        // ... set the colour to clear and disable the GUITexture.
        guiTexture.color = Color.clear;
        guiTexture.enabled = false;
        
        // The scene is no longer starting.
        sceneStarting = false;
    }
}


public function EndScene ()
{
    // Make sure the texture is enabled.
    guiTexture.enabled = true;
    
    // Start fading towards black.
    FadeToBlack();
    
    // If the screen is almost black...
    if(guiTexture.color.a >= 0.95f)
        // ... reload the level.
        Application.LoadLevel(0);
}