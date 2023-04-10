import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

// export const getCurrentUser = (token) => authenticatedHttp.get('/users/me')
export const getCurrentUser = () => authenticatedHttp.get('/users/me')

export const getAllUsers = () => authenticatedHttp.get('/users')

export const editUser = (userInfo) => authenticatedHttp.post('/users/edit', userInfo )

export const postBeat = (beatInfo) => authenticatedHttp.post('/beats', beatInfo)

export const getBeatsFromUser = (userId) => authenticatedHttp.get(`/beats/${userId}`)


