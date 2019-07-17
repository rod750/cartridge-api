import { ObjectType, Field, Int } from "type-graphql";
import { Platform } from "./Platform";
import { Tag } from "./Tag";
import { Developer } from "./Developer";
import { platform } from "os";

@ObjectType()
export class Game {
    @Field(type => Int)
    id: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field(type => Int)
    releaseYear: number;

    @Field()
    platform: Platform;

    @Field()
    platformId?: number;

    @Field(type => Int)
    rating: number;

    @Field()
    coverUrl: string;

    @Field(type => [Tag], { nullable: true })
    tags: Tag[];

    @Field(type => [Developer], { nullable: true })
    developers: Developer[];
}
