$(document).ready(function(){
    if(CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }
    
    //$("#colab_matricula").mask('000.000');
    $("#data_entrega_justificativa").mask('00/00/0000');

    if(CURRENT_STATE === 19){
        $('input[name="aceito"]').on('change', function () {
            if ($(this).val() === 'sim') {
                $('input[name="aceito_hidden"]').val('S');
            } else{
                $('input[name="aceito_hidden"]').val('N');
            }
        });
    }
    
});



function beforeSendValidate(currentStage, nextStage){
    var msg = "";
    var ext_Permitidas = ['jpg', 'png', 'gif', 'pdf', 'txt', 'doc', 'docx'];
    
    if(CURRENT_STATE === 4 || CURRENT_STATE === 0){
        //validando inputs
        //console.log("entrei no before" + currentStage);
        if($('input[name="colab_nome"]').val() == ""){
            msg += "É necessário preencher o campo nome.<br>";
        }
        if($('input[name="colab_setor"]').val() == ""){
            msg += "É necessário selecionar um setor.<br>";
        }
        if($('input[name="colab_matricula"]').val() == ""){
            msg += "É necessário preencher o campo matricula.<br>";
        }
        /*if(typeof ext_Permitidas.find(function(ext){
            
            return $('#arquivo_enviado').val().split('.').pop() == ext; }) == 'undefined'){
            msg += "Arquivo invalido. verifique se o arquivo é jpg, png, gif, pdf, txt, doc, docx.<br>";
        }*/

        //guarda a escolha dos checkbox 
        if($('input[name="atraso"]:checked').val() === 'atraso'){
            $('input[name="atraso_hidden"]').val('atraso');
        }
        if($('input[name="saida_durante_expediente"]:checked').val() === 'saida_durante_expediente'){
            $('input[name="saidurante_hidden"]').val('saida_durante_expediente');
        }
        if($('input[name="saida_antecipada"]:checked').val() === 'saida_antecipada'){
            $('input[name="saiantes_hidden"]').val('saida_antecipada');
        }
        if($('input[name="falta_saida_meio_periodo"]:checked').val() === 'falta_saida_meio_periodo'){
            $('input[name="falmeio_hidden"]').val('falta_saida_meio_periodo');
        }
        if($('input[name="ausencia_marcacao_saida"]:checked').val() === 'ausencia_marcacao_saida'){
            $('input[name="outro_hidden"]').val('ausencia_marcacao_saida');
        }
        if($('input[name="folga"]:checked').val() === 'folga'){
            $('input[name="folga_hidden"]').val('atraso');
        }
        if($('input[name="falta_ausencia_integral"]:checked').val() === 'falta_ausencia_integral'){
            $('input[name="falintegral_hidden"]').val('falta_ausencia_integral');
        }
    } else if(CURRENTE_STATE === 19){
        //valida a justificativa
        if(!($('input[name="aceito"]:unchecked').val())){
            msg += "Voce deve aceitar ou negar a justificativa";
        } 
    }
    if(msg !== ''){
        throw(msg);
    }

};

function escondeCampos(CURRENT_STATE){
    if(CURRENT_STATE === 4|| CURRENT_STATE === 0){
        $('#justificativa').hide();
        $('#registro').hide();
    } else if (CURRENT_STATE === 19){
        $('#registro').hide();

        $('.input_colab').attr('readonly', 'readonly');
        $('#atraso_checkbox').attr('disabled', 'disabled');
        $('#saidurante_checkbox').attr('disabled', 'disabled');
        $('#saiantes_checkbox').attr('disabled', 'disabled');
        $('#faltameio_checkbox').attr('disabled', 'disabled');
        $('#n_marca_checkbox').attr('disabled', 'disabled');
        $('#outro_checkbox').attr('disabled', 'disabled');
        $('#folga_checkbox').attr('disabled', 'disabled');
        $('#faltinte_checkbox').attr('disabled', 'disabled');
        $('#enviar_arquivo').attr('disabled', 'disabled');
        


        //utilizando os checkbox guardados
        if($('input[name="atraso"]').val() === ""){
            $('input[name="atraso_hidden"]').attr("checked", "checked");
        }
        if($('input[name="saida_durante_expediente"]').val() === ""){
            $('input[name="saidurante_hidden"]').attr("checked", "checked");
        }
        if($('input[name="saida_antecipada"]').val() === ""){
            $('input[name="saiantes_hidden"]').attr("checked", "checked");
        }
        if($('input[name="falta_saida_meio_periodo"]').val() === ""){
            $('input[name="falmeio_hidden"]').attr("checked", "checked");
        }
        if($('input[name="ausencia_marcacao_saida"]').val() === ""){
            $('input[name="ausencia_hidden"]').attr("checked", "checked");
        }
        if($('input[name="outro"]').val() === ""){
            $('input[name="outro_hidden"]').attr("checked", "checked");
        }
        if($('input[name="folga"]').val() === ""){
            $('input[name="folga_hidden"]').attr("checked", "checked");
        }
        if($('input[name="falta_ausencia_integral"]').val() === ""){
            $('input[name="falintegral_hidden"]').attr("checked", "checked");
        }
    } else if(CURRENT_STATE === 19){

        //Marca os checkbox escolhidos
        if($('input[name="atraso"]').val() === ""){
            $('input[name="atraso_hidden"]').attr("checked", "checked");
        }
        if($('input[name="saida_durante_expediente"]').val() === ""){
            $('input[name="saidurante_hidden"]').attr("checked", "checked");
        }
        if($('input[name="saida_antecipada"]').val() === ""){
            $('input[name="saiantes_hidden"]').attr("checked", "checked");
        }
        if($('input[name="falta_saida_meio_periodo"]').val() === ""){
            $('input[name="falmeio_hidden"]').attr("checked", "checked");
        }
        if($('input[name="ausencia_marcacao_saida"]').val() === ""){
            $('input[name="ausencia_hidden"]').attr("checked", "checked");
        }
        if($('input[name="outro"]').val() === ""){
            $('input[name="outro_hidden"]').attr("checked", "checked");
        }
        if($('input[name="folga"]').val() === ""){
            $('input[name="folga_hidden"]').attr("checked", "checked");
        }
        if($('input[name="falta_ausencia_integral"]').val() === ""){
            $('input[name="falintegral_hidden"]').attr("checked", "checked");
        }
    }
};

function showAllDoc(){
    if($('input[name="atraso_hidden"]').val() !== ""){
        $('input[name="atraso"]').attr("checked", "checked");
    } 
    if($('input[name="saidurante_hidden"]').val() !== ""){
        $('input[name="saida_durante_expediente"]').attr("checked", "checked");
    }
    if($('input[name="saidantes_hidden"]').val() !== ""){
        $('input[name="saida_antecipada"]').attr("checked", "checked");
    }
    if($('input[name="falmeio_hidden"]').val() !== ""){
        $('input[name="falta_saida_meio_periodo"]').attr("checked", "checked");
    }
    if($('input[name="ausen"]').val() !== ""){
        $('input[name="saida_durante_expediente"]').attr("checked", "checked");
    }

    //checkbox aprovado
    if($('input[name="aceito_hidden"]').val() === 'S'){
        $('#aceito').attr('checked', 'checked');
    } else {
        $('#n_aceito').attr('checked', 'checked');
    }
};