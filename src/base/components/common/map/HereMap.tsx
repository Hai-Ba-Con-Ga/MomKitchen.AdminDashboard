import React, { useEffect, useRef } from 'react';
import H from '@here/maps-api-for-javascript';
import { Box } from '@mui/material';
type Props = {
    apikey?: string;
}

const HereMap = (props: Props) => {
    const mapRef = useRef(null);
    const map = useRef(null);
    const platform = useRef(null)
    const { apikey = "7h1jyg35V5JfNIgPA8m1XEN39K9giRbtrfNj8nJ5kd4" } = props;
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
                lat: 64.144,
                lng: -21.94,
              },

              zoom: 14,
            });
      
            // Add panning and zooming behavior to the map
            const behavior = new H.mapevents.Behavior(
              new H.mapevents.MapEvents(newMap)
            );
      
            // Set the map object to the reference
            map.current = newMap;
          }
        },
        // Dependencies array
        [apikey]
      );
      return <div style={ { width: "700px", height: "500px", display:"flex", justifyContent: "cente", position: "relative", left:"50%",  } } ref={mapRef} />;
}

export default HereMap