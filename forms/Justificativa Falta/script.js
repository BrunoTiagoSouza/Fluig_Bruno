$(document).ready(function(){
    if(CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }
    
    
    //$("#data_entrega_justificativa").mask('00/00/0000');
    $('#colab_matricula').mask('000.000', {reverse: true});
    var mySimpleCalendar = FLUIGC.calendar('#data_entrega_justificativa');

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
        
        if($('input[name="colab_nome"]').val() == ""){
            msg += "É necessário preencher o campo nome.<br>";
        }
        if($('input[name="colab_setor"]').val() === ""){
            msg += "É necessário selecionar um setor.<br>";
        }
        if($('input[name="colab_matricula"]').val() == ""){
            msg += "É necessário preencher o campo matricula.<br>";
        }
        /*if(typeof ext_Permitidas.find(function(ext){
            
            return $('#arquivo_enviado').val().split('.').pop() == ext; }) == 'undefined'){
            msg += "Arquivo invalido. verifique se o arquivo é jpg, png, gif, pdf, txt, doc, docx.<br>";
        }*/

        //Vlido checkbox
        if(!$('input[name="atraso"]:checked').val() && !$('input[name="saida_durante_expediente"]:checked').val() && !$('input[name="saida_antecipada"]:checked').val() && !$('input[name="falta_saida_meio_periodo"]:checked').val() && !$('input[name="ausencia_marcacao_saida"]:checked').val() && !$('input[name="outro"]:checked').val() && !$('input[name="folga"]:checked').val() && !$('input[name="falta_ausencia_integral"]:checked').val() && !$('input[name="data_entrega_justificativa"]').val()){
            msg += "Você deve selecionar um motivo.<br>";
        }

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
            $('input[name="ausencia_hidden"]').val('ausencia_marcacao_saida');
        }
        if($('input[name="outro"]:checked').val() === 'outro'){
            $('input[name="outro_hidden"]').val('outro');
        }
        if($('input[name="folga"]:checked').val() === 'folga'){
            $('input[name="folga_hidden"]').val('folga');
        }
        if($('input[name="falta_ausencia_integral"]:checked').val() === 'falta_ausencia_integral'){
            $('input[name="falintegral_hidden"]').val('falta_ausencia_integral');
        }
        if($('input[name="data_entrega_justificativa"]').val() === 'data_entrega_justificativa'){
            $('input[name="data_entrega_hidden"]').val('data_entrega_justificativa');
        }
    } else if(CURRENT_STATE === 19){
        //valida a justificativa
        console.log("if do estado " + currentStage);
        if(!$('input[name="aceito"]:checked').val()){
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
        $('#falinte_checkbox').attr('disabled', 'disabled');
        $('#enviar_arquivo').attr('disabled', 'disabled');
        $('#data_entrega_justificativa').attr('disabled','disabled');
        


        //utilizando os checkbox guardados
        if($('input[name="atraso_hidden"]').val() !== ""){
            $('input[name="atraso"]').attr("checked", "checked");
        }
        if($('input[name="saidurante_hidden"]').val() !== ""){
            $('input[name="saida_durante_expediente"]').attr("checked", "checked");
        }
        if($('input[name="saiantes_hidden"]').val() !== ""){
            $('input[name="saida_antecipada"]').attr("checked", "checked");
        }
        if($('input[name="falmeio_hidden"]').val() !== ""){
            $('input[name="falta_saida_meio_periodo"]').attr("checked", "checked");
        }
        if($('input[name="ausencia_hidden"]').val() !== ""){
            $('input[name="ausencia_marcacao_saida"]').attr("checked", "checked");
        }
        if($('input[name="outro_hidden"]').val() !== ""){
            $('input[name="outro"]').attr("checked", "checked");
        }
        if($('input[name="folga_hidden"]').val() !== ""){
            $('input[name="folga"]').attr("checked", "checked");
        }
        if($('input[name="falintegral_hidden"]').val() !== ""){
            $('input[name="falta_ausencia_integral"]').attr("checked", "checked");
        }
        if($('input[name="data_justificativa_hidden"]').val() !== ""){
            $('input[name="data_justificativa"]').val('data_justificativa');
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