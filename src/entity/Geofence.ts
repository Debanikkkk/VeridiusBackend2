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

export enum geofenceShape {
  circle = 'CIRCLE',
  polygon = 'POLYGON',
}
@Entity()
export class Geofence {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
  polygon?: Polygon;

  @Column({
    type: 'enum',
    enum: geofenceShape,
    nullable: true,
  })
  geofence_type?: geofenceShape;

  @Column()
  name?: string;

  // @Column('geometry', { spatialFeatureType: 'Polygon', srid: 4326, nullable: true })
  // centre?: Polygon;

  @Column({
    nullable: true,
  })
  radius?: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  latitude?: number;

  @Column('decimal', { precision: 10, scale: 7, nullable: true })
  longitude?: number;
}
