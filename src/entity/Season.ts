import { number } from "joi";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Episode } from "./Episode";
import { Show } from "./Show";

@Entity()
export class Season{
@PrimaryGeneratedColumn()
id?: number

@Column({
    nullable: true
})
title?: string


@Column({
    nullable: true
})
season_no?: number


@Column({
    nullable: true
})
season_desc?: string


@Column({
    type:'timestamp',
    default:()=>'CURRENT_TIMESTAMP',
    nullable: true
})
date?: Date

@OneToMany(()=>(Episode), (episode)=>{episode.season}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
episodes?: Promise<Episode[]>

@ManyToOne(()=>(Show), (show)=>{show.seasons}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
@JoinColumn({name: 'show_id'})
show?: Promise<Show>
}