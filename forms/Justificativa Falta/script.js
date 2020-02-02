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

    } else if (CURRENT_STATE === 2 ){

    }

    if(msg !== ''){
        throw(msg);
    }

};

/*function validaAnexo(){
    var arquivo_enviado = $("#enviar_arquivo").val();
    var ext_Permitidas = ['jpg', 'png', 'gif', 'pdf', 'txt', 'doc', 'docx'];
    console.log(arquivo_enviado.get(0).files[0].size);

    //funcao validando presença e extensao do arquivo....
    

    }

}*/