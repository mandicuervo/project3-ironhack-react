import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);
const unauthenticatedHttp = createHttp(false);

// export const getCurrentUser = (token) => authenticatedHttp.get('/users/me')
export const getCurrentUser = () => authenticatedHttp.get('/users/me')

export const getAllUsers = () => authenticatedHttp.get('/users')

export const editUser = (userInfo) => authenticatedHttp.post('/users/edit', userInfo )

export const postBeat = (beatInfo) => authenticatedHttp.post('/audio/upload', beatInfo)



