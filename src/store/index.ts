import { atom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';

export interface BagItem {
	id: number;
	brand: string;
	name: string;
	image: string;
	price: number;
	size: number;
	quantity: number;
}

export interface LoginForm {
	email: string;
	password: string;
}

export const loginFormAtom = atom<LoginForm>({
	email: '',
	password: '',
});

export const userAtom = atom(false);
export const fromBagAtom = atom(false);

export const bagItemAtom = atomWithStorage('bagItem', <BagItem[]>[]);

const date = new Date();
const freeShipping = date.getDate() + 10;

const freeShippingDate = new Date(date.setDate(freeShipping)).toLocaleDateString('en-us', {
	weekday: 'short',
	month: 'short',
	day: 'numeric',
});

export const shippingOptionAtom = atom(freeShippingDate);

export const isLoadingAtom = atom(false);

export const freeShippingAtom = atom(false);
