import { geofenceShape } from '../../entity/Geofence';

export interface ReqGeofence {
  name?: string;
  polygon?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
  geofenceType?: geofenceShape;
  // id?: number;
  latitude?: number;
  longitude?: number;
  radius?: number;
}
// COORDINATES:{
//     [
//         [
//             [12, 23],
//             [12, 23],
//             [12, 23],
//             [12, 23],

//         ]
//     ]
// }
