import { Resolver, Ctx, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Context } from "apollo-server-core";
import { Developer } from "../types/Developer";
import { NewDeveloperInput } from "../inputs/NewDeveloperInput";
import { UpdateDeveloperInput } from "../inputs/UpdateDeveloperInput";

@Resolver(of => Developer)
export class DeveloperResolver {
    @Query(returns => [Developer])
    async developers(@Ctx() context: Context<any>) {
        return context.models.Developer.findAll({order: [['id', 'DESC']]});
    }
    
    @Mutation(returns => Developer)
    async createDeveloper(@Arg("developer") newDeveloper: NewDeveloperInput, @Ctx() context: Context<any>): Promise<Developer> {
        return context.models.Developer.create(newDeveloper);
    }

    @Mutation(returns => Developer)
    async updateDeveloper(@Arg("id") id: number, @Arg("data") newData: UpdateDeveloperInput, @Ctx() context: Context<any>): Promise<Developer> {
        return context.models.Developer.update(newData, { where: { id: id } })
            .then((value) => {
                return context.models.Developer.findByPk(id);
            });
    }

    @Mutation(returns => Number)
    async deleteDeveloper(@Arg("id") id: number, @Ctx() context: Context<any>) {
        return context.models.Developer.destroy({ where: { id: id } }).then((result) => (id));
    }
}
