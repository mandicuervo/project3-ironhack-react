import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const createComment = (beatId, currentUserId, comment) => authenticatedHttp.post(`/beat/comments/${beatId}`, currentUserId, comment);

export const getBeatComments = (beatId) => authenticatedHttp.get(`/beat/comments/${beatId}`);

export const deleteComment = (commentId) => authenticatedHttp.delete(`/beat/comments/${commentId}`);

export const toggleFavorite = (beatId, currentUserId) => authenticatedHttp.post(`/beat/favorite/${beatId}`, {currentUserId});

export const getIsFavorited = (beatId, currentUserId) => authenticatedHttp.post(`/beat/favorite/one/${beatId}`, {currentUserId});