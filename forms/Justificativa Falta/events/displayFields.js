function displayFields(form,customHTML){
    customHTML.append(" <script> var CURRENT_STATE = "
    + getValue("WKNumState") + "; var CURRENT_USER = '" 
    + getValue("WKUser") + "'; var CURRENT_PROCESS = "
    + getValue("WKNumProcess") + "; </script>"); 
 }