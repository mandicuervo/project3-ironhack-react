import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const paymentIntent = (body) => authenticatedHttp.get('/create-payment-intent/reserve', body);

export const payManyBillsIntent = (body) => authenticatedHttp.post('/create-payment-intent/bills', body)