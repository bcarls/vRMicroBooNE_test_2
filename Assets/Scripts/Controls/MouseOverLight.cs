using UnityEngine;
using System.Collections;

public class MouseOverLight : MonoBehaviour {
	public Light activ_light;
	// Use this for initialization
	void Start () { 
		activ_light = GetComponent<Light> ();
	}
	
	// Update is called once per frame
	void Update () {
		activ_light.enabled = false;
	}
	void OnMouseOver () {
		if (Input.GetMouseButtonDown (0)) {
			activ_light.enabled = true;	}
		}
}
