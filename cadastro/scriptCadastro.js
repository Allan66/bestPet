$(document).ready(function() {
    $("#cnpj").mask("99.999.999/9999-99");
});
$(document).ready(function() {
    $("#contato").mask("(99) 9999-9999")
});
$(document).ready(function() {
    $("#contato2").mask("(99) 9999-9999");
});

$(document).ready(function() {

    function limpa_formulário_cep() {

        $("#rua").val("");
        $("#bairro").val("");
        $("#cidade").val("");
        $("#uf").val("");
        $("#ibge").val("");
    }


    $("#cep").blur(function() {


        var cep = $(this).val().replace(/\D/g, '');


        if (cep != "") {

            var validacep = /^[0-9]{8}$/;


            if (validacep.test(cep)) {

                $("#rua").val("Buscando");
                $("#bairro").val("Buscando");
                $("#cidade").val("Buscando");
                $("#uf").val("Buscando");

                $.getJSON("https://viacep.com.br/ws/" + cep + "/json/?callback=?", function(dados) {

                    if (!("erro" in dados)) {
                        $("#rua").val(dados.logradouro);
                        $("#bairro").val(dados.bairro);
                        $("#cidade").val(dados.localidade);
                        $("#uf").val(dados.uf);
                    } else {

                        limpa_formulário_cep();
                        alert("CEP não encontrado.");
                    }
                });
            } else {

                limpa_formulário_cep();
                alert("Formato de CEP inválido.");
            }
        } else {
            limpa_formulário_cep();
        }
    });
});