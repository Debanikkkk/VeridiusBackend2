// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class Geofence {
//   @PrimaryGeneratedColumn()
//   id?: number;

//   @Column('float')
//   latitude?: number;

//   @Column('float')
//   longitude?: number;

//   @Column('float')
//   radius?: number;

//   @Column('float')
//   tariff?: number; // Tariff for this geofence
// }
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Polygon } from 'geojson';

@Entity()
export class Geofence {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326 })
  polygon?: Polygon;

  @Column()
  name?: string;
}
