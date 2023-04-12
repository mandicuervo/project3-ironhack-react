import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

export const postBeat = (beatInfo) => authenticatedHttp.post('/beats', beatInfo)

export const getBeatsFromUser = (userId) => authenticatedHttp.get(`/beats/${userId}`)

export const getOneBeat = (beatId) => authenticatedHttp.get(`/beat/${beatId}`)

// export const editBeat = (beatInfo) => authenticatedHttp.post(`/beat/edit/${beatInfo}`)

export const deleteBeat = (id) => authenticatedHttp.delete(`/beats/delete/${id}`)

