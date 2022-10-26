<h1 align="center">
    UBS locations
</h1>
<h4 align="center">
    Search UBS (Unidades Básicas de Saúde - Basic Health Units) using latitude and longitude in max range
</h3>

### Run

#### Node
```sh
npm install
npm start
```

#### Docker
```sh
docker build -t ubs_locations .
docker run -p 3000:3000 ubs_locations
```

### Example

```sh
curl --location --request GET 'http://localhost:3000' \
--header 'latitude: -15.801225' \
--header 'longitude: -47.884101' \
--header 'range: 5'
```
Obs: range is in kilometers

### Data

- [https://dados.gov.br/dataset/unidades-basicas-de-saude-ubs](https://dados.gov.br/dataset/unidades-basicas-de-saude-ubs)
