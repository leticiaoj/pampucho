function calcularCompatibilidade() {
    const nome1 = document.getElementById('nome1').value.trim().toLowerCase();
    const nome2 = document.getElementById('nome2').value.trim().toLowerCase();

    const validNamesNome1 = /^(pedro|pedro henrique)$/;
    const validNamesNome2 = /^(leticia|letícia)$/;

    if (validNamesNome1.test(nome1) && validNamesNome2.test(nome2) && nome1 !== nome2) {
        document.getElementById('resultado').classList.add('hidden');
        document.getElementById('carregando').classList.remove('hidden');

        setTimeout(() => {
            document.getElementById('carregando').classList.add('hidden');
            document.getElementById('resultado').classList.remove('hidden');
            document.querySelector('.porcentagem').textContent = '100%';
            document.querySelector('.coracao').classList.add('calculado');
        }, 3000);

    } else {
        alert('Por favor, insira os nomes "Pedro" ou "Pedro Henrique" para o primeiro campo e "Leticia" ou "Letícia" para o segundo campo.');
    }
}
