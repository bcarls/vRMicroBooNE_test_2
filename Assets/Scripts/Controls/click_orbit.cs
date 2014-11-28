using UnityEngine;
using System.Collections;



[AddComponentMenu("Camera-Control/Keyboard Orbit")]


public class click_orbit : MonoBehaviour {

	public Camera camera;
	public Vector3 Playerloc;
	public Vector3 Zoomloc; 
	public Vector3 cam1loc;
	public Vector3 cam2loc;
	public Transform target;

	public float orbitdist = 20.0f; //Distance from the clicked target
	public float zoomSpd = 2.0f; //Scroll speed of mousewheel
	public float xSpeed = 240.0f; //Horizontal rotation speed
	public float ySpeed = 123.0f; //Vertical rotation speed
	public float zoomSpeed = 20.0f; //Scroll speed of mousewheel

	public int yMinLimit = -723;
	public int yMaxLimit = 877;
	public int esc_enable = 1;


	private float x1 = 0.0f;
	private float y1 = 0.0f;


	// Use this for initialization
	void Start () {

		Playerloc = camera.transform.position; //Player Camera location
		Vector3 angles = transform.eulerAngles;
		x1 = angles.y;
		y1 = angles.x;
		
		// Make the rigid body not change rotation
		if (rigidbody)
			rigidbody.freezeRotation = true;


	}






	// Update is called once per frame
	void Update () {
		Playerloc = camera.transform.position;
		float scroll = Input.GetAxis("Mouse ScrollWheel");
		float currentFOV = camera.fieldOfView;

		//ScrollWheel controls for zooming in and out
		if (scroll != 0.0f)
		{
			camera.fieldOfView = Mathf.Lerp(currentFOV, scroll, Time.time * zoomSpeed);
			esc_enable = 0;
			if (Input.GetButtonDown("Escape"))
			{
				camera.fieldOfView = currentFOV;
			}
		}


		}

	//Target swapping with mouse will only work when mouse is hovering over a target, this is the function
	void OnMouseOver() {
		Zoomloc = target.transform.position;

			//Left click swapping to target
				if (Input.GetMouseButtonDown (0)) {
				camera.transform.position = Zoomloc;


						x1 -= Input.GetAxis ("Horizontal") * xSpeed * 0.02f;
						y1 += Input.GetAxis ("Vertical") * ySpeed * 0.02f;
			
						y1 = ClampAngle(y1, yMinLimit, yMaxLimit);
			
						//orbitdist += Input.GetButtonDown ("Mouse ScrollWheel") *zoomSpd* 0.02f;
						//distance += Input.GetAxis("Fire2") *zoomSpd* 0.02f;
			
						Quaternion rotation = Quaternion.Euler (y1, x1, 0.0f);
						Vector3 position = rotation * new Vector3 (0.0f, 0.0f, -orbitdist) + target.position;
			
						transform.rotation = rotation;
						transform.position = position;
				}
		}

	

	public static float ClampAngle (float angle, float min, float max) {

		if (angle < -360.0f)
			angle += 360.0f;

		if (angle > 360.0f)
			angle -= 360.0f;

		return Mathf.Clamp (angle, min, max);

	}
	} 


