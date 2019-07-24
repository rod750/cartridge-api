import { Resolver, Ctx, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Context } from "apollo-server-core";
import { Tag } from "../types/Tag";
import { UpdateTagInput } from "../inputs/UpdateTagInput";
import { NewTagInput } from "../inputs/NewTagInput";

@Resolver(of => Tag)
export class TagResolver {
    @Query(returns => [Tag])
    async tags(@Ctx() context: Context<any>) {
        return context.models.Tag.findAll({order: [['id', 'DESC']]});
    }
    
    @Mutation(returns => Tag)
    async createTag(@Arg("tag") newTag: NewTagInput, @Ctx() context: Context<any>): Promise<Tag> {
        return context.models.Tag.create(newTag);
    }

    @Mutation(returns => Tag)
    async updateTag(@Arg("id") id: number, @Arg("data") newData: UpdateTagInput, @Ctx() context: Context<any>): Promise<Tag> {
        return context.models.Tag.update(newData, { where: { id: id } })
            .then((value) => {
                return context.models.Tag.findByPk(id);
            });
    }

    @Mutation(returns => Number)
    async deleteTag(@Arg("id") id: number, @Ctx() context: Context<any>) {
        return context.models.Tag.destroy({ where: { id: id } });
    }
}
