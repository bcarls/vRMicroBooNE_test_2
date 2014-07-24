function Update () { }

//Speed Variable unstable above 25

var speed = 6.0;

var airspeed = 5.0;

var jumpSpeed = 8.0;

var gravity = 20.0;

private var moveDirection = Vector3.zero;

private var grounded : boolean = false;

function FixedUpdate() {
if (grounded) {
 
   // We are grounded, so recalculate movedirection directly from axes
 
   moveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
 
   moveDirection = transform.TransformDirection(moveDirection);
 
   moveDirection *= speed;      
 
     if (Input.GetButton ("Jump")) {
 
     moveDirection.y = jumpSpeed;
 
     }
 
   }
 
   else {
 
 
 
   //Preserving fall value
 
   var fall = moveDirection.y;
 
 
 
 
 
   var NewmoveDirection = new Vector3(Input.GetAxis("Horizontal"), 0, Input.GetAxis("Vertical"));
 
   NewmoveDirection = transform.TransformDirection(NewmoveDirection);
 
   moveDirection = moveDirection + ((NewmoveDirection * airspeed) * Time.deltaTime);
 
 
 
 
 
 
 
   //Replacing Y movement value to original fall
 
   moveDirection.y = fall;
 
   }
 
 
 
// Apply gravity
 
moveDirection.y -= gravity * Time.deltaTime;
 
 
 
// restrict to speed and Move the controller
 
moveDirection.x = Mathf.Clamp(moveDirection.x, -speed, speed);
 
moveDirection.y = Mathf.Clamp(moveDirection.y, -speed, speed);
 
moveDirection.z = Mathf.Clamp(moveDirection.z, -speed, speed);
 
var controller : CharacterController = GetComponent(CharacterController);
 
var flags = controller.Move(moveDirection * Time.deltaTime);
 
grounded = (flags & CollisionFlags.CollidedBelow) != 0;
 
}
 
 
 
@script RequireComponent(CharacterController)
