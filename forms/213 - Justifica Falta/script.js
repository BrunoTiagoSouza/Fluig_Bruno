$(document).ready(function () {
    if (CURRENT_STATE !== null) {
        var myCalendar = FLUIGC.calendar('.date-picker', {
            useCurrent: false
        });

        $('#file_atestado').fileupload({
            dataType: 'json',
            done: function (e, data) {
                $.each(data.result.files, function (index, file) {
                    $.ajax({
                        async: true,
                        type: "POST",
                        contentType: "application/json",
                        url: '/api/public/ecm/document/createDocument',
                        data: JSON.stringify({
                            "description": file.name,
                            "parentId": 49,
                            "additionalComments": "",
                            "attachments": [{
                                "fileName": file.name
                            }],
                        }),
                        error: function (data) {
                            FLUIGC.toast({
                                title: '',
                                message: "Falha ao enviar - " + file.name,
                                type: 'danger'
                            });
                        },
                        success: function (data) {
                            FLUIGC.toast({
                                title: '',
                                message: "Arquivo enviado com sucesso!",
                                type: 'success'
                            });

                            $('input[name="file_atestado_hidden"]').val($('input[name="file_atestado_hidden"]').val() + data.content.id + "*" + data.content.description + "|");
                            $('#row-file-anexos').append('<div class="row" id="' + data.content.id + '">'
                                + '<div class="col-md-12">'
                                + '<a onclick="showFile(\'' + data.content.id + '\')"><i class="fluigicon fluigicon-eye-open icon-sm show-file-icon"></i></a>'
                                + '<a onclick="deleteFile(\'' + data.content.id + '\',\'file_atestado_hidden\')"><i class="fluigicon fluigicon-trash icon-sm file-trash-icon"></i></a>'
                                + '<span>' + data.content.description + '</span></div></div>');
                        },
                    });
                });
            }
        });

        if (CURRENT_STATE === 19) {
            $('input[name="aceito"]').on('change', function () {
                if ($(this).val() === 'sim') {
                    $('input[name="aceito_hidden"]').val('S');
                } else {
                    $('input[name="aceito_hidden"]').val('N');
                }
            });
        }

        escondeCampos(CURRENT_STATE);
    } else {
        showAllDoc();
    }
});

function showFile(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json",
        url: `/api/public/2.0/documents/getDownloadURL/${id}`,
        success: function (data) {
            window.open(data.content);
        },
        error: function (data) {
            FLUIGC.toast({
                title: '',
                message: "Falha ao visualizar aquivo!",
                type: 'danger'
            });
        }
    });
}

function deleteFile(id, hidden) {
    $.ajax({
        async: true,
        type: "POST",
        contentType: "application/json",
        url: '/api/public/2.0/documents/deleteDocument/' + id,
        error: function (data) {
            FLUIGC.toast({
                title: '',
                message: "Falha ao deletar aquivo ",
                type: 'danger'
            });
        },
        success: function (data) {
            FLUIGC.toast({
                title: '',
                message: "Arquivo removido com sucesso!",
                type: 'success'
            });

            $('#' + id).remove();

            var anexos = '';
            var inputHidden = $('input[name="' + hidden + '"]').val();
            var inputSplit = inputHidden.split('|');

            $('input[name="' + hidden + '"]').val('');

            $(inputSplit).each(function (index, val) {
                var split = val.split('*');
                if (split[0] !== id && split[1] !== undefined) {
                    anexos += split[0] + '*' + split[1] + '|';
                }
            });

            $('input[name="' + hidden + '"]').val(anexos);
        },
    });
}

