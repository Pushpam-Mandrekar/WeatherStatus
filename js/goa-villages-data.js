/**
 * goa-villages-data.js
 * Pure data: all Goa towns/villages (plus a couple of already-covered
 * cities/towns) with coordinates and a pre-computed taluka + district.
 * Source: a generated list supplied by the user; encoding-fixed and
 * deduplicated against locations-db.js's taluka aliases. Taluka/district
 * were assigned by nearest-taluka-headquarters distance (not real
 * administrative boundaries) — an approximation, spot-checked against
 * well-known places (Calangute -> Bardez, Colva/Benaulim -> Salcete,
 * Agonda/Palolem -> Canacona, Margao -> Salcete), all correct.
 * Consumed by locations-db.js; not meant to be read directly elsewhere.
 */

window.GOA_VILLAGES_DATA = [
  {
    "name": "Panaji",
    "type": "city",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.498995,
    "longitude": 73.828214
  },
  {
    "name": "Bicholim",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.590184,
    "longitude": 73.94578
  },
  {
    "name": "Calangute",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.545594,
    "longitude": 73.764618
  },
  {
    "name": "Canacona",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.006907,
    "longitude": 74.057064
  },
  {
    "name": "Cuncolim",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.180132,
    "longitude": 73.99786
  },
  {
    "name": "Curchorem",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.261738,
    "longitude": 74.108276
  },
  {
    "name": "Mapusa",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.590853,
    "longitude": 73.810215
  },
  {
    "name": "Margao",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.272923,
    "longitude": 73.958316
  },
  {
    "name": "Pernem",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.716608,
    "longitude": 73.797238
  },
  {
    "name": "Ponda",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.401028,
    "longitude": 74.006395
  },
  {
    "name": "Quepem",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.214254,
    "longitude": 74.070779
  },
  {
    "name": "Sanguem",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.228266,
    "longitude": 74.151267
  },
  {
    "name": "Sankhali",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.562648,
    "longitude": 74.011454
  },
  {
    "name": "Valpoi",
    "type": "town",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.531466,
    "longitude": 74.137275
  },
  {
    "name": "Vasco da Gama",
    "type": "town",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Mormugao",
    "latitude": 15.398416,
    "longitude": 73.812883
  },
  {
    "name": "Acamor",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.187422,
    "longitude": 74.036228
  },
  {
    "name": "Adcolna",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.489622,
    "longitude": 73.965046
  },
  {
    "name": "Adpai",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.376222,
    "longitude": 73.965282
  },
  {
    "name": "Advoi",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.497706,
    "longitude": 74.102107
  },
  {
    "name": "Agapur",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.388274,
    "longitude": 73.962257
  },
  {
    "name": "Agarvada",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.645578,
    "longitude": 73.76208
  },
  {
    "name": "Agassaim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Mormugao",
    "latitude": 15.426294,
    "longitude": 73.898613
  },
  {
    "name": "Aglote",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.426229,
    "longitude": 74.151541
  },
  {
    "name": "Agonda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.041104,
    "longitude": 73.988242
  },
  {
    "name": "Akhada",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.534802,
    "longitude": 73.932865
  },
  {
    "name": "Alorna",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.696439,
    "longitude": 73.916792
  },
  {
    "name": "Ambaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.194188,
    "longitude": 74.055423
  },
  {
    "name": "Ambedem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.557412,
    "longitude": 74.159461
  },
  {
    "name": "Ambeli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.462741,
    "longitude": 74.162112
  },
  {
    "name": "Ambelim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.171813,
    "longitude": 73.968711
  },
  {
    "name": "Ambeudak",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.290576,
    "longitude": 74.149202
  },
  {
    "name": "Amona",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.535409,
    "longitude": 73.983838
  },
  {
    "name": "Amthane",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.662441,
    "longitude": 73.909106
  },
  {
    "name": "Arabo",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.655385,
    "longitude": 73.819413
  },
  {
    "name": "Arla",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.437796,
    "longitude": 74.00882
  },
  {
    "name": "Arossim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.333089,
    "longitude": 73.904248
  },
  {
    "name": "Arpora",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.563097,
    "longitude": 73.764037
  },
  {
    "name": "Ashvem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.640908,
    "longitude": 73.722748
  },
  {
    "name": "Assagao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.5981,
    "longitude": 73.772153
  },
  {
    "name": "Assodem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.476126,
    "longitude": 74.187093
  },
  {
    "name": "Assolda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.255785,
    "longitude": 74.063988
  },
  {
    "name": "Assolna",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.180158,
    "longitude": 73.971357
  },
  {
    "name": "Aturli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.561322,
    "longitude": 73.920114
  },
  {
    "name": "Avedem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.232473,
    "longitude": 74.052057
  },
  {
    "name": "Azossim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.465489,
    "longitude": 73.922324
  },
  {
    "name": "Badem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.605213,
    "longitude": 73.753442
  },
  {
    "name": "Baida",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.2038,
    "longitude": 73.988217
  },
  {
    "name": "Balli",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.156503,
    "longitude": 74.014268
  },
  {
    "name": "Banastarim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.492118,
    "longitude": 73.957831
  },
  {
    "name": "Bandoli",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.296697,
    "longitude": 74.134932
  },
  {
    "name": "Bastora",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.581389,
    "longitude": 73.825693
  },
  {
    "name": "Batim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.447016,
    "longitude": 73.883498
  },
  {
    "name": "Benaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.260137,
    "longitude": 73.927567
  },
  {
    "name": "Betalbatim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.300881,
    "longitude": 73.9203
  },
  {
    "name": "Betki",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.508811,
    "longitude": 73.991997
  },
  {
    "name": "Betora",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.377267,
    "longitude": 74.035621
  },
  {
    "name": "Betul",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.147253,
    "longitude": 73.956327
  },
  {
    "name": "Bhati",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.181479,
    "longitude": 74.227077
  },
  {
    "name": "Bhinde",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.186495,
    "longitude": 74.127814
  },
  {
    "name": "Birondem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.488712,
    "longitude": 74.134304
  },
  {
    "name": "Bolcornem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.430315,
    "longitude": 74.19393
  },
  {
    "name": "Boma",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.474072,
    "longitude": 73.963222
  },
  {
    "name": "Bombedem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.54448,
    "longitude": 74.161349
  },
  {
    "name": "Britona",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.520529,
    "longitude": 73.847523
  },
  {
    "name": "Buimpal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.542028,
    "longitude": 74.080145
  },
  {
    "name": "Caiguinim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.167371,
    "longitude": 74.066541
  },
  {
    "name": "Calem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.292144,
    "longitude": 74.183657
  },
  {
    "name": "Camurlim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.644661,
    "longitude": 73.801818
  },
  {
    "name": "Cana",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.270079,
    "longitude": 73.933557
  },
  {
    "name": "Canaguinim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.119452,
    "longitude": 73.944023
  },
  {
    "name": "Canca",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.583181,
    "longitude": 73.798428
  },
  {
    "name": "Cansaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Mormugao",
    "latitude": 15.348739,
    "longitude": 73.897289
  },
  {
    "name": "Carambolim-Bozruco",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.509853,
    "longitude": 74.176484
  },
  {
    "name": "Caranzol",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.507324,
    "longitude": 74.218325
  },
  {
    "name": "Carmona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.197601,
    "longitude": 73.951076
  },
  {
    "name": "Carona",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.578354,
    "longitude": 73.875504
  },
  {
    "name": "Cavelossim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.184562,
    "longitude": 73.945631
  },
  {
    "name": "Chandel",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.735836,
    "longitude": 73.896124
  },
  {
    "name": "Chandor",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.261431,
    "longitude": 74.044003
  },
  {
    "name": "Chapora",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.603123,
    "longitude": 73.741904
  },
  {
    "name": "Chikhli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.648629,
    "longitude": 73.815733
  },
  {
    "name": "Chinchinim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.211381,
    "longitude": 73.9772
  },
  {
    "name": "Chopdem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.637949,
    "longitude": 73.754784
  },
  {
    "name": "Chorao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.547312,
    "longitude": 73.877779
  },
  {
    "name": "Choraundem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.626808,
    "longitude": 74.129144
  },
  {
    "name": "Codal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.594321,
    "longitude": 74.206362
  },
  {
    "name": "Codli",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.356662,
    "longitude": 74.12375
  },
  {
    "name": "Collem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.337137,
    "longitude": 74.242745
  },
  {
    "name": "Colomb",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.150595,
    "longitude": 74.131365
  },
  {
    "name": "Colva",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.277304,
    "longitude": 73.920203
  },
  {
    "name": "Consua",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.308275,
    "longitude": 73.909924
  },
  {
    "name": "Conxem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.34859,
    "longitude": 74.070983
  },
  {
    "name": "Copordem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.561685,
    "longitude": 74.129894
  },
  {
    "name": "Corjuem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.594807,
    "longitude": 73.88885
  },
  {
    "name": "Cortalim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.396966,
    "longitude": 73.916837
  },
  {
    "name": "Costi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.271648,
    "longitude": 74.170838
  },
  {
    "name": "Costimol",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.267698,
    "longitude": 74.156873
  },
  {
    "name": "Cotigao",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.959319,
    "longitude": 74.104889
  },
  {
    "name": "Cotombi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.477616,
    "longitude": 74.035065
  },
  {
    "name": "Cotombi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.250733,
    "longitude": 74.051413
  },
  {
    "name": "Cotorem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.482292,
    "longitude": 74.142443
  },
  {
    "name": "Cuchirem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.605995,
    "longitude": 74.006784
  },
  {
    "name": "Cudcem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.525607,
    "longitude": 74.165753
  },
  {
    "name": "Cudnam",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.544621,
    "longitude": 74.005003
  },
  {
    "name": "Cuelim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Mormugao",
    "latitude": 15.357646,
    "longitude": 73.903103
  },
  {
    "name": "Cumaroonda",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.522585,
    "longitude": 74.088984
  },
  {
    "name": "Cumbarjua",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.515406,
    "longitude": 73.947108
  },
  {
    "name": "Cuncoliem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.460236,
    "longitude": 73.979058
  },
  {
    "name": "Curca",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.460819,
    "longitude": 73.877869
  },
  {
    "name": "Curpem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.124714,
    "longitude": 74.184269
  },
  {
    "name": "Curti",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.417442,
    "longitude": 74.022961
  },
  {
    "name": "Dabem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.55986,
    "longitude": 74.107401
  },
  {
    "name": "Dabhal",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.35879,
    "longitude": 74.107568
  },
  {
    "name": "Darbandora",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.392948,
    "longitude": 74.121035
  },
  {
    "name": "Davem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.551699,
    "longitude": 74.17728
  },
  {
    "name": "Deao",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.184797,
    "longitude": 74.080414
  },
  {
    "name": "Derodem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.596661,
    "longitude": 74.219428
  },
  {
    "name": "Deussua",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.21699,
    "longitude": 73.968924
  },
  {
    "name": "Devsu",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.734342,
    "longitude": 73.745431
  },
  {
    "name": "Dhadem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.260841,
    "longitude": 74.123458
  },
  {
    "name": "Dhamshem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.482381,
    "longitude": 74.126528
  },
  {
    "name": "Dhargalim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.670832,
    "longitude": 73.843846
  },
  {
    "name": "Dramapur",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.230979,
    "longitude": 73.991156
  },
  {
    "name": "Durbhat",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.372462,
    "longitude": 73.975384
  },
  {
    "name": "Fatorpa",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.145293,
    "longitude": 73.997206
  },
  {
    "name": "Fatrade",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.21448,
    "longitude": 73.939593
  },
  {
    "name": "Gamval",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.097745,
    "longitude": 73.935031
  },
  {
    "name": "Gancim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.459264,
    "longitude": 73.898721
  },
  {
    "name": "Gandaulim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.51383,
    "longitude": 73.943304
  },
  {
    "name": "Ganjem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.465841,
    "longitude": 74.087505
  },
  {
    "name": "Gaondongrim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.03382,
    "longitude": 74.118898
  },
  {
    "name": "Gaundaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.292335,
    "longitude": 73.922061
  },
  {
    "name": "Goalim Moula",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.47282,
    "longitude": 73.900459
  },
  {
    "name": "Gonteli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.605935,
    "longitude": 74.052338
  },
  {
    "name": "Govanem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.463745,
    "longitude": 74.17603
  },
  {
    "name": "Gulei",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.479044,
    "longitude": 74.108465
  },
  {
    "name": "Gulem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.601742,
    "longitude": 74.073257
  },
  {
    "name": "Harvalem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.56515,
    "longitude": 74.046215
  },
  {
    "name": "Ibrampur",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.707926,
    "longitude": 73.936771
  },
  {
    "name": "Ilha de Rachol",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.322397,
    "longitude": 74.005252
  },
  {
    "name": "Ivrem-Buzruco",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.631236,
    "longitude": 74.145819
  },
  {
    "name": "Jagvi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.099884,
    "longitude": 74.195414
  },
  {
    "name": "Juve",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.534277,
    "longitude": 73.952038
  },
  {
    "name": "Kalvi",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.568867,
    "longitude": 73.888206
  },
  {
    "name": "Kankirem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.470239,
    "longitude": 74.108813
  },
  {
    "name": "Karapur",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.56351,
    "longitude": 73.98836
  },
  {
    "name": "Karmalwadi",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.738335,
    "longitude": 73.904686
  },
  {
    "name": "Karmane",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.325599,
    "longitude": 74.152559
  },
  {
    "name": "Kasarpal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.645075,
    "longitude": 73.940617
  },
  {
    "name": "Kasarvarne",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.713343,
    "longitude": 73.892047
  },
  {
    "name": "Kelbaiwada",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.582106,
    "longitude": 73.929706
  },
  {
    "name": "Kelvona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.138271,
    "longitude": 74.133543
  },
  {
    "name": "Kerem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.54957,
    "longitude": 73.893174
  },
  {
    "name": "Keri",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.45728,
    "longitude": 74.000566
  },
  {
    "name": "Keri",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.609408,
    "longitude": 74.065007
  },
  {
    "name": "Khadki",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.511284,
    "longitude": 74.139639
  },
  {
    "name": "Khairat",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.638335,
    "longitude": 73.784504
  },
  {
    "name": "Kharpal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.651422,
    "longitude": 73.955235
  },
  {
    "name": "Kolamb",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.003144,
    "longitude": 74.028003
  },
  {
    "name": "Korgao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.709772,
    "longitude": 73.751642
  },
  {
    "name": "Kuddi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.092296,
    "longitude": 73.928603
  },
  {
    "name": "Kumyamala",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.697582,
    "longitude": 73.95539
  },
  {
    "name": "Kundai",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.456007,
    "longitude": 73.955358
  },
  {
    "name": "Ladfem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.62781,
    "longitude": 73.955047
  },
  {
    "name": "Loliem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.94204,
    "longitude": 74.068843
  },
  {
    "name": "Loutolim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.340017,
    "longitude": 73.986002
  },
  {
    "name": "Macasana",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.289877,
    "longitude": 74.060597
  },
  {
    "name": "Madel",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.520079,
    "longitude": 73.869281
  },
  {
    "name": "Majorda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.313248,
    "longitude": 73.910387
  },
  {
    "name": "Malol",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.576366,
    "longitude": 74.19605
  },
  {
    "name": "Malpona",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.446504,
    "longitude": 74.176793
  },
  {
    "name": "Mandrem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.655112,
    "longitude": 73.719788
  },
  {
    "name": "Mandur",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.451447,
    "longitude": 73.920758
  },
  {
    "name": "Mangeshi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.444683,
    "longitude": 73.967364
  },
  {
    "name": "Marna",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.615998,
    "longitude": 73.78603
  },
  {
    "name": "Marra",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.522158,
    "longitude": 73.789446
  },
  {
    "name": "Mascavrem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.126878,
    "longitude": 74.149454
  },
  {
    "name": "Maulinguem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.617225,
    "longitude": 73.976752
  },
  {
    "name": "Mauxi",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.546392,
    "longitude": 74.113698
  },
  {
    "name": "Mayem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.586953,
    "longitude": 73.907583
  },
  {
    "name": "Menkure",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.696467,
    "longitude": 73.89842
  },
  {
    "name": "Mirabag",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.271502,
    "longitude": 74.121333
  },
  {
    "name": "Moira",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.600634,
    "longitude": 73.844194
  },
  {
    "name": "Molcopona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.179879,
    "longitude": 74.150677
  },
  {
    "name": "Molcornem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.200913,
    "longitude": 74.127068
  },
  {
    "name": "Mollem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.375011,
    "longitude": 74.226853
  },
  {
    "name": "Mopa",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.757828,
    "longitude": 73.855775
  },
  {
    "name": "Morpirl",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.111403,
    "longitude": 74.000951
  },
  {
    "name": "Mugoli",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.240734,
    "longitude": 74.144969
  },
  {
    "name": "Mulem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.233736,
    "longitude": 74.031909
  },
  {
    "name": "Mulgao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.61818,
    "longitude": 73.921241
  },
  {
    "name": "Nachinola",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.592015,
    "longitude": 73.85456
  },
  {
    "name": "Nadora",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.6674,
    "longitude": 73.856009
  },
  {
    "name": "Nagarsen",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.010159,
    "longitude": 74.039797
  },
  {
    "name": "Nagoa",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.553023,
    "longitude": 73.780596
  },
  {
    "name": "Nagoa",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.357127,
    "longitude": 73.924921
  },
  {
    "name": "Naguem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.528514,
    "longitude": 74.120056
  },
  {
    "name": "Nagzar",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.707611,
    "longitude": 73.852598
  },
  {
    "name": "Naiguinim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.601565,
    "longitude": 73.987942
  },
  {
    "name": "Nanorem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.579278,
    "longitude": 74.207667
  },
  {
    "name": "Nanus",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.510653,
    "longitude": 74.125923
  },
  {
    "name": "Naroa",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.551999,
    "longitude": 73.923654
  },
  {
    "name": "Navelim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.530065,
    "longitude": 74.00735
  },
  {
    "name": "Neturlim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.091216,
    "longitude": 74.217099
  },
  {
    "name": "Neura",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.445076,
    "longitude": 73.922131
  },
  {
    "name": "Neura-O-Pequeno",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.440898,
    "longitude": 73.905437
  },
  {
    "name": "Nirankal",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.360632,
    "longitude": 74.082248
  },
  {
    "name": "Nundem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.055625,
    "longitude": 74.202649
  },
  {
    "name": "Olaulim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.570799,
    "longitude": 73.864339
  },
  {
    "name": "Orgao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.509938,
    "longitude": 73.96171
  },
  {
    "name": "Orlim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.211393,
    "longitude": 73.937071
  },
  {
    "name": "Oxel",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.636091,
    "longitude": 73.773917
  },
  {
    "name": "Ozorim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.68748,
    "longitude": 73.88104
  },
  {
    "name": "Padi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.089759,
    "longitude": 74.045414
  },
  {
    "name": "Pale",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.593542,
    "longitude": 74.137665
  },
  {
    "name": "Palem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.446824,
    "longitude": 73.8653
  },
  {
    "name": "Pali",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.471546,
    "longitude": 74.055458
  },
  {
    "name": "Paliem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.573402,
    "longitude": 73.822694
  },
  {
    "name": "Paliem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.711298,
    "longitude": 73.729398
  },
  {
    "name": "Palolem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.012796,
    "longitude": 74.02195
  },
  {
    "name": "Parcem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.670232,
    "longitude": 73.780645
  },
  {
    "name": "Parlmar Grande",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.201942,
    "longitude": 73.977203
  },
  {
    "name": "Paroda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.23848,
    "longitude": 74.023995
  },
  {
    "name": "Parra",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.573657,
    "longitude": 73.793172
  },
  {
    "name": "Partagal",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.993049,
    "longitude": 74.107312
  },
  {
    "name": "Patnam",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.998587,
    "longitude": 74.036273
  },
  {
    "name": "Patradevi",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.796992,
    "longitude": 73.86294
  },
  {
    "name": "Piedade",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.523768,
    "longitude": 73.898672
  },
  {
    "name": "Pilar",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.442561,
    "longitude": 73.895053
  },
  {
    "name": "Piliem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.410461,
    "longitude": 74.089812
  },
  {
    "name": "Piligao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.553374,
    "longitude": 73.951271
  },
  {
    "name": "Pirla",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.108462,
    "longitude": 74.135077
  },
  {
    "name": "Pirna",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.661609,
    "longitude": 73.88213
  },
  {
    "name": "Pissurlem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.529217,
    "longitude": 74.071133
  },
  {
    "name": "Podocem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.585901,
    "longitude": 74.000507
  },
  {
    "name": "Poinguinim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.967549,
    "longitude": 74.086635
  },
  {
    "name": "Poira",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.596274,
    "longitude": 73.898098
  },
  {
    "name": "Polem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.911364,
    "longitude": 74.08733
  },
  {
    "name": "Pomburpa",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.558768,
    "longitude": 73.867612
  },
  {
    "name": "Porcem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.490378,
    "longitude": 74.077807
  },
  {
    "name": "Poriebhat",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.347555,
    "longitude": 73.937645
  },
  {
    "name": "Poriem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.586997,
    "longitude": 74.028647
  },
  {
    "name": "Poroscodem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.739227,
    "longitude": 73.812105
  },
  {
    "name": "Priol",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.43653,
    "longitude": 73.990935
  },
  {
    "name": "Punola",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.573559,
    "longitude": 73.829831
  },
  {
    "name": "Quelossim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.386318,
    "longitude": 73.940503
  },
  {
    "name": "Querim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.713987,
    "longitude": 73.703296
  },
  {
    "name": "Quitla",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.601265,
    "longitude": 73.873851
  },
  {
    "name": "Rachol",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.308246,
    "longitude": 74.004464
  },
  {
    "name": "Rajbag",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.992282,
    "longitude": 74.043222
  },
  {
    "name": "Rassaim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.367336,
    "longitude": 73.963684
  },
  {
    "name": "Ravona",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.617874,
    "longitude": 74.03641
  },
  {
    "name": "Reis Magos",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.496601,
    "longitude": 73.809553
  },
  {
    "name": "Revora",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.656696,
    "longitude": 73.846474
  },
  {
    "name": "Rivona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.163175,
    "longitude": 74.110743
  },
  {
    "name": "Sal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.692945,
    "longitude": 73.928922
  },
  {
    "name": "Saleli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.560349,
    "longitude": 74.078191
  },
  {
    "name": "Salvador do Mundo",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.53295,
    "longitude": 73.858214
  },
  {
    "name": "Sancordem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.409871,
    "longitude": 74.168873
  },
  {
    "name": "Sangod",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.355418,
    "longitude": 74.188485
  },
  {
    "name": "Sangolda",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.545433,
    "longitude": 73.811419
  },
  {
    "name": "Sanvorcem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.499614,
    "longitude": 74.13535
  },
  {
    "name": "Sanvordem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.526857,
    "longitude": 74.172016
  },
  {
    "name": "Sanvordem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.268798,
    "longitude": 74.112715
  },
  {
    "name": "Saptmale",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.418192,
    "longitude": 74.069992
  },
  {
    "name": "Sarmanas",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.553157,
    "longitude": 73.966076
  },
  {
    "name": "Sarvan",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.580907,
    "longitude": 73.970561
  },
  {
    "name": "Sarzora",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.217869,
    "longitude": 73.995728
  },
  {
    "name": "Satorem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.555179,
    "longitude": 74.14207
  },
  {
    "name": "Savantwada",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.008622,
    "longitude": 74.035137
  },
  {
    "name": "Savoi-Verem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.480839,
    "longitude": 74.019581
  },
  {
    "name": "Seraulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.295652,
    "longitude": 73.936787
  },
  {
    "name": "Sernabatim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.266953,
    "longitude": 73.917653
  },
  {
    "name": "Shigao",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.334688,
    "longitude": 74.207013
  },
  {
    "name": "Shikeri",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.586002,
    "longitude": 73.892782
  },
  {
    "name": "Shiroda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.320406,
    "longitude": 74.029438
  },
  {
    "name": "Shristhal",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.02351,
    "longitude": 74.07742
  },
  {
    "name": "Sinquerim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.49996,
    "longitude": 73.770979
  },
  {
    "name": "Siranguli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.487488,
    "longitude": 74.182872
  },
  {
    "name": "Sircaim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.624432,
    "longitude": 73.878872
  },
  {
    "name": "Siridao",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Mormugao",
    "latitude": 15.431456,
    "longitude": 73.863498
  },
  {
    "name": "Sirigao",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.60528,
    "longitude": 73.898496
  },
  {
    "name": "Sirlim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.227648,
    "longitude": 73.976673
  },
  {
    "name": "Siroli",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.622248,
    "longitude": 74.063007
  },
  {
    "name": "Sirsodem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.48622,
    "longitude": 74.184079
  },
  {
    "name": "SIrvoi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.205929,
    "longitude": 74.086175
  },
  {
    "name": "Sodiem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.621419,
    "longitude": 73.795157
  },
  {
    "name": "Sonal",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.539584,
    "longitude": 74.189537
  },
  {
    "name": "Sonus-Vonvoliem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.528894,
    "longitude": 74.043209
  },
  {
    "name": "Surla",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.669887,
    "longitude": 74.173153
  },
  {
    "name": "Surla",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.49899,
    "longitude": 74.031102
  },
  {
    "name": "São Matias",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.52961,
    "longitude": 73.911756
  },
  {
    "name": "Talarna",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.706867,
    "longitude": 73.892369
  },
  {
    "name": "Talaulim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Tiswadi",
    "latitude": 15.46884,
    "longitude": 73.888099
  },
  {
    "name": "Talaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.382046,
    "longitude": 73.979917
  },
  {
    "name": "Talpona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 14.981942,
    "longitude": 74.040971
  },
  {
    "name": "Tamboxem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.760113,
    "longitude": 73.837321
  },
  {
    "name": "Tamsheri",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.362205,
    "longitude": 73.992448
  },
  {
    "name": "Tilamola",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.220556,
    "longitude": 74.086642
  },
  {
    "name": "Tiracol",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.724101,
    "longitude": 73.688732
  },
  {
    "name": "Tiverm",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.500003,
    "longitude": 73.959596
  },
  {
    "name": "Tonca",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.535745,
    "longitude": 73.959011
  },
  {
    "name": "Toxem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.776044,
    "longitude": 73.84733
  },
  {
    "name": "Tudal",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.044741,
    "longitude": 74.133414
  },
  {
    "name": "Tuem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.666568,
    "longitude": 73.795665
  },
  {
    "name": "Ucassaim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.58159,
    "longitude": 73.841569
  },
  {
    "name": "Uguem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.230586,
    "longitude": 74.182334
  },
  {
    "name": "Uguem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.75304,
    "longitude": 73.836472
  },
  {
    "name": "Usap",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.651635,
    "longitude": 73.923998
  },
  {
    "name": "Usgao",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.443525,
    "longitude": 74.064428
  },
  {
    "name": "Ustem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.561755,
    "longitude": 74.188506
  },
  {
    "name": "Utorda",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.324308,
    "longitude": 73.909723
  },
  {
    "name": "Vaddem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.12636,
    "longitude": 74.207947
  },
  {
    "name": "Vagator",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.598574,
    "longitude": 73.740813
  },
  {
    "name": "Vagurbem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.464021,
    "longitude": 74.030299
  },
  {
    "name": "Vaguriem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.504846,
    "longitude": 74.084663
  },
  {
    "name": "Vainguinim",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bicholim",
    "latitude": 15.567834,
    "longitude": 73.908066
  },
  {
    "name": "Vanelim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.271894,
    "longitude": 73.92735
  },
  {
    "name": "Vantem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.484584,
    "longitude": 74.09416
  },
  {
    "name": "Varca",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Salcete",
    "latitude": 15.231419,
    "longitude": 73.943265
  },
  {
    "name": "Varkhand",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.725757,
    "longitude": 73.836687
  },
  {
    "name": "Velguem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.520734,
    "longitude": 74.153678
  },
  {
    "name": "Velguem",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.501885,
    "longitude": 74.052917
  },
  {
    "name": "Veliena",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Sanguem",
    "latitude": 15.168439,
    "longitude": 74.237908
  },
  {
    "name": "Velim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.165751,
    "longitude": 73.974246
  },
  {
    "name": "Veling",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.431446,
    "longitude": 73.971419
  },
  {
    "name": "Veluz",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.542752,
    "longitude": 74.143897
  },
  {
    "name": "Verla",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Bardez",
    "latitude": 15.586994,
    "longitude": 73.782957
  },
  {
    "name": "Verlem",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Canacona",
    "latitude": 15.045518,
    "longitude": 74.246786
  },
  {
    "name": "Virnoda",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Pernem",
    "latitude": 15.691633,
    "longitude": 73.819799
  },
  {
    "name": "Voldeon",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.326748,
    "longitude": 74.162258
  },
  {
    "name": "Volvoi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.493913,
    "longitude": 74.013895
  },
  {
    "name": "Wadi",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Ponda",
    "latitude": 15.375198,
    "longitude": 73.9832
  },
  {
    "name": "Xelopo-Curdo",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.48327,
    "longitude": 74.167699
  },
  {
    "name": "Xelvona",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Dharbandora",
    "latitude": 15.2716,
    "longitude": 74.08551
  },
  {
    "name": "Zambaulim",
    "type": "village",
    "state": "Goa",
    "district": "South Goa",
    "taluka": "Quepem",
    "latitude": 15.186553,
    "longitude": 74.09563
  },
  {
    "name": "Zormen",
    "type": "village",
    "state": "Goa",
    "district": "North Goa",
    "taluka": "Sattari",
    "latitude": 15.573391,
    "longitude": 74.104091
  }
];
