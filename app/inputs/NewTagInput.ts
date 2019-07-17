import { Field, InputType } from "type-graphql";
import { Tag } from "../types/Tag";

@InputType()
export class NewTagInput implements Partial<Tag> {    
    @Field()
    name: string;
}