function beforeSendValidate(currentStage, nextStage) {
    var msg = "";

    if (CURRENT_STATE === 4 || CURRENT_STATE === 0) {
        //validando inputs
        if ($('input[name="colab_nome"]').val() == "") {
            msg += "É necessário preencher o campo <strong>Nome</strong>.<br>";
        }
        if ($('input[name="colab_setor"]').val() === "") {
            msg += "É necessário selecionar um setor.<br>";
        }
        if ($('input[name="colab_matricula"]').val() == "") {
            msg += "É necessário preencher o campo matricula.<br>";
        }
        if ($('input[name="colab_cpf"]').val() == "") {
            msg += "É necessário preencher o campo CPF.<br>";
        }

        //Validandoo checkboxes
        if (!$('input[name="atraso"]:checked').val() && !$('input[name="saida_durante_expediente"]:checked').val() && !$('input[name="saida_antecipada"]:checked').val() && !$('input[name="falta_saida_meio_periodo"]:checked').val() && !$('input[name="ausencia_marcacao_saida"]:checked').val() && !$('input[name="outro"]:checked').val() && !$('input[name="folga"]:checked').val() && !$('input[name="falta_ausencia_integral"]:checked').val() && !$('input[name="data_entrega_justificativa"]').val()) {
            msg += "Você deve selecionar um motivo.<br>";
        }

        //guarda a escolha dos checkbox 
        if ($('input[name="atraso"]:checked').val() === 'atraso') {
            $('input[name="atraso_hidden"]').val('atraso');
        }
        if ($('input[name="saida_durante_expediente"]:checked').val() === 'saida_durante_expediente') {
            $('input[name="saidurante_hidden"]').val('saida_durante_expediente');
        }
        if ($('input[name="saida_antecipada"]:checked').val() === 'saida_antecipada') {
            $('input[name="saida_antecipada_hidden"]').val('saida_antecipada');
        }
        if ($('input[name="falta_saida_meio_periodo"]:checked').val() === 'falta_saida_meio_periodo') {
            $('input[name="falmeio_hidden"]').val('falta_saida_meio_periodo');
        }
        if ($('input[name="ausencia_marcacao_saida"]:checked').val() === 'ausencia_marcacao_saida') {
            $('input[name="ausencia_hidden"]').val('ausencia_marcacao_saida');
        }
        if ($('input[name="outro"]:checked').val() === 'outro') {
            $('input[name="outro_hidden"]').val('outro');
        }
        if ($('input[name="folga"]:checked').val() === 'folga') {
            $('input[name="folga_hidden"]').val('folga');
        }
        if ($('input[name="falta_ausencia_integral"]:checked').val() === 'falta_ausencia_integral') {
            $('input[name="falintegral_hidden"]').val('falta_ausencia_integral');
        }
        if ($('input[name="data_entrega_justificativa"]').val() === 'data_entrega_justificativa') {
            $('input[name="data_entrega_hidden"]').val('data_entrega_justificativa');
        }
    } else if (CURRENT_STATE === 19) {
        //valida a justificativa
        if (!$('input[name="aceito"]:checked').val()) {
            msg += "Voce deve aceitar ou negar a justificativa";
        }
    }
    if (msg !== '') {
        throw (msg);
    }

}

