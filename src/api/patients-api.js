import request from 'superagent';

const API = 'http://58f3729d972b111200465f26.mockapi.io/api';
export class PatientsApi {

    static get(callback, id) {
        request.get(API + '/patients' + '/' + id)
            .end(callback);
    }

    static getBlank() {
        return {
            id: 0,
            firstName: "",
            lastName: "",
            email: "",
            phone: 0,
            bdate: "",
            meds: []
        };
    }

    static getAll(callback) {
        request.get(API + '/patients')
            .end(callback);
    }

    static search(term, callback) {
        request.get(API + '/patients')
            .query({search: term})
            .end(callback);
    }

    static create(patient, callback) {
        request.post(API + '/patients')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(patient))
            .end(callback);
    }


    static update(patient, callback) {
        request.put(API + '/patients' + '/' + patient.id)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(patient))
            .end(callback);
    }

    static remove(patient, callback) {
        request.delete(API + '/patients' + '/' + patient.id)
            .set('Content-Type', 'application/json')
            .send(JSON.stringify(patient))
            .end(callback);
    }

    static prescribeMed(patient, med, callback) {
        request.post(API + '/patients' + '/' + patient.id + '/meds')
            .set('Content-Type', 'application/json')
            .send(JSON.stringify({
                medId: med.id,
                medName: med.productName
            }))
            .end(callback);
    }

}