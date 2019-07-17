import { Field, InputType } from "type-graphql";
import { Platform } from "../types/Platform";

@InputType()
export class UpdatePlatformInput implements Partial<Platform> {    
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    imageUrl: string;
}
