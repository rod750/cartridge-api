import { InputType, Field } from "type-graphql";
import { Game } from "../types/Game";
import { PlatformInput } from "./PlatformInput";
import { TagInput } from "./TagInput";
import { DeveloperInput } from "./DeveloperInput";

@InputType()
export class UpdateGameInput implements Partial<Game> {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    releaseYear: number;

    @Field({ nullable: true })
    platformId: number;

    @Field({ nullable: true })
    rating: number;

    @Field({ nullable: true })
    coverUrl: string;

    @Field(type => [TagInput], { nullable: true })
    tags: TagInput[];

    @Field(type => [DeveloperInput], { nullable: true })
    developers: DeveloperInput[];
}
