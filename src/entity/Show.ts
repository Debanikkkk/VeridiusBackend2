import { number } from "joi";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Season } from "./Season";
import { User } from "./User";
export enum movieRating {
    G = "G",
    PG = "PG",
    PG13 = "PG-13",
    R = "R",
    NC17 = "NC-17",
    UNRATED = "Unrated",
    NOT_RATED = "Not Rated"
}

export enum showType{
    movies='Movies',
    series='TV Shows'
}

@Entity()
export class Show{
@PrimaryGeneratedColumn()
id?: number

@Column({
    nullable: true
})
title?: string


@Column({
    nullable: true
})
tile_img?: string


@Column({
    nullable: true
})
desc_img?: string


@Column({
    nullable: true
})
description?: string


@Column({
    type:'timestamp',
    default:()=>'CURRENT_TIMESTAMP',
    nullable: true
})
date?: Date


@Column({
type:'enum',
enum:movieRating,
nullable: true
})
rating?: movieRating


@Column({
    type:'enum',
    enum: showType,
     nullable: true
})
show_type?: showType


@OneToMany(()=>(Season), (season)=>(season.show), {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
seasons?: Promise<Season[]>

@ManyToOne(()=>(User), (user)=>{user.shows}, {nullable: true, onDelete:'CASCADE', onUpdate:'CASCADE'})
@JoinColumn({name: 'publisher_id'})
publisher?: Promise<User>
}