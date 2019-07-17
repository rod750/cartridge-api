import { InputType, Field } from "type-graphql";
import { Game } from "../types/Game";
import { PlatformInput } from "./PlatformInput";
import { TagInput } from "./TagInput";
import { DeveloperInput } from "./DeveloperInput";

@InputType()
export class NewGameInput implements Partial<Game> {
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

    @Field(type => [TagInput], { nullable: true })
    tags: TagInput[];

    @Field(type => [DeveloperInput], { nullable: true })
    developers: DeveloperInput[];
}
