return [
    new HttpRequest(
	'https',
	'www.cat-fact.herokuapp.com',
	Some(443),
	newList(['facts']),
	'GET')
]
