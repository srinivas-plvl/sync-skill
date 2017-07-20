<?php
/*
Site : http:www.vetbossel.in
Author :vetripandi
*/
require_once 'config.php';

$request_body = file_get_contents('php://input');
$payload = json_decode($request_body);

//$empid = $payload->emp_id;


if( isset($payload->type) && !empty($payload->type ) ){
	$type = $payload->type;
	
	switch ($type) {
		case "login_user":
			login_user($mysqli, $payload);
			break;
		case "logout_user":
			logout_user($mysqli, $payload);
			break;
		case "change_password":
			change_password($mysqli, $payload);
			break;
		default:
			invalidRequest();
	}
}else{
	invalidRequest();
}

/**
 * This function will handle user add, update functionality
 * @throws Exception
 */
function login_user($mysqli, $payload){
   
	try{
       
        $username = $mysqli->real_escape_string(isset( $payload->username ) ? $payload->username : '');
        $password = $mysqli->real_escape_string(isset( $payload->password ) ? $payload->password : '');

        $query = "SELECT * FROM `sync_users` where `user_name`= '$username' and `password`= '$password'";
        $result = $mysqli->query( $query );
        $row = $result->fetch_assoc();
       
		if($row){
            $data['success'] = true;
            $data['message'] = "valid user";
            $data['data'][] = $row;
           
            echo json_encode($data);
			exit;
		}else{
			$data['success'] = false;
			$data['message'] = "Invalid Login Credentials";
            echo json_encode($data);
			exit;
		}
	
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

function logout_user($mysqli, $payload){
   // print_r($payload);
   // echo session_id();
    print_r($_SESSION); exit;
	
}
	
/**
 * This function gets list of users from database
 */
function change_password($mysqli, $payload){
    
    
    try{
       
        $oldpassword = $mysqli->real_escape_string(isset( $payload->oldpassword ) ? $payload->oldpassword : '');
        $newpassword = $mysqli->real_escape_string(isset( $payload->password ) ? $payload->password : '');       
        $emp_id = $mysqli->real_escape_string(isset( $payload->emp_id ) ? $payload->emp_id : '');


        $query = "SELECT * FROM `sync_users` where `emp_id`= '$emp_id' and `password`= '$oldpassword'";
        $result = $mysqli->query( $query );
        $row = $result->fetch_assoc();
        
		if($row){
            
              $query = "UPDATE  `sync_users` SET  `password`= '$newpassword' where `emp_id`= '$emp_id' and `password`= '$oldpassword'";
              $result = $mysqli->query( $query );
              //$row = $result->fetch_assoc();
                if($result){
                     $data['success'] = true;
                     $data['message'] = "Password Changed Succesfully .Please login again";
                    echo json_encode($data);
                    exit;  
                }
                else{
                    $data['success'] = false;
                    $data['message'] = "Password Not Updated. Please try again";
                    echo json_encode($data);
                    exit;
                }
                
		}else{
			$data['success'] = false;
			$data['message'] = "invalid user Details";
            echo json_encode($data);
			exit;
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





