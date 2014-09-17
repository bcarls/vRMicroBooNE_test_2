#pragma strict
var idleTimer: float = 0.0;
var cam1: Camera;
var cam2: Camera;
var cam3: Camera;

private var lastPos: Vector3;

function Start(){

    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    
  lastPos = transform.position;
}

function Update(){
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
  }
  else if (idleTimer >= 7 && (cam1.enabled == true || cam3.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = true;
    cam3.enabled = false;
  	}
  else if (idleTimer >= 20 && (cam2.enabled == true || cam1.enabled == true)) {
    cam1.enabled = false;
    cam2.enabled = false;
    cam3.enabled = true;
    }
  else if (idleTimer >= 35 && (cam2.enabled == true || cam3.enabled == true)) {
    cam1.enabled = true;
    cam2.enabled = false;
    cam3.enabled = false;
    }
}