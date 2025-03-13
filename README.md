# reproject-crs-geojson

Small package to reproject the vertex coordinates of a GeoJSON between coordinate reference systems (CRS).

Accepts objects of type Feature, FeatureCollection, Geometry, or GeometryCollection, as well as all geometry types: Point, MultiPoint, LineString, MultiLineString, Polygon, MultiPolygon, and GeometryCollection.

The [Turf.js](https://turfjs.org/docs/api/coordEach) `coordEach` function is used to iterate through all the object's coordinate pairs and reproject them with [Proj4js](http://proj4js.org/). Additionally, to make CRS selection easier, [proj4-list](https://www.npmjs.com/package/proj4-list) is added.

# Usage

## Install the package

```
npm install reproject-crs-geojson
```

## Imports

```javascript
import {
  reprojectGeoJSON,
  getEPSG,
  epsgExist,
  toWGS84
} from "reproject-crs-geojson";
```

## Reproject

The `reprojectGeoJSON` it does not affect the properties, geometry type or number of vertices, it only converts the CRS.

```javascript
import { reprojectGeoJSON } from "reproject-crs-geojson";

const Point = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [1060479.7, 865010.7]
  }
}

const converted = reprojectGeoJSON(
  Point,
  "EPSG:3115",
  "EPSG:4326" // WGS84
);

console.log(converted);

// Expected

// {
//   type: 'Feature',
//   geometry: {
//     type: 'Point',
//     coordinates: [ -76.53327992507303, 3.3753051396728866 ]
//   }
// }
```

You can also include the string PROJ.4:

```javascript
import { reprojectGeoJSON } from "reproject-crs-geojson";

const epsg_3115 = "+proj=tmerc +lat_0=4.59620041666667 +lon_0=-77.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";

const Point = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [1060479.7, 865010.7]
  }
}

const converted = reprojectGeoJSON(
  Point,
  epsg_3115,
  "EPSG:4326" // WGS84
);
```

To convert directly to WGS84 (EPSG:4326) you can use the function `toWGS84`:

```javascript
import { toWGS84 } from "reproject-crs-geojson";

const epsg_3115 = "+proj=tmerc +lat_0=4.59620041666667 +lon_0=-77.0775079166667 +k=1 +x_0=1000000 +y_0=1000000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs";

const Point = {
  type: "Feature",
  geometry: {
    type: "Point",
    coordinates: [1060479.7, 865010.7]
  }
}

const converted = toWGS84(
  Point,
  epsg_3115
);

console.log(converted);
```

## EPSG utils

If you want to know if an epsg code is in [proj4-list](https://www.npmjs.com/package/proj4-list):

```javascript
import { epsgExist } from "reproject-crs-geojson";

console.log(epsgExist("foo"));
// false

console.log(epsgExist("EPSG:3115"));
// true
```

If you need the PROJ.4 string:

```javascript
import { getEPSG } from "reproject-crs-geojson";

console.log(getEPSG("EPSG:4326"));
// +proj=longlat +datum=WGS84 +no_defs
```

> In theory, according to the [specification](https://datatracker.ietf.org/doc/html/rfc7946#section-4), GeoJSON objects should be in the World Geodetic System 1984 (WGS 84). However, in many cases, we find it necessary to perform these types of transformations.

> This is my first npm package, as well as my first foray into the TypeScript language. I apologize in advance for any mistakes.