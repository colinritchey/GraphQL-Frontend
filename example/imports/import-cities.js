/*
  run this line to upload data to graph.cool, currently need to delete old (todo: update instead)

  $ node --harmony-async-await import-cities.js
*/

const _ = require('lodash')

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

const createSpot = async(spot) => {
  let newprices = JSON.stringify(spot.prices).replace(/"/g, "'");
  // console.log("newprices: ", newprices);
  let result = await client.mutate(`{
    spot: createSpot(
        name: "${spot.name}",
        image: "${spot.image}",
        longitude: ${spot.longitude},
        latitude: ${spot.latitude},
        prices: "${newprices}"
      ) {
        id
      }
    }`);
  return result.spot.id;
}

const connectCitysAndSpotsMutation = (spotId, cityId) => (
  client.mutate(`{
    addToSpotOnCity(spotsSpotId: "${spotId}" cityCityId: "${cityId}") {
      cityCity {
        id
      }
    }
  }`)
)

const createCitys = async(rawCities) => {
  let cityIds = await Promise.all(rawCities.map(createCity))

  return _.zipObject(rawCities.map(city => city.id), cityIds)
}

const createSpots = async(rawSpots) => {
  let spotIds = await Promise.all(rawSpots.map(createSpot))

  return _.zipObject(rawSpots.map(spot => spot.id), spotIds)
}

const main = async() => {
  const rawCities = require('./cities.json')

  const allSpots = _.chain(rawCities)
    .flatMap(rawCity => rawCity.spots)
    .uniqBy(spot => spot.id)
    .value()

  // console.log('allSpots', allSpots);

  const spotIds = await createSpots(allSpots)
  console.log(`Created ${spotIds.length} spots`)

  const cityIds = await createCitys(rawCities)
  console.log(`Created ${cityIds.length} cities`)

  // connect citys and spots
  const mutations = _.chain(rawCities)
    .flatMap((rawCity) => {
      const newSpotIds = rawCity.spots.map((spot) => spotIds[spot.id])
      const newCityId = cityIds[rawCity.id]

      return newSpotIds.map((newSpotId) => ({newSpotId, newCityId}))
    })
    .map(({newSpotId, newCityId}) => connectCitysAndSpotsMutation(newSpotId, newCityId))
    .value()

  await Promise.all(mutations)
  console.log(`Created ${mutations.length} edges between spots and citys`)

}

main().catch((e) => console.error(e))
