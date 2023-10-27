import { AreaAdmin } from '@/types/@mk/entity/area';
import H from '@here/maps-api-for-javascript';
import { debounce } from 'lodash';
import { useEffect, useRef, useState } from 'react';
type Props = {
    apikey?: string;
    area? : AreaAdmin;
    onPositionChange: (position: {lat: number, lng: number})=>void
}

const HereMapSelect = (props: Props) => {
    // const theme = useTheme();
      const mapRef = useRef(null);
      const map = useRef(null);
      const platform = useRef(null)
      const [markerPosition, setMarkerPosition] = useState({ lat: 10.871592515732114, lng: 106.79497720296311 });
      const { apikey = "7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4", area, onPositionChange } = props;
      const debouncedUpdateMarkerPosition = debounce(newPosition => {
        setMarkerPosition(newPosition);
      }, 500); 
      useEffect(()=>{
        console.log(markerPosition);
        console.log(area);
        
        if(area && area?.boundaries) {
           const checkResult =  isPointInPolygon(markerPosition, area?.boundaries )
           console.log(checkResult ?"IS not in area selected" : "IS not in area selected");
           
        }
      },[markerPosition,area])
      useEffect(()=>{
        onPositionChange(markerPosition)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[markerPosition])
      useEffect(
          () => {
            
            // Check if the map object has already been created
            if (!map.current) {
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
                  lat:  10.871592515732114,
                  lng: 106.79497720296311,
                },
  
                zoom: 14,
              });
        
              // Add panning and zooming behavior to the map
              const behavior = new H.mapevents.Behavior(
                new H.mapevents.MapEvents(newMap)
              );
              window.addEventListener('resize', () => newMap.getViewPort().resize());
              addDraggableMarker(newMap, behavior);
              // Set the map object to the reference
              map.current = newMap;
          
            }
          },
          // Dependencies array
          // eslint-disable-next-line react-hooks/exhaustive-deps
          [apikey]
        );
        function addDraggableMarker(map, behavior){

            const marker = new H.map.Marker(markerPosition, {
                data:{
                    // mark the object as volatile for the smooth dragging
                    volatility: true
                  },
                  volatility: true
            });
            // Ensure that the marker can receive drag events
            marker.draggable = true;
            map.addObject(marker);
          
            // disable the default draggability of the underlying map
            // and calculate the offset between mouse and target's position
            // when starting to drag a marker object:
            map.addEventListener('dragstart', function(ev) {
              const target = ev.target,
                  pointer = ev.currentPointer;
              if (target instanceof H.map.Marker) {
                const targetPosition = map.geoToScreen(target.getGeometry());
                target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
                behavior.disable();
              }
            }, false);
          
          
            // re-enable the default draggability of the underlying map
            // when dragging has completed
            map.addEventListener('dragend', function(ev) {
              const target = ev.target;
              if (target instanceof H.map.Marker) {
                behavior.enable();
              }
            }, false);
          
            // Listen to the drag event and move the position of the marker
            // as necessary
             map.addEventListener('drag', function(ev) {
              const target = ev.target,
                  pointer = ev.currentPointer;
              if (target instanceof H.map.Marker) {
                target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
              }
              const newPosition = map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y);
              debouncedUpdateMarkerPosition(newPosition)
              
            }, false);
          }
        return <div style={ { width: "100%", height: "500px", display:"flex", justifyContent: "center"  } } ref={mapRef} />;
}
function isPointInPolygon(point, polygon) {
    console.log(polygon);
    
  const x = point.lat;
  const y = point.lng;
  let isInside = false;

  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lat;
    const yi = polygon[i].lng;
    const xj = polygon[j].lat;
    const yj = polygon[j].lng;

    const intersect = yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) {
      isInside = !isInside;
    }
  }

  return isInside;
}
export default HereMapSelect