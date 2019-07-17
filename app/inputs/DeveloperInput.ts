import { Field, InputType } from "type-graphql";
import { Developer } from "../types/Developer";

@InputType()
export class DeveloperInput implements Partial<Developer> {
    @Field()
    id: number;
    
    @Field({ nullable: true })
    name: string;
}
