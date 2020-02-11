$(document).ready(function(){
    if(CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }
    
    
    $("#colab_cpf").mask('000.000.000-00', {reverse: true});
    $("#colab_rg").mask('00.000.000-0', {reverse: true});
    $('#colab_matricula').mask('000.000', {reverse: true});
    var mySimpleCalendar = FLUIGC.calendar('#data_entrega_justificativa');
    mySimpleCalendar = FLUIGC.calendar.formatDate(new Date(), 'DD/MM/YYYY');

    if(CURRENT_STATE === 19){
        $('input[name="aceito"]').on('change', function () {
            if ($(this).val() === 'sim') {
                $('input[name="aceito_hidden"]').val('S');
            } else{
                $('input[name="aceito_hidden"]').val('N');
            }
        });
    } 
    

})



function beforeSendValidate(currentStage, nextStage){
    var msg = "";
    
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
        if($('input[name="colab_cpf"]').val() == "" || !validarCPF()){
            msg += "É necessário preencher o campo CPF.<br>";
        }
        if($('input[name="colab_rg"]').val() == "" || !validarRG()){
            msg += "É necessário preencher o campo RG.<br>";
        }

        //Validandoo checkboxes
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
        if(!$('input[name="aceito"]:checked').val()){
            msg += "Voce deve aceitar ou negar a justificativa";
        } 
    }
    if(msg !== ''){
        throw(msg);
    }

}

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
        
        //tentando utilizar metodo ao inves dessa montoeira de ifs
        checkboxSaves();

        
    } else if(CURRENT_STATE === 16){
        checkboxSaves();
        console.log("estou aqui" + CURRENT_STATE);
    }
}

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
    //checkbox aprovado
    if($('input[name="aceito_hidden"]').val() === 'S'){
        $('#aceito').attr('checked', 'checked');
    } else {
        $('#n_aceito').attr('checked', 'checked');
    }
}

function validarCPF() {	
    cpf = $('input[name="colab_cpf"]').val();
	cpf = cpf.replace(/[^\d]+/g,'');	
	if(cpf == ''){ return false;	}
	// Elimina CPFs invalidos conhecidos	
	if (cpf.length != 11 || 
		cpf == "00000000000" || 
		cpf == "11111111111" || 
		cpf == "22222222222" || 
		cpf == "33333333333" || 
		cpf == "44444444444" || 
		cpf == "55555555555" || 
		cpf == "66666666666" || 
		cpf == "77777777777" || 
		cpf == "88888888888" || 
		cpf == "99999999999"){
			return false;	}	
	// Valida 1o digito	
	add = 0;	
	for (i=0; i < 9; i ++)		
		add += parseInt(cpf.charAt(i)) * (10 - i);	
		rev = 11 - (add % 11);	
		if (rev == 10 || rev == 11)		
			rev = 0;	
		if (rev != parseInt(cpf.charAt(9)))		
			return false;		
	// Valida 2o digito	
	add = 0;	
	for (i = 0; i < 10; i ++)		
		add += parseInt(cpf.charAt(i)) * (11 - i);	
	rev = 11 - (add % 11);	
	if (rev == 10 || rev == 11)	
		rev = 0;	
	if (rev != parseInt(cpf.charAt(10)))
		return false;		
	return true;   
}

function validarRG(){
    
    var numero = $('input[name="colab_rg"]').val();
    numero = numero.replace(/[^\d]+/g,'');
    numero = numero.split("");
    tamanho = numero.length;
    vetor = new Array(tamanho);
    
   if(tamanho>=1)
   {
    vetor[0] = parseInt(numero[0]) * 2; 
   }
   if(tamanho>=2){
    vetor[1] = parseInt(numero[1]) * 3; 
   }
   if(tamanho>=3){
    vetor[2] = parseInt(numero[2]) * 4; 
   }
   if(tamanho>=4){
    vetor[3] = parseInt(numero[3]) * 5; 
   }
   if(tamanho>=5){
    vetor[4] = parseInt(numero[4]) * 6; 
   }
   if(tamanho>=6){
    vetor[5] = parseInt(numero[5]) * 7; 
   }
   if(tamanho>=7){
    vetor[6] = parseInt(numero[6]) * 8; 
   }
   if(tamanho>=8){
    vetor[7] = parseInt(numero[7]) * 9; 
   }
   if(tamanho>=9){
    vetor[8] = parseInt(numero[8]) * 100; 
   }
    
    total = 0;
    
   if(tamanho>=1){
    total += vetor[0];
   }
   if(tamanho>=2){
    total += vetor[1]; 
   }
   if(tamanho>=3){
    total += vetor[2]; 
   }
   if(tamanho>=4){
    total += vetor[3]; 
   }
   if(tamanho>=5){
    total += vetor[4]; 
   }
   if(tamanho>=6){
    total += vetor[5]; 
   }
   if(tamanho>=7){
    total += vetor[6];
   }
   if(tamanho>=8){
    total += vetor[7]; 
   }
   if(tamanho>=9){
    total += vetor[8]; 
   }
    
    
    resto = total % 11;
   if(resto!=0){
        return false;
   }
   else{
        return true;
   }
}

function checkboxSaves(){
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