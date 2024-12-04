export interface ReqGeofence {
  name?: string;
  polygon?: {
    type: 'Polygon';
    coordinates: number[][][];
  };
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
