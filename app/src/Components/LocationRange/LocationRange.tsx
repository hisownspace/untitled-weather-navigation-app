import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";
import { useEffect, useRef } from "react";

import { coords } from "../../App";

interface LocRngProps {
  loc: coords;
}

export default function LocationRange({ loc }: LocRngProps) {
  // const [circle, setCircle] = useState<google.maps.Circle>();
  const map = useMap();
  const maps = useMapsLibrary("maps");
  const circle = useRef<google.maps.Circle | null>(null);

  useEffect(() => {
    const acc = loc.accuracy;
    const lat = loc.lat;
    const lng = loc.lng;

    if (!maps || !lat || !lng || !acc) return;

    const circ = new maps.Circle({
      strokeColor: "#0041a8",
      strokeOpacity: 0.4,
      strokeWeight: 1,
      fillColor: "#0041a8",
      fillOpacity: 0.1,
      map,
      center: { lat: loc.lat, lng: loc.lng },
      radius: loc.accuracy,
    });
    console.log("in effect!!!!!");
    circ.setMap(map);
    circle.current = circ;
  }, [loc, maps]);

  useEffect(() => {
    // const circ: google.maps.Circle = new maps.Circle({
    //   strokeColor: "#0041a8",
    //   strokeOpacity: 0.4,
    //   strokeWeight: 1,
    //   fillColor: "#0041a8",
    //   fillOpacity: 0.1,
    //   map,
    //   center: { lat, lng },
    //   radius: acc,
    // });
    // setCircle(circ);
    // circle.setMap(map);
    // circle.setCenter({ lat, lng });
    // circle.setRadius(acc);
  }, [maps, loc]);

  useEffect(() => {
    const acc = loc.accuracy;
    const lat = loc.lat;
    const lng = loc.lng;
    console.log(circle);

    if (!acc || !lat || !lng || !circle.current) return;
    console.log(lat, lng);

    circle.current.setRadius(acc);
    circle.current.setCenter({ lat, lng });
    return () => {
      if (!circle.current) return;
      console.log("in cleanup function");
      circle.current.setVisible(false);
    };
  }, [circle, loc]);

  return null;
}
