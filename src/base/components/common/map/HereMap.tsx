import { AreaAdmin } from '@/types/@mk/entity/area';
import H from '@here/maps-api-for-javascript';
import { useEffect, useRef } from 'react';
type Props = {
    apikey?: string;
    area?: AreaAdmin
}

const HereMap = (props: Props) => {
  const {area} = props;
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null)
    const { apikey = "7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4" } = props;
    useEffect(
        () => {
          
          // Check if the map object has already been created
          if (!map.current) {
            if(area){
             
            // Create a platform object with the API key
            platform.current = new H.service.Platform({ apikey  });
            // Create a new Raster Tile service instance
            const rasterTileService = platform.current.getRasterTileService({
              queryParams: {
                style: "explore.day",
                size: 1024,
              },
            });
            // Creates a new instance of the H.service.rasterTile.Provider class
            // The class provides raster tiles for a given tile layer ID and pixel format
            const rasterTileProvider = new H.service.rasterTile.Provider(
              rasterTileService
            );
            // Create a new Tile layer with the Raster Tile provider
            const rasterTileLayer = new H.map.layer.TileLayer(rasterTileProvider);
            // Create a new map instance with the Tile layer, center and zoom level
            const newMap = new H.Map(mapRef.current, rasterTileLayer, {
              pixelRatio: window.devicePixelRatio,
              center: {
                lat: area?.boundaries?.[0].lat ?? 10.8230,
                lng: area?.boundaries?.[0].lng ??106.6296,
              },

              zoom: 14,
            });
      
            // Add panning and zooming behavior to the map
            // const behavior = new H.mapevents.Behavior(
            //   new H.mapevents.MapEvents(newMap)
            // );
            const linePoints = area?.boundaries?.reduce((prev, cur)=>[...prev, cur.lat, cur.lng, 100],[]);
            if(area?.boundaries?.length >=3 ){
              linePoints.push(area.boundaries[0].lat)
              linePoints.push(area.boundaries[0].lng)
              linePoints.push(100)
            }
            console.log();
            const lineString = new H.geo.LineString(
              linePoints
            );
            const polygon = area.boundaries.map(point => ({ lat: point.lat, lng: point.lng }));
const center = calculatePolygonCenter(polygon);

const text = area?.name ?? "AREA NAME"; // Replace with your desired text

const textMarker = createTextElement(text, center);
            
            newMap.addObject(
              new H.map.Polygon(lineString, {
                style: {
                  fillColor: "rgba(230, 244, 255, 0.7)",
                  strokeColor: '#829',
                  lineWidth: 1,

                  
                },
                data: []
              })
            );
            newMap.addObject(textMarker);
            // Set the map object to the reference
            map.current = newMap;
            }
          }
        },
        // Dependencies array
        [apikey, area]
      );
      return <div style={ { width: "700px", height: "500px", display:"flex", justifyContent: "center"  } } ref={mapRef} />;
}

export default HereMap
function calculatePolygonCenter(polygon) {
  let latSum = 0;
  let lngSum = 0;

  for (const point of polygon) {
    latSum += point.lat;
    lngSum += point.lng;
  }

  const latCenter = latSum / polygon.length;
  const lngCenter = lngSum / polygon.length;

  return { lat: latCenter, lng: lngCenter };
}
function createTextElement(text, position) {
  const textElement = new H.map.DomIcon(`<div >${text}</div>`, {
    // min: { width: 50, height: 30 }
  });

  const marker = new H.map.DomMarker(position, {
    data: {
      icon: textElement,
    },
    icon: textElement,

  });

  return marker;
}