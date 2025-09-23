import { number } from "joi";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Season } from "./Season";

@Entity()
export class Episode{
@PrimaryGeneratedColumn()
id?: number

@Column({
    nullable: true
})
title?: string

@Column({
    nullable: true
})
episode_desc?: string


@Column({
    nullable: true
})
file?: string


@Column({
    nullable: true
})
thumbnail?: string


@ManyToOne(()=>(Season), (season)=>{season.episodes}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
@JoinColumn({name:'season_id'})
season?:Promise<Season>
}