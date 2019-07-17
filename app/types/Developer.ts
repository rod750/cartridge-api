import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Developer {
    @Field()
    id: number;

    @Field()
    name: string;
}
