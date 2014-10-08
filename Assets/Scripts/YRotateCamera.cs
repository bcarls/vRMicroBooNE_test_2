using UnityEngine;
using System.Collections;


public class YRotateCamera : MonoBehaviour {
	public bool OrbitY = false;
	void Start () {
	
	}


	void Update () {
		if (OrbitY) {
						transform.Rotate(Vector3.up * 1 * Time.deltaTime);
				}
		}
}
