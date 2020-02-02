$(document).ready(function (){
    if(CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }

    $("#colab_matricula").mask('000.000', {reverse: true});
    
});

function beforeSendValidate(currentState, nextStage){
    var msg = "";

    if(CURRENT_STATE === 1 || CURRENT_STATE === 0){
        if($('input[name="colab_nome"]').val() == ""){
            msg += "É necessário preencher o campo nome.<br>";
        }
        if($('input[name="colab_setor"]').val() == ""){
            msg += "É necessário selecionar um setor.<br>";
        }
        if($('input[name="colab_matricula"]').val() == ""){
            msg += "É necessário preencher o campo matricula.<br>";
        }

        
    } else if (CURRENT_STATE === 2 ){

    }

};