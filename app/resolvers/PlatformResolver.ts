import { Resolver, Ctx, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Context } from "apollo-server-core";
import { Platform } from "../types/Platform";
import { UpdatePlatformInput } from "../inputs/UpdatePlatformInput";
import { NewPlatformInput } from "../inputs/NewPlatformInput";

@Resolver(of => Platform)
export class PlatformResolver {
    @Query(returns => [Platform])
    async platforms(@Ctx() context: Context<any>) {
        return context.models.Platform.findAll({order: [['id', 'DESC']]});
    }
    
    @Mutation(returns => Platform)
    async createPlatform(@Arg("platform") newPlatform: NewPlatformInput, @Ctx() context: Context<any>): Promise<Platform> {
        return context.models.Platform.create(newPlatform);
    }

    @Mutation(returns => Platform)
    async updatePlatform(@Arg("id") id: number, @Arg("data") newData: UpdatePlatformInput, @Ctx() context: Context<any>): Promise<Platform> {
        console.log(id);
        return context.models.Platform.update(newData, { where: { id: id } })
            .then((value) => {
                return context.models.Platform.findByPk(id);
            });
    }

    @Mutation(returns => Number)
    async deletePlatform(@Arg("id") id: number, @Ctx() context: Context<any>) {
        return context.models.Platform.destroy({ where: { id: id } });
    }
}
