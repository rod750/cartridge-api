import { Field, InputType } from "type-graphql";
import { Platform } from "../types/Platform";

@InputType()
export class NewPlatformInput implements Partial<Platform> {    
    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    imageUrl: string;
}
