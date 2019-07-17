import { Field, InputType } from "type-graphql";
import { Developer } from "../types/Developer";

@InputType()
export class NewDeveloperInput implements Partial<Developer> {    
    @Field({ nullable: false })
    name: string;
}
