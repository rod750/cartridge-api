import { Field, InputType } from "type-graphql";
import { Tag } from "../types/Tag";

@InputType()
export class TagInput implements Partial<Tag> {
    @Field()
    id: number;
    
    @Field({ nullable: true })
    name: string;
}
