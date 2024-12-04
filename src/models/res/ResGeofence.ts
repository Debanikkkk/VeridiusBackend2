export interface ResGeofence {
  id?: number;
  name?: string;
  polygon?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
}
