import request from 'superagent';

const API = 'http://58f3729d972b111200465f26.mockapi.io/api';
export class PatientsApi {

    static get(callback, id) {
        request.get(API + '/patients' + '/' + id)
            .end(callback);
    }

    static getAll(callback) {
        request.get(API + '/patients')
            .end(callback);
    }

    static create(patient, callback) {
        request.post(API + '/patients')
            .set('Content-Type', 'application/json')
            .send(JSON.parse(patient))
            .end(callback);
    }


    static update(patient, callback) {
        request.put(API + '/patients' + '/' + patient.id)
            .set('Content-Type', 'application/json')
            .send(JSON.parse(patient))
            .end(callback);
    }

    static remove(patient, callback) {
        request.delete(API + '/patients' + '/' + patient.id)
            .set('Content-Type', 'application/json')
            .send(JSON.parse(patient))
            .end(callback);
    }

    // function(err, res){
    //     console.log("res", res);
    // }

}