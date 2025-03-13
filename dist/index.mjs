var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/functions.ts
import { coordEach } from "@turf/turf";
import proj4 from "proj4";
import proj4List from "proj4-list";
var reprojectGeoJSON = /* @__PURE__ */ __name((geojson, crs, target) => {
  if (!geojson) {
    throw new Error("The GeoJSON object must be defined");
  }
  if (!crs) {
    console.warn("CRS of the object was not defined, EPSG:4326 is assigned by default.");
    crs = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
  }
  if (!target) {
    throw new Error("The target CRS must be defined.");
  }
  crs = epsgExist(crs) ? getEPSG(crs) : crs;
  target = epsgExist(target) ? getEPSG(target) : target;
  const result = structuredClone(geojson);
  coordEach(result, (coord) => {
    const transformed = proj4(crs, target, coord);
    console.log;
    coord[0] = transformed[0];
    coord[1] = transformed[1];
  });
  return result;
}, "reprojectGeoJSON");
var toWGS84 = /* @__PURE__ */ __name((geojson, crs) => {
  const target = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
  return reprojectGeoJSON(geojson, crs, target);
}, "toWGS84");
var getEPSG = /* @__PURE__ */ __name((epsg) => {
  return epsgExist(epsg) ? proj4List[epsg][1] : "";
}, "getEPSG");
var epsgExist = /* @__PURE__ */ __name((epsg) => {
  return !proj4List[epsg] ? false : true;
}, "epsgExist");
export {
  epsgExist,
  getEPSG,
  reprojectGeoJSON,
  toWGS84
};
