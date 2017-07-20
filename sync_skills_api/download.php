<?php
/*
$conn = new mysqli('localhost', 'root', '');  
mysqli_select_db($conn, 'sync_skills');  

$setSql = "SELECT @a:=@a+1 serial_number, 
emp_id as `Employee ID`,
emp_name as `Employee Name`,
email as `Email`,
designation as  `Designation`,
reporting_to as  `Reporting To`,
tech_domain as  `Domain`,
tech_domain as  `Category`,
skill_set as  `Skill Set`
FROM `sync_employees`, (SELECT @a:= 0) AS a;
";  

$setRec = mysqli_query($conn, $setSql);  

$columnHeader = '';  
$columnHeader = "Sr NO" . "\t" . "Employee ID" . "\t" . "Employee Name" . "\t" . "Email" . "\t" . "Designation" . "\t" . "Reporting To" . "\t" . "Domain" . "\t" . "Category" . "\t" . "Skill Set" . "\t";  

$setData = '';  

while ($rec = mysqli_fetch_row($setRec)) {  
$rowData = '';  
foreach ($rec as $value) {  
$value = '"' . $value . '"' . "\t";  
$rowData .= $value;  
}  
$setData .= trim($rowData) . "\n";  
}  


header("Content-type: application/octet-stream");  
header("Content-Disposition: attachment; filename=User_Detail_Reoprt.xls");  
header("Pragma: no-cache");  
header("Expires: 0");  

echo ucwords($columnHeader) . "\n" . $setData . "\n"; 

*/

  

$conn=mysql_connect("localhost","root","") or die("Could not connect");
mysql_select_db("sync_skills",$conn) or die("could not connect database");

    $SQL="select * from sync_employees";
  
$header = '';
$result ='';
$exportData = mysql_query ($SQL ) or die ( "Sql error : " . mysql_error( ) );
 
$fields = mysql_num_fields ( $exportData );
 
for ( $i = 0; $i < $fields; $i++ )
{
    $header .= mysql_field_name( $exportData , $i ) . "\t";
}
 
while( $row = mysql_fetch_row( $exportData ) )
{
    $line = '';
    foreach( $row as $value )
    {                                            
        if ( ( !isset( $value ) ) || ( $value == "" ) )
        {
            $value = "\t";
        }
        else
        {
            $value = str_replace( '"' , '""' , $value );
            $value = '"' . $value . '"' . "\t";
        }
        $line .= $value;
    }
    $result .= trim( $line ) . "\n";
}
$result = str_replace( "\r" , "" , $result );
 
if ( $result == "" )
{
    $result = "\nNo Record(s) Found!\n";                        
}
 
header("Content-type: application/octet-stream");
header("Content-Disposition: attachment; filename=export.xlsx");
header("Pragma: no-cache");
header("Expires: 0");
print "$header\n$result";



?>