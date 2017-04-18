import request from 'superagent';

const API = 'https://fest-searcher.herokuapp.com/api';
export class MedicineApi {

    static search(term, callback) {
        request.get(API + '/fest/s'+ '/' + term)
            .end(callback);
    }

}