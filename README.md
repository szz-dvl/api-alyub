Esqueleto de la API: 
* https://expressjs.com/es/starter/generator.html
* express --no-view --git

Tests:
- registro usuario: curl -X POST -d '{"mail": "mail@test.com", "password": "12345678"}' -H "Content-Type: application/json" http://localhost:3000/api/v1/register
- edicion perfil: curl -X PUT -d '{"mail": "nuevo_mail@test.com", "password": "12345678"}' -H "Content-Type: application/json" -H "Authorization: Bearer {token}" http://localhost:3000/api/v1/editProfile/{id}
- crear ciudades: curl -X POST -d '{"list": [{ "name": "Kualalumpur", "population": 56 }, { "name": "Dinamarca", "population": 92 }]}' -H "Content-Type: application/json" http://localhost:3000/api/v1/cities/saveList
- listado ciudades: curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/cities/list
- listado ciudades por población: curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/cities/minPopulation/{numero}
- listado de ciudades por nombre: curl -X GET -H "Content-Type: application/json" http://localhost:3000/api/v1/cities/nameContains?name={nombre}
