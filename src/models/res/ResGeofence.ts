import { geofenceShape } from '../../entity/Geofence';

export interface ResGeofence {
  name?: string;
  polygon?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  geofenceType?: geofenceShape;
  id?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}
