<?php
/*
Site : http:www.vetbossel.in
Author :vetripandi
*/
require_once 'config.php';
$request_body = file_get_contents('php://input');
$payload = json_decode($request_body);

if( isset($payload->type) && !empty($payload->type )  ){
	$type = $payload->type;
	
	switch ($type) {
		case "create":
			save_employee($mysqli, $payload);
			break;
        case "getEmployees":
			getEmployees($mysqli);
			break;
		case "updateEmployees":
			update_employees($mysqli, $payload);
			break;
        case "downloadEmployees":
            download_employees($mysqli, $payload);
            break;
            
       
		case "deleteEmployee":
			delete_employee($mysqli, $payload);
			break;
		default:
			invalidRequest();
	}
} 
elseif($_POST['type'] == 'uploadEmployees')
{
    upload_employees($mysqli, $_POST);
}
else{
	invalidRequest();
}

/**
 * This function gets list of users from database
 */
function download_employees($mysqli)
{
	    
        $setSql = "SELECT 
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
    
        $setRec = $mysqli->query( $setSql );
        
        $columnHeader = '';  
        $columnHeader = "Employee ID" . "\t" . "Employee Name" . "\t" . "Email" . "\t" . "Designation" . "\t" . "Reporting To" . "\t" . "Domain" . "\t" . "Category" . "\t" . "Skill Set" . "\t";  

        $setData = '';  

        while ($rec = mysqli_fetch_row($setRec)) {  
        $rowData = '';  
        foreach ($rec as $value) {  
        $value = '"'.$value.'"'. "\t";  
        $rowData .= $value;  
        }  
        $setData .= trim($rowData) . "\n";  
        }  


        header("Content-type: application/octet-stream");  
        header('Content-Disposition: attachment;filename="survey.xlsx"');
        header("Pragma: no-cache");  
        header("Expires: 0");  

        echo ucwords($columnHeader) . "\n" . $setData . "\n"; 
    
}


function upload_employees($mysqli, $payload){
    
    
//    set_include_path(get_include_path() . PATH_SEPARATOR . 'Classes/');
//    
//    include 'PHPExcel/IOFactory.php';	
//    
//    $inputFileName = $_FILES['EmpData']['tmp_name'];
    /** Include path **/
    set_include_path(get_include_path() . PATH_SEPARATOR . 'Classes/');

    /** PHPExcel_IOFactory */
    include 'PHPExcel/IOFactory.php';


    $inputFileName = $_FILES['EmpData']['tmp_name'];
    //echo $inputFileName; exit;
    //echo 'Loading file ',pathinfo($inputFileName,PATHINFO_BASENAME),' using IOFactory to identify the format<br />';
    try {
        $objPHPExcel = PHPExcel_IOFactory::load($inputFileName);
    } catch(Exception $e) {
        die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
    }


    echo '<hr />';
    echo "<pre>";
    $sheetData = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
    print_r($sheetData);
    
//    
//    
//    try {
//	    $objPHPExcel = PHPExcel_IOFactory::load($inputFileName);
//	} catch(Exception $e) {
//        die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
//    }
//    
//    $allDataInSheet = $objPHPExcel->getActiveSheet()->toArray(null,true,true,true);
//    $arrayCount = count($allDataInSheet);
//    
//    try {
//	    
//	   $query = "INSERT INTO sync_employees (`id`, `emp_id`, `emp_name`, `email`, `designation`, `reporting_to`, `tech_domain`, `tech_category`, `skill_set`, `status`,`modified_date`)  VALUES";
//
//        for($i=2;$i<=$arrayCount;$i++) {
//
//            $emp_id = trim($allDataInSheet[$i]["A"]);
//            $emp_name = trim($allDataInSheet[$i]["B"]);
//            $email = trim($allDataInSheet[$i]["C"]);
//            $designation = trim($allDataInSheet[$i]["D"]);
//            $reporting_to = trim($allDataInSheet[$i]["E"]);
//            $domains = trim($allDataInSheet[$i]["F"]);
//            $catgs = trim($allDataInSheet[$i]["G"]);
//            $skills = trim($allDataInSheet[$i]["H"]);
//            $modified_date = date("Y-m-d h:i:s"); 
//
//             $query .= "('', '$emp_id', '$emp_name', '$email', '$designation', '$reporting_to', '$domains', '$catgs', '$skills', '1', '$modified_date')";
//              if($i < ($arrayCount)){
//                 $query .=",";
//               }
//        }
//      echo $query; exit;
//       if( $mysqli->query( $query ) ){
//			$data['success'] = true;
//			$data['message'] = 'Employee Details updated successfully.';
//            getEmployees($mysqli);
//		}else{
//			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
//		}
//		$mysqli->close();
//		echo json_encode($data);
//		exit;
//	}catch (Exception $e){
//		$data = array();
//		$data['success'] = false;
//		$data['message'] = $e->getMessage();
//		echo json_encode($data);
//		exit;
//	}
//    
    
}