function escondeCampos(CURRENT_STATE) {
    if (CURRENT_STATE === 4 || CURRENT_STATE === 0) {
        $('#justificativa').hide();
        $('#registro').hide();
    } else if (CURRENT_STATE === 19) {
        $('#registro').hide();
        checkboxSaves();
        $('.input_colab').attr('readonly', 'readonly');
        $('#atraso_checkbox').attr('disabled', 'disabled');
        $('#saida_durante_expediente').attr('disabled', 'disabled');
        $('#saida_antecipada').attr('disabled', 'disabled');
        $('#falta_saida_meio_periodo').attr('disabled', 'disabled');
        $('#ausencia_marcacao_saida').attr('disabled', 'disabled');
        $('#outro').attr('disabled', 'disabled');
        $('#folga').attr('disabled', 'disabled');
        $('#falta_ausencia_integral').attr('disabled', 'disabled');
        $('#file_atestado').attr('disabled', 'disabled');
        $('#data_entrega_justificativa').attr('disabled', 'disabled');

        
        


    } else if (CURRENT_STATE === 14) {


        checkboxSaves();

        if ($('input[name="aceito_hidden"]').val() === 'S') {
            $('#aceito').attr('checked', 'checked');
        } else {
            $('#n_aceito').attr('checked', 'checked');
        }


        $('.input_colab').attr('readonly', 'readonly');
        $('#atraso_checkbox').attr('disabled', 'disabled');
        $('#saida_durante_expediente').attr('disabled', 'disabled');
        $('#saida_antecipada').attr('disabled', 'disabled');
        $('#falta_saida_meio_periodo').attr('disabled', 'disabled');
        $('#ausencia_marcacao_saida').attr('disabled', 'disabled');
        $('#outro').attr('disabled', 'disabled');
        $('#folga').attr('disabled', 'disabled');
        $('#falta_ausencia_integral').attr('disabled', 'disabled');
        $('#file_atestado').attr('disabled', 'disabled');
        $('#data_entrega_justificativa').attr('disabled', 'disabled');
        $('#aceito').attr('disabled', 'disabled');
        $('#n_aceito').attr('disabled', 'disabled');


    }
}

function showAllDoc() {
    if ($('input[name="atraso_hidden"]').val() !== "") {
        $('input[name="atraso"]').attr("checked", "checked");
    }
    if ($('input[name="saidurante_hidden"]').val() !== "") {
        $('input[name="saida_durante_expediente"]').attr("checked", "checked");
    }
    if ($('input[name="saidantes_hidden"]').val() !== "") {
        $('input[name="saida_antecipada"]').attr("checked", "checked");
    }
    if ($('input[name="falmeio_hidden"]').val() !== "") {
        $('input[name="falta_saida_meio_periodo"]').attr("checked", "checked");
    }
    if ($('input[name="ausencia_hidden"]').val() !== "") {
        $('input[name="ausencia_marcacao_saida"]').attr("checked", "checked");
    }
    if ($('input[name="outro_hidden"]').val() !== "") {
        $('input[name="outro"]').attr("checked", "checked");
    }
    if ($('input[name="folga_hidden"]').val() !== "") {
        $('input[name="folga"]').attr("checked", "checked");
    }
    if ($('input[name="falintegral_hidden"]').val() !== "") {
        $('input[name="falta_ausencia_integral"]').attr("checked", "checked");
    }
    //checkbox aprovado
    if ($('input[name="aceito_hidden"]').val() === 'S') {
        $('#aceito').attr('checked', 'checked');
    } else {
        $('#n_aceito').attr('checked', 'checked');
    }
}

function checkboxSaves() {
    //utilizando os checkbox guardados
    if ($('input[name="atraso_hidden"]').val() !== "") {
        $('input[name="atraso"]').attr("checked", "checked");
    }
    if ($('input[name="saidurante_hidden"]').val() !== "") {
        $('input[name="saida_durante_expediente"]').attr("checked", "checked");
    }
    if ($('input[name="saida_antecipada_hidden"]').val() !== "") {
        $('input[name="saida_antecipada"]').attr("checked", "checked");
    }
    if ($('input[name="falmeio_hidden"]').val() !== "") {
        $('input[name="falta_saida_meio_periodo"]').attr("checked", "checked");
    }
    if ($('input[name="ausencia_hidden"]').val() !== "") {
        $('input[name="ausencia_marcacao_saida"]').attr("checked", "checked");
    }
    if ($('input[name="outro_hidden"]').val() !== "") {
        $('input[name="outro"]').attr("checked", "checked");
    }
    if ($('input[name="folga_hidden"]').val() !== "") {
        $('input[name="folga"]').attr("checked", "checked");
    }
    if ($('input[name="falintegral_hidden"]').val() !== "") {
        $('input[name="falta_ausencia_integral"]').attr("checked", "checked");
    }
    if ($('input[name="data_justificativa_hidden"]').val() !== "") {
        $('input[name="data_justificativa"]').val('data_justificativa');
    }
}