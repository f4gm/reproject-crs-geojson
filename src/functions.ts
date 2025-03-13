import { coordEach, AllGeoJSON } from "@turf/turf";
import proj4 from "proj4";
import proj4List from "proj4-list";

/**
 * Reprojects the coordinates of each of the GeoJSON object's vertices between the object's CRS to the target CRS.
 * @param geojson - GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param crs - CRS in which the vertices of the GeoJSON object are written.
 * @param target - The desired CRS to reproject the vertices of the GeoJSON object to.
 * @returns GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection in the target CRS.
 */
export const reprojectGeoJSON = (geojson: AllGeoJSON, crs: string, target: string) => {

  if (!geojson) {
    throw new Error("The GeoJSON object must be defined");
  }

  if (!crs) {
    console.warn("CRS of the object was not defined, EPSG:4326 is assigned by default.");
    crs = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
  }

  if (!target) {
    throw new Error("The target CRS must be defined.")
  }

  crs = epsgExist(crs) ? getEPSG(crs) : crs;
  target = epsgExist(target) ? getEPSG(target) : target;

  const result = structuredClone(geojson);

  coordEach(result, (coord) => {
    const transformed = proj4(crs, target, coord);
    console.log
    coord[0] = transformed[0];
    coord[1] = transformed[1];
  });

  return result;
}

/**
 * Reprojects the coordinates of each of the GeoJSON object's vertices between the object's CRS to WGS84 (EPSG:4326).
 * @param geojson - GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection.
 * @param crs - CRS in which the vertices of the GeoJSON object are written.
 * @returns - GeoJSON Feature, FeatureCollection, Geometry or GeometryCollection in WGS84 (EPSG:4326).
 */
export const toWGS84 = (geojson: AllGeoJSON, crs: string) => {
  const target = "+proj=longlat +datum=WGS84 +no_defs +type=crs";
  return reprojectGeoJSON(geojson, crs, target);
}

/**
 * Returns PROJ.4 from the EPSG code. The code must be defined in the proj4-list.
 * @param epsg - EPSG code. For example, "EPSG:4326".
 * @returns PROJ.4 string.
 */
export const getEPSG = (epsg: string) => {
  return epsgExist(epsg) ? proj4List[epsg][1] : "";
}

/**
 * Check if the EPSG code is in the proj4-list.
 * @param epsg EPSG code. For example, "EPSG:4326".
 * @returns true or false.
 */
export const epsgExist = (epsg: string) => {
  return !proj4List[epsg] ? false : true;
}