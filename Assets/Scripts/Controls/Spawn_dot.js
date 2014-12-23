#pragma strict

var dot : Rigidbody;
var clone : Rigidbody;
clone = dot;

function Start () {

}

function Update () {
	 
	if (Input.GetKeyDown(KeyCode.J)) {
		clone = Instantiate(dot,transform.position + Vector3(2,2,2), transform.rotation);
		Destroy(clone.gameObject,4);
}
}