// THIS IS TEMPORARY SCRIPT TO MAKE THE FIRST ITERATION BETWEEN TWO COMPONENTS (INZICHT SEARCH + HAJKMAP)
import AppModel from "models/AppModel.js";
import VectorImageLayer from 'ol/layer/VectorImage';
import VectorSource from 'ol/source/Vector';
import { GeoJSON } from 'ol/format';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import LayerInfo from "models/layers/LayerInfo";
import { none } from "ol/centerconstraint";

const streamingLayerInfo = {
    "attribution": "sample attrobition",
    "caption": "sample caption",
    "content": "sample content",
    "date": 1698698282109,
    "displayFields": null,
    "imageFormat": "image/png",
    "infoClickSortDesc": true,
    "infoClickSortProperty": "",
    "infoClickSortType": "string",
    "infoFormat": "application/json",
    "infoOwner": "sample infoOwner",
    "infoText": "sample infoText",
    "infoTitle": "sample infoTitle",
    "infoUrl": "https://www.inzicht.nl/",
    "infoUrlText": "Website",
    "infoVisible": true,
    "layers": [
    "streamingLayer"
    ],
    "layersInfo": [],
    "legend": "",
    "legendIcon": "",
    "maxZoom": -1,
    "minZoom": -1,
    "opacity": 1.0,
    "owner": "",
    "projection": "EPSG:28992",
    "searchDisplayName": "",
    "searchFields": null,
    "searchGeometryField": "",
    "searchOutputFormat": "",
    "searchPropertyName": "",
    "searchUrl": "",
    "serverType": "geoserver",
    "singleTile": true,
    "tiled": false,
    "url": "https://www.inzicht.nl/",
    "version": "0.0.1",
    "visibleAtStart": false,
    "zIndex": null
}

const image = new CircleStyle({
    radius: 6,
    stroke: new Stroke({ color: 'black', width: 2 }),
    fill: new Fill({ color: 'red' }),
});

const styles = {
    Point: new Style({
        image,
    }),
    Polygon: new Style({
        fill: new Fill({
            color: 'yellow',
        }),
        stroke: new Stroke({
            color: 'black',
            width: 1,
        }),
    }),
};
// Return a GeoJSON FeatureCollection dict from features array
const makeFeatureCollection = (featuresArray, projection) => ({
    type: 'FeatureCollection',
    crs: {
        type: 'name',
        properties: {
            name: projection,
        },
    },
    features: featuresArray,
});

// Return vectorSource from GeoJSON FeatureCollection
const makeVectorSource = (featureCollection) => new VectorSource({
    features: (new GeoJSON()).readFeatures(featureCollection)
});

function setDefaultStyling(feature) {
    const type = feature.getGeometry()?.getType();
    return styles[type];
}

function addVectorLayerToMap(map, vectorSource) {
    const vectorLayerName = "streamingLayer"
    let vectorLayer = getVectorLayer(map, vectorLayerName)
    if (!vectorLayer) {
        vectorLayer = createVectorLayer(map, vectorLayerName)
    }
    updateVectorSource(vectorLayer, vectorSource)
}

function createVectorLayer(map, layerName) {
    console.log('createStreamingLayer')
    let newLayer = new VectorImageLayer({
        name: layerName,
        layerInfo: new LayerInfo(streamingLayerInfo)
    });
    // newLayer.set(["name"], layerName);
    // newLayer.setZIndex(99999);
    map.addLayer(newLayer)
    return newLayer
}

function getVectorLayer(map, layerName) {
    const layers = map.getLayers().getArray()
    return layers.find(layer => layer.getProperties()["name"] === layerName)
}

function updateVectorSource(vectorLayer, vectorSource) {
    console.log('updateVectorSource')
    vectorLayer.setSource(vectorSource)
    vectorLayer.setStyle((feature) => setDefaultStyling(feature));
}

export function isMapServerData(featuresArray) {
    const DEFAULT_PROJECTION = 'EPSG:28992' //TODO for later
    console.log('incoming featuresArray')
    console.log(featuresArray)
    const featureCollection = makeFeatureCollection(featuresArray, DEFAULT_PROJECTION)
    const vectorSource = makeVectorSource(featureCollection);
    let map = AppModel.getMap()
    addVectorLayerToMap(map, vectorSource)
}

export function processServerData(data) {
    console.log(`incoming data from webSocket`)
    isMapServerData(data)
}