function getEmployees($mysqli){
	try{
	
		$query = "SELECT * FROM `sync_employees` order by id";
		$result = $mysqli->query( $query );
		$data = array();
		while ($row = $result->fetch_assoc()) {
			$row['id'] = (int) $row['id'];
			$data['data'][] = $row;
		}
		$data['success'] = true;
		echo json_encode($data);exit;
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}

/**
 * This function will handle user add, update functionality
 * @throws Exception
 */
function save_employee($mysqli, $payload){
   
	try{
        
		$data = array();
		$emp_id = $mysqli->real_escape_string(isset( $payload->emp_id ) ? $payload->emp_id : '');	
        $id = $mysqli->real_escape_string(isset( $payload->id ) ? $payload->id : '');
        $emp_name = $mysqli->real_escape_string(isset( $payload->emp_name ) ? $payload->emp_name : '');   
        $email = $mysqli->real_escape_string(isset( $payload->email ) ? $payload->email : '');      
        $designation = $mysqli->real_escape_string(isset( $payload->designation ) ? $payload->designation : '');
        $reporting_to = $mysqli->real_escape_string(isset( $payload->reporting_to ) ? $payload->reporting_to : '');
        
        
        
        if($payload->domains){
            $domain_list = $payload->domains;
            $domains = join(', ', $domain_list);
        } else {
            $domains = $payload->tech_domain;
        } 
        
        if($payload->categories){
            $catg_list = $payload->categories;
            $catgs = join(', ', $catg_list);
        } else {
            $catgs = $payload->tech_category;
        }  
        
        if($payload->skills){
            $skill_list = $payload->skills;
            $skills = join(', ', $skill_list);
        }  else {
            $skills = $payload->skill_set;
        }
       
        
        $modified_date = date("Y-m-d h:i:s"); 
	   
	   if($emp_id == ''){
			throw new Exception( "Required fields missing, Please enter and submit" );
		}
        
		if($id== ''){
            
			$query = "INSERT INTO sync_employees (`id`, `emp_id`, `emp_name`, `email`, `designation`, `reporting_to`, `tech_domain`, `tech_category`, `skill_set`, `status`,`modified_date`) 
            VALUES ('', '$emp_id', '$emp_name', '$email', '$designation', '$reporting_to', '$domains', '$catgs', '$skills', '1', '$modified_date')";
            
            
		}else{
           
            $query = "UPDATE sync_employees SET  `designation`='$designation', `emp_name`= '$emp_name',`reporting_to`='$reporting_to', `tech_domain`='$domains', `tech_category`= '$catgs',`skill_set`='$skills', `modified_date` = '$modified_date' where emp_id='$emp_id'"; 
			
		}
        
        //echo $query; exit;
	
		if( $mysqli->query( $query ) ){
			$data['success'] = true;
			if(!empty($emp_id))$data['message'] = 'Employee Details updated successfully.';
			else $data['message'] = 'Employee inserted successfully.';
			if(empty($id))$data['id'] = (int) $mysqli->insert_id;
			else $data['id'] = (int) $id;
            getEmployees($mysqli);
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}  

/**
 * This function will handle employee update functionality
 * @throws Exception
 */
function update_employees($mysqli, $payload){
   
	try{
		$data = array();
        
        $empId = $mysqli->real_escape_string(isset( $payload->emp_id ) ? $payload->emp_id : '');
        if($empId){
         $ids = $empId;
        } else {
        $emp_list = $payload->empList;
        $ids = join("', '", $emp_list);
        }
       
        $domain_list = $payload->domains;
        $domains = join(', ', $domain_list);
        
        $catg_list = $payload->categories;
        $catgs = join(', ', $catg_list);
        
        $skill_list = $payload->skills;
        $skills = join(', ', $skill_list);
        
        $modified_date = date("Y-m-d h:i:s"); 
        
        $type = $mysqli->real_escape_string(isset( $payload->type ) ? $payload->type : '');
       
        if($empId){
           $query = "UPDATE sync_employees SET  `designation`='$payload->designation', `emp_name`= '$payload->emp_name',`reporting_to`='$payload->reporting_to', `tech_domain`='$domains', `tech_category`= '$catgs',`skill_set`='$skills', `modified_date` = '$modified_date' where emp_id='$ids'"; 
        } else {
          $query = "UPDATE sync_employees SET  `tech_domain`='$domains', `tech_category`= '$catgs',`skill_set`='$skills', `modified_date` = '$modified_date' where emp_id IN('$ids')"; 
        }
        
        
	
		if( $mysqli->query( $query ) ){
          getEmployees($mysqli);
		  //$data['success'] = true;
	     // $data['message'] = 'User Details updated successfully.';
            
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		$mysqli->close();
		echo json_encode($data);
		exit;
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
}   


/**
 * This function will handle user deletion
 * @param string $id
 * @throws Exception
 */
function delete_employee($mysqli, $payload){
	
    try{
        
        $id  = $mysqli->real_escape_string(isset( $payload->empId ) ? $payload->empId : '');
		if(empty($id)) throw new Exception( "Invalid Employee." );
		$query = "DELETE FROM `sync_employees` WHERE `emp_id` = '$id'";
		if($mysqli->query( $query )){
			$data['success'] = true;
			$data['message'] = 'Employee deleted successfully.';
			echo json_encode($data);
			exit;
		}else{
			throw new Exception( $mysqli->sqlstate.' - '. $mysqli->error );
		}
		
	
	}catch (Exception $e){
		$data = array();
		$data['success'] = false;
		$data['message'] = $e->getMessage();
		echo json_encode($data);
		exit;
	}
    
}



	

function invalidRequest()
{
	$data = array();
	$data['success'] = false;
	$data['message'] = "Invalid request.";
	echo json_encode($data);
	exit;
}





