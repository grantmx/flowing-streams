<?php
date_default_timezone_set("UTC");
//Defaults 
$time = time();
$key = 'externalapinewson';
$method = 'Log/Listing';
$methodParam = 'dayshistory';
$methodParamValue = 1;
$sharedSecrtet = 'feguMaYUP6uxEtER6tHa';

$sigString = 'apikey=' .$key;
$sigString .= '&dayshistory=' .$methodParamValue;
$sigString .= '&sigtime=' .$time;
$sigString .= '&'. $method;
$sigString .= $sharedSecrtet;

$sig = sha1($sigString);

//Curl Setup 
$params=['sigtime'=> $time, 'apikey'=> $key, 'sig'=> $sig, 'dayshistory' => $methodParamValue];
$defaults = array(
      CURLOPT_URL => 'https://vinsonapi-newson.triple-it.nl/V1External/' . $method ,
      CURLOPT_POST => true,
      CURLOPT_POSTFIELDS => $params,
      CURLOPT_RETURNTRANSFER => true);
$ch = curl_init();
curl_setopt_array($ch, $defaults);



// grab URL and pass it to the browser
$response = curl_exec($ch);
echo curl_error($ch);
// close cURL resource, and free up system resources
curl_close($ch);

//Response  
// Expected Response Array ["ResponseObject"]["Logs"][Num]["Url"]



$jsonresponse = json_decode($response);

// Base Nums
$logs = $jsonresponse->ResponseObject->Logs;
$url_count = sizeof($logs);
$last = $url_count - 1;


// Echo out newest log
$url = $logs[$last]->Url;

// Read in the file
$handle = fopen($url, "r");
$count = 0;
while (!feof($handle)) {
	
  $lineArray = fgetcsv($handle, 0, "\t");
  if(sizeof($lineArray) > 5){
	  
	  // Check for Header line = the first line will always be the header and has 1 extra column
	  if($count ==0){
	  array_shift($lineArray);$data[] = $lineArray;} else {$data[] = $lineArray;}
	  
	  $count++;
  }
}
fclose($handle);

/*Test
echo "<pre>";
var_dump($data);
echo "</pre>";
*/

?>


<html>
<head>
<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.10/css/jquery.dataTables.min.css">

<script type="text/javascript" language="javascript" src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript" language="javascript" src="https://cdn.datatables.net/1.10.3/js/jquery.dataTables.min.js"></script>

</head>
<body>
<table id="example" class="display" cellspacing="0" width="100%">  
<?php

for($i = 0;$i<sizeof($data);$i++){
	if($i == 0){
		echo '<tr><thead>';
			for($j=0;$j<sizeof($data[$i]);$j++){
				echo'<th>' . $data[$i][$j] . '</th>';
			}
		echo '</tr></thead><tbody>';
	} else {
		
		echo '<tr>';
			for($j=0;$j<sizeof($data[$i]);$j++){
				echo'<td>' . $data[$i][$j] . '</td>';
			}
		echo '</tr>';
	
		
	}
	
}
echo "</tbody>";
?>
</table>
<script>
$(document).ready(function() {
    $('#example').DataTable();
} );
</script>

</body>
</html>
