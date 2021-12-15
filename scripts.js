const inputGroup = id => {
    const search = document.querySelector(`${id} .search`);
    const box = document.querySelector(`${id} .box`);
    const states = document.querySelector(`${id} .states`);
    let linkApi = '';
    
    window.onload = () => {
        fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(response => response.json())
        .then(data => {
            data.map(state => {
                const option = document.createElement('option');
                option.setAttribute('value', state.sigla)
                option.innerHTML = state.sigla
                states.appendChild(option)
            })
        })
    };

    const selectState = state => {
        search.classList.remove('disabled');
        linkApi = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`;
    }
    
    const searchPlaces = searchText => {
        fetch(linkApi)
        .then(response => response.json())
        .then(data => {
            let matches = data.filter(cities => {
                const regex = new RegExp(`^${searchText}`, 'gi')
                return cities.nome.match(regex)
            })
    
            if(searchText.length === 0){
                matches = [];
                box.innerHTML = ''; 
            }
            
            outputHtml(matches);
        })
    }
    
    const changeState = changeState => {
        search.value = changeState;
    }
    
    const outputHtml = matches => {
        if(matches.length > 0){
            const html = matches.map(match => `
                <a href="/" onclick="changeState('${match.nome}'); return false;"><li>${match.nome}</li></a>
            `)
            .join('');
    
            box.innerHTML = html; 
        }
    }
    
    search.addEventListener('input', () => searchPlaces(search.value));
    states.addEventListener('change', () => selectState(states.value));
}

inputGroup('#group-1');
inputGroup('#group-2');