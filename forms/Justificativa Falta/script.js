$(document).ready(function (){
    if(CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }

    $("#colab_matricula").mask('000.000');

    if(CURRENTE_STATE === 2){
        
    }
    
});

function beforeSendValidate(numState, nextState){
    var msg = "";
    var ext_Permitidas = ['jpg', 'png', 'gif', 'pdf', 'txt', 'doc', 'docx'];

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
        if(typeof ext_Permitidas.find(function(ext){
            return arquivo_enviado.val().split('.').pop() == ext; }) == 'undefined'){
            //$('#resultado').text('Arquivo invalido');
            msg += "Arquivo invalido. verifique se o arquivo é jpg, png, gif, pdf, txt, doc, docx.<br>";
        }

    } else if (CURRENT_STATE === 14 ){
        msg += "Registro alterado!";
    }

    if(msg !== ''){
        throw(msg);
    }

};

function escondeCampos(CURRENT_STATE){
    if(CURRENT_STATE === 1 || CURRENT_STATE === 0){
        $('#justificativa').hide();
        $('#registro').hide();
    } else if (CURRENT_STATE === 5){
        $('#registro').hide();
    }
}