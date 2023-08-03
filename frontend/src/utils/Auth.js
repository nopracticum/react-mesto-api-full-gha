export const BASE_URL = 'https://api.nosin.nomoreparties.co';

export function register(email, password) {
	return fetch(`${BASE_URL}/signup`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json'
		},
		body: JSON.stringify({ email, password })
	})
		.then(res => res.ok? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};


export function authorize({ email, password }) {
	return fetch(`${BASE_URL}/signin`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		},
		body: JSON.stringify({ email, password })
	})
		.then(res => res.ok? res.json() : Promise.reject(`Ошибка: ${res.status}`))
};

export function checkToken(token) {
	return fetch(`${BASE_URL}/users/me`, {
		method: 'GET',
		headers: {
			"Content-Type": "application/json",
			'Accept': 'application/json',
			"Authorization": `Bearer ${token}`
		}
	})
	.then((res) => res.json())
	.then(data => data)
}