import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface HostelMapProps {
  longitude: number;
  latitude: number;
  hostelName: string;
}

const HostelMap = ({ longitude, latitude, hostelName }: HostelMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    // TODO: Replace with your Mapbox public token
    // Get your token from: https://mapbox.com/
    mapboxgl.accessToken = 'pk.eyJ1IjoibG92YWJsZS1kZW1vIiwiYSI6ImNtNTVrdjdxaTA3Ym0ycXM4ZGdnNTQ2MmsifQ.5vTRFx3VL3_wc4pxkz5Rvw';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [longitude, latitude],
      zoom: 15,
    });

    // Add marker for hostel location
    new mapboxgl.Marker({ color: '#7C3AED' })
      .setLngLat([longitude, latitude])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 })
          .setHTML(`<h3 class="font-semibold">${hostelName}</h3>`)
      )
      .addTo(map.current);

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Cleanup
    return () => {
      map.current?.remove();
    };
  }, [longitude, latitude, hostelName]);

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default HostelMap;
