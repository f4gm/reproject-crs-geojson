var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  epsgExist: () => epsgExist,
  getEPSG: () => getEPSG,
  reprojectGeoJSON: () => reprojectGeoJSON,
  toWGS84: () => toWGS84
});
module.exports = __toCommonJS(index_exports);

// src/functions.ts
var import_turf = require("@turf/turf");
var import_proj4 = __toESM(require("proj4"));
var import_proj4_list = __toESM(require("proj4-list"));
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
  (0, import_turf.coordEach)(result, (coord) => {
    const transformed = (0, import_proj4.default)(crs, target, coord);
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
  return epsgExist(epsg) ? import_proj4_list.default[epsg][1] : "";
}, "getEPSG");
var epsgExist = /* @__PURE__ */ __name((epsg) => {
  return !import_proj4_list.default[epsg] ? false : true;
}, "epsgExist");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  epsgExist,
  getEPSG,
  reprojectGeoJSON,
  toWGS84
});
