import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Platform {
    @Field()
    id: number;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    imageUrl: string;
}
