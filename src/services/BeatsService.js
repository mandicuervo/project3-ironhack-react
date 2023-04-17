import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const postBeat = (beatInfo) => authenticatedHttp.post('/beats', beatInfo)

export const getBeatsFromUser = (userId) => authenticatedHttp.get(`/beats/${userId}`)

export const getOneBeat = (beatId) => authenticatedHttp.get(`/beat/${beatId}`)

export const editBeat = (beatId, beatInfo) => authenticatedHttp.post(`/beat/edit/${beatId}`, beatInfo)

export const deleteBeat = (id) => authenticatedHttp.delete(`/beats/delete/${id}`)


