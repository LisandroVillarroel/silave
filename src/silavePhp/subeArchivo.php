<?php
//header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Access-Control-Allow-Credentials:true');
header('Access-Control-Allow-Headers:Origin, Accept, Authorization, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
header('Access-Control-Allow-Methods:GET, POST, DELETE, PUT, HEAD, OPTIONS');
header('Access-Control-Allow-Origin:*');

 $json = file_get_contents('php://input'); // RECIBE EL JSON DE ANGULAR
 $params = json_decode($json); // DECODIFICA EL JSON Y LO GUARADA EN LA VARIABLE
 $rutaPath ="/src/assets/imagenes/".$params->ruta;

 $nombre = $params->nombre;
 $nombreArchivo = $params->nombreArchivo;
 if($nombreArchivo!=''){
    if(!is_dir($_SERVER['DOCUMENT_ROOT'].$rutaPath)){
      mkdir($_SERVER['DOCUMENT_ROOT'].$rutaPath, 0700);
    }
    $archivo = $params->base64textString;

    //$archivo = str_replace('data:image/png;base64,', '', $archivo);
    //$archivo = str_replace(' ', '+', $archivo);
    $archivo = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $archivo));
    $filePath =$_SERVER['DOCUMENT_ROOT'].$rutaPath.'/'.$nombreArchivo;
    file_put_contents($filePath, $archivo);
  }

  class Result {}
  // GENERA LOS DATOS DE RESPUESTA
  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje ='';

  header('Content-Type: application/json');
  echo json_encode($response); // MUESTRA EL JSON GENERADO */
?>
