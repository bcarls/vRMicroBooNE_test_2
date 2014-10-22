﻿#pragma strict
import SimpleJSON;
import System.IO;

private var m_InGameLog = "";
private var m_Position = Vector2.zero;
var fileName = "test_reco_event.json";

function P( aText : String)
{
	m_InGameLog += aText + "\n";
}

function Test()
{

    // To read in from the Argo web interface
    //var url = "http://argo-microboone.fnal.gov/server/serve_event.cgi?filename=%2Fuboone%2Fdata%2Fuboonepro%2F%2Freco%2Fv1_00_04_ub01%2Fprod_muminus_0.5-5.0GeV_25degf_3window_uboone%2F15565231_0%2Fprod_muminus_0.5-5.0GeV_25degf_3window_uboone_15319004_3_gen_15321872_3_g4_15342660_3_detsim_tpc_15370973_2_reco2D_15387746_1_reco3D_merged.root&selection=1&entry=0&options=_NoPreSpill_NoPostSpill__NORAW__NOCAL_&download";
    //var www : WWW = new WWW(url);
    //// Wait for the download to complete
    //yield www;
    //var jsonString = www.data;

    // To read in from a file
    var sr = new StreamReader(Application.dataPath + "/" + fileName);
    var jsonString = sr.ReadToEnd();
    sr.Close();
    
    
    var N = JSONNode.Parse(jsonString);

    P("The event number is: ");
    P(N["record"]["header"]["event"].ToString(""));

    P("The first wire is: ");
    P(N["record"]["hits"]["recob::Hits_cccluster__Reco2D"][0]["wire"].ToString(""));

    P("The first spacepoint xyz is: ");
    P(N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][0].ToString()  
    + "," + N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][1].ToString()
    + "," + N["record"]["spacepoints"]["recob::SpacePoints_spacepointfinder__Reco3D"][0]["xyz"][2].ToString());

}

function Start()
{
    Test();
	Debug.Log("Test results:\n" + m_InGameLog);
}

function OnGUI()
{
	m_Position = GUILayout.BeginScrollView(m_Position);
	GUILayout.Label(m_InGameLog);
	GUILayout.EndScrollView();
}



















//function Update () {

    //// Put this in your update function
    //if (Input.GetKeyDown(KeyCode.N)) {

	//private var fileName = "serve_event.cgi";
	//var N = JSON.Parse("the_JSON_string");
	//var Event = N["record"]["header"]["event"].AsFloat;


    //}

//}
