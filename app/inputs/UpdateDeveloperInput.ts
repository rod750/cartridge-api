import { Field, InputType } from "type-graphql";
import { Developer } from "../types/Developer";

@InputType()
export class UpdateDeveloperInput implements Partial<Developer> {       
    @Field()
    name: string;
}
