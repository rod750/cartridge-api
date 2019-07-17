import { InputType, Field } from "type-graphql";
import { Game } from "../types/Game";
import { PlatformInput } from "./PlatformInput";
import { TagInput } from "./TagInput";
import { DeveloperInput } from "./DeveloperInput";

@InputType()
export class GameInput implements Partial<Game> {
    @Field({ nullable: true })
    id?: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    releaseYear: number;

    @Field()
    platformId: number;

    @Field()
    rating: number;

    @Field()
    coverUrl: string;

    @Field(type => [TagInput])
    tags: TagInput[];

    @Field(type => [DeveloperInput])
    developers: DeveloperInput[];
}
