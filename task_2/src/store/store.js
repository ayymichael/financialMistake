import { writable } from 'svelte/store';

const initialState = [{
  name: "Valute1",
  currencyName: "USD",
  value: 1
},
{
	name: "Valute2",
	currencyName: "RUB",
	value: 1
}];

export const exchanger = writable(initialState);