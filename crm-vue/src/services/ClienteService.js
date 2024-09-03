import axios from '../lib/axios';

export default {
    getAll() {
        return axios.get('/clientes');
    },
    addClient(data) {
        return axios.post('/clientes', data);
    },
    getClient(id){
        return axios.get(`/clientes/${id}`);
    },
    updateClient(id, data) {
        return axios.patch(`/clientes/${id}`, data);
    },
    deleteClient(id) {
        return axios.delete(`/clientes/${id}`);
    },
    changeStatus(id, data) {
        return axios.patch(`/clientes/${id}`, data);
    }

}