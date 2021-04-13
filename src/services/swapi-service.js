export default class SwapiService {
    constructor() {
        this._apiBase = 'https://swapi.dev/api'
        this._imageBase = 'https://starwars-visualguide.com/assets/img'

        this.getResource = async (url) => {
            const res = await fetch(`${this._apiBase}${url}`)
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, recieved ${res.status}`)
            }
            return await res.json()
        }

        this.getPeople = async () => {
            const res = await this.getResource(`/people/`)
            return res.results.map(this._transormPerson)
        }


        this._transormPerson = (person) => {
            return {
                id: this._extractId(person),
                name: person.name,
                gender: person.gender,
                birthYear: person.birth_year,
                eyeColor: person.eye_color,
                getImgURL: this.getPersonImage
            }
        }

        this._extractId = (item) => {
            const idRegExp = /\/(\d*)\/$/
            return parseInt(item.url.match(idRegExp)[1])
        }

        this.getPersonImage = (id) => {
            return `${this._imageBase}/characters/${id}.jpg`
        }
    }
}