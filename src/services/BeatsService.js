import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const postBeat = (beatInfo) => authenticatedHttp.post('/beats', beatInfo)

export const getBeatsFromUser = (userId) => authenticatedHttp.get(`/beats/${userId}`)

export const getOneBeat = (beatId) => authenticatedHttp.get(`/beat/${beatId}`)

export const editBeat = (beatId, beatInfo) => authenticatedHttp.post(`/beat/edit/${beatId}`, beatInfo)

export const deleteBeat = (id) => authenticatedHttp.delete(`/beats/delete/${id}`)

export const addCountPlay = (beatId) => authenticatedHttp.put(`/beat/count/${beatId}`);

export const getAllBeatsFromUser = (id) => authenticatedHttp.get(`/beats/count/${id}`)

export const getTopBeats = () => authenticatedHttp.get('/beats/top')

export const getSearchResults = (searchText) => authenticatedHttp.get(`/search/${searchText}`);
