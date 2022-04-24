
import { API_URL } from './config';

function getAllRoutes() {
    return fetch(`${API_URL}/routes/all`)
        .then(response => response.json());
}

function getRoute(routeId: string) {
    return fetch(`${API_URL}/routes/${routeId}`)
        .then(response => response.json());
}


function getTrainDetail(trainId: number) {
    return fetch(`${API_URL}/train/${trainId}`)
        .then(response => response.json());
}

export {
    getAllRoutes,
    getRoute,
    getTrainDetail,
}
