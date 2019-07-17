import { Field, InputType } from "type-graphql";
import { Tag } from "../types/Tag";

@InputType()
export class UpdateTagInput implements Partial<Tag> {    
    @Field()
    name: string;
}
