import { Field, InputType } from "type-graphql";
import { Platform } from "../types/Platform";

@InputType()
export class PlatformInput implements Partial<Platform> {
    @Field()
    id: number;
    
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field({ nullable: true })
    imageUrl: string;
}
