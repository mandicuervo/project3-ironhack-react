import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const BuyBeats = (body) => authenticatedHttp.get('/create-payment-intent/reserve', body);