const $main = document.querySelector('main')
const $links = document.querySelector('.links')

const loadPokemons = async (url) => {
    try {
        $main.innerHTML = '<img class="loader" src="./assets/loader.svg" alt="Loading...">'

        let res = await fetch(url)
        if(!res.ok) throw { status: res.status, statusText: res.statusText }
        let json = await res.json()
        let $template = ''
        let $prevLink = ''
        let $nextLink = ''

        for (result of json.results) {
            try {
                let res = await fetch(result.url)
                if(!res.ok) throw { status: res.status, statusText: res.statusText }
                let json = await res.json()
                $template += `
                <figure>
                <img src="${json.sprites.front_default}">
                <figcaption>${(json.name).toUpperCase()}</figcaption>
                </figure>`

    
            } catch (err) {
                let msg = err.statusText || 'Ha ocurrido un error'
                $template += `
                <figure>
                <figcaption>Error ${err.status}: ${msg}</figcaption>
                </figure>`
            }
        }

        $main.innerHTML = $template
        $prevLink = json.previous? `<a href="${json.previous}">Previous</a>`: ''
        $nextLink = json.next? `<a href="${json.next}">Next</a>`: ''
        $links.innerHTML = $prevLink + $nextLink


    } catch (err) {
        let msg = err.statusText || 'Ha ocurrido un error'
        $main.innerHTML = `<p>Error ${err.status}: ${msg}</p>`
    }

}

const pokeURL = 'https://pokeapi.co/api/v2/pokemon/'



document.addEventListener("DOMContentLoaded", () => loadPokemons(pokeURL))

document.addEventListener('click', e => {
    if(e.target.matches('.links a')) {
        e.preventDefault()
        loadPokemons(e.target.href)
    }
})
