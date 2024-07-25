function calculateCompatibility() {
    const name1 = document.getElementById('name1').value.trim().toLowerCase();
    const name2 = document.getElementById('name2').value.trim().toLowerCase();
    
    const validNames = ['pedro', 'leticia'];
    
    if (validNames.includes(name1) && validNames.includes(name2) && name1 !== name2) {
        document.querySelector('.percentage').textContent = '100%';
    } else {
        alert('Por favor, insira os nomes "Pedro" e "Leticia".');
    }
}