$(document).ready(function () {
    if (CURRENT_STATE !== null){
        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }

    $('.money').maskMoney();

    if (CURRENT_STATE === 2) {
        $('input[name="aprovado"]').on('change', function () {
            if ($(this).val() === 'sim') {
                $('input[name="aprovado_hidden"]').val('S');

                if ($('input[name="vr"]:checked').val() === 'vr') {
                    $('#div_va_vr_inputs').show();
                    $('#input_vr').show();
                }
                if ($('input[name="va"]:checked').val() === 'va') {
                    $('#div_va_vr_inputs').show();
                    $('#input_va').show();
                }
                if ($('input[name="vt"]:checked').val() === 'vt') {
                    $('#div_vt_inputs').show();
                }
            } else {
                $('input[name="aprovado_hidden"]').val('N');

                $('#div_vt_inputs').hide();
                $('#div_va_vr_inputs').hide();
            }
        });
    }
});

function beforeSendValidate(currentStage, nextStage) {
    var msg = "";

    if (CURRENT_STATE === 1 || CURRENT_STATE === 0) {
        if ($('input[name="emp_cpf"]').val() == "") {
            msg += "É necessário preencher o campo cpf.<br>";
        }
        if ($('input[name="emp_nome"]').val() == "") {
            msg += "É necessário preencher o campo Nome do Empregado.<br>";
        }
        if (!$('input[name="vt"]:checked').val() && !$('input[name="va"]:checked').val() && !$('input[name="vr"]:checked').val()) {
            msg += "Selecione um dos Benefícios";
        }

        // Coloca os valores dos checknoxes em um hidden
        if ($('input[name="vr"]:checked').val() === 'vr') {
            $('input[name="vr_hidden"]').val('vr');
        }
        if ($('input[name="va"]:checked').val() === 'va') {
            $('input[name="va_hidden"]').val('va');
        }
        if ($('input[name="vt"]:checked').val() === 'vt') {
            $('input[name="vt_hidden"]').val('vt');
        }
    } else if (CURRENT_STATE === 2) {
        if (!($('input[name="aprovado"]:checked').val())) {
            msg += "É necessário aprovar ou reprovar a solicitação";
        }
        if ($('input[name="vr"]').val() === 'vr') {
            if ($('input[name="val_va"]').val() == '' && $('input[name="va"]:checked').val() === 'va') {
                msg += "É necessário preencher o campo Valor do VA.<br>";
            }
            if ($('input[name="emp_vt"]').val() == "" && $('input[name="vt"]:checked').val() === 'vt') {
                msg += "É necessário preencher o Cod. do VT.<br>";
            }
            if ($('input[name="saldo"]').val() == "" && $('input[name="vt"]:checked').val() === 'vt') {
                msg += "É necessário preencher o saldo a ser carregado.<br>";
            }
        }

        var valorBeneficio = Number($('#val_total').val().split('.').join('').split(',').join('.'));
        var valorVA = Number($('#val_va').val().split('.').join('').split(',').join('.'));
        var valorVR = Number($('#val_vr').val().split('.').join('').split(',').join('.'));

        if ((valorVR + valorVA) !== valorBeneficio) {
            msg += "O valor do VA/VR deve(m) somar o valor do benefìcio.<br>";
        }
    } else if (CURRENT_STATE === 8) {
        if (!($('input[name="providenciado"]:checked').val())) {
            msg += "É necessário marcar se a solicitação foi providenciada.";
        }
    }

    if (msg !== "") {
        throw (msg);
    }
}

function escondeCampos(CURRENT_STATE) {
    if (CURRENT_STATE === 1 || CURRENT_STATE === 0) {
        $('#beneficio').hide();
        $('#aprovacao').hide();
    } else if (CURRENT_STATE === 2) {
        $('#aprovacao').hide();

        $('.input_empregado').attr('readonly', 'readonly');
        $('#vtcheckbox').attr('disabled', 'disabled');
        $('#vacheckbox').attr('disabled', 'disabled');
        $('#vrcheckbox').attr('disabled', 'disabled');

        // Marca os checkboxes que foram marcados anteriormente
        if ($('input[name="vr_hidden"]').val() !== "") {
            $('input[name="vr"]').attr("checked", "checked");
        }
        if ($('input[name="va_hidden"]').val() !== "") {
            $('input[name="va"]').attr("checked", "checked");
        }
        if ($('input[name="vt_hidden"]').val() !== "") {
            $('input[name="vt"]').attr("checked", "checked");
        }
    } else if (CURRENT_STATE === 8) {
        // Marca os checkboxes que foram marcados anteriormente
        if ($('input[name="vr_hidden"]').val() !== "") {
            $('input[name="vr"]').attr("checked", "checked");
        }
        if ($('input[name="va_hidden"]').val() !== "") {
            $('input[name="va"]').attr("checked", "checked");
        }
        if ($('input[name="vt_hidden"]').val() !== "") {
            $('input[name="vt"]').attr("checked", "checked");
        }

        // Marca o radio aprovado
        if ($('input[name="aprovado_hidden"]').val() === 'S') {
            $('#aprovados').attr('checked', 'checked');
        } else {
            $('#aprovadon').attr('checked', 'checked');
        }

        if ($('input[name="vt"]:checked').val() === 'vt') {
            $('#div_vt_inputs').show();
            $('#cod_vt').attr('readonly', 'readonly');
            $('#saldo').attr('readonly', 'readonly');
        }

        if ($('input[name="vr"]:checked').val() === 'vr' || $('input[name="va"]:checked').val() === 'va') {
            $('#div_va_vr_inputs').show();
            $('#val_total').attr('readonly', 'readonly');

            if ($('input[name="va"]:checked').val() === 'va') {
                $('#input_va').show();
                $('#val_va').attr('readonly', 'readonly')
            }
            if ($('input[name="vt"]:checked').val() === 'vt') {
                $('#val_vr').show();
                $('#val_vr').attr('readonly', 'readonly')
            }
        }

        $('.input_empregado').attr('readonly', 'readonly');

        $('#vtcheckbox').attr('disabled', 'disabled');
        $('#vacheckbox').attr('disabled', 'disabled');
        $('#vrcheckbox').attr('disabled', 'disabled');
        $('input[name="aprovado"]').attr('disabled', 'disabled');
        
    }
}

function showAllDoc() {
    // Marca os checkboxes das solicitações
    if ($('input[name="vr_hidden"]').val() !== "") {
        $('input[name="vr"]').attr("checked", "checked");
    }
    if ($('input[name="va_hidden"]').val() !== "") {
        $('input[name="va"]').attr("checked", "checked");
    }
    if ($('input[name="vt_hidden"]').val() !== "") {
        $('input[name="vt"]').attr("checked", "checked");
    }

    // Marca o radio aprovado
    if ($('input[name="aprovado_hidden"]').val() === 'S') {
        $('#aprovados').attr('checked', 'checked');

        // Mostra os campos va vr no aprovado
        if ($('input[name="vr_hidden"]').val() !== '' || $('input[name="va_hidden"]').val() !== '') {
            $('#div_va_vr_inputs').show();

            if ($('input[name="va_hidden"]').val() !== '') {
                $('#input_va').show();
            }
            if ($('input[name="vr_hidden"]').val() !== '') {
                $('#input_vr').show();
            }
        }

        // Mostra os campos vt
        if ($('input[name="vt_hidden"]').val() !== '') {
            $('#div_vt_inputs').show();
        }
    } else {
        $('#aprovadon').attr('checked', 'checked');
    }
}