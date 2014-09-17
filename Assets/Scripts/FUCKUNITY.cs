using UnityEngine;
using System.Collections;

public class FUCKUNITY : MonoBehaviour {
	
	public GameObject target = null;
	public bool orbitY = false;
	
	void Start () {
		
	}
	
	void Update () 
	{
		if (target != null)
		{
			transform.LookAt(target.transform);
			
			if (orbitY)
			{
				transform.RotateAround(target.transform.position, Vector3.up, Time.deltaTime);
					
					
			}
			
			
		}
	}
}
