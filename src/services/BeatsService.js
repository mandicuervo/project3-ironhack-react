import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const postBeat = (beatInfo) => authenticatedHttp.post('/beats', beatInfo)

export const getBeatsFromUser = (userId) => authenticatedHttp.get(`/beats/${userId}`)

export const getOneBeat = (beatId) => authenticatedHttp.get(`/beat/${beatId}`)