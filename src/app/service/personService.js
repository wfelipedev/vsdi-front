import Api from '../api'

export default class PersonService extends Api {
    constructor() {
        super('/person')
    }

    save(person, token) {
        return this.persist('/', person, token);
    }

    getAll(token) {
        return this.get('', token)
    }

    update(id, person, token) {
        return this.put(`/${id}/update`, person, token)
    }

    deletePerson(id, token) {
        return this.delete(`/${id}`, token)
    }

}