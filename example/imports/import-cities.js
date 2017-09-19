const { Lokka } = require('lokka');
const { Transport } = require('lokka-transport-http');

const client = new Lokka({
  transport: new Transport('https://api.graph.cool/simple/v1/cj4sy952g35gv0179y4icnvaq')
});

const createCity = async(city) => {
  let result = await client.mutate(`{
    city: createCity(
        name: "${city.name}",
        image: "${city.image}"
      ) {
        id
      }
    }`)

  return result.city.id;
}

const createCitys = async(rawCity) => {
  return await Promise.all(rawCity.map(createCity))
}

const main = async() => {
  const rawCity = require('./cities.json')

  const movieIds = await createCitys(rawCity)
  console.log(`Created ${movieIds.length} movies`)
}

main().catch((e) => console.error(e))
