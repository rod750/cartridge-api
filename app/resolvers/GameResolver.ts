import { Resolver, Ctx, Query, Arg, Mutation, InputType, Field } from "type-graphql";
import { Context } from "apollo-server-core";
import { Game } from "../types/Game";
import { NewGameInput } from "../inputs/NewGameInput";
import { UpdateGameInput } from "../inputs/UpdateGameInput";

@Resolver(of => Game)
export class GameResolver {
    @Query(returns => [Game])
    async games(@Ctx() context: Context<any>) {
        return context.models.Game.findAll({include: { all: true }});
    }
    
    @Mutation(returns => Game)
    async createGame(@Arg("game") newGame: NewGameInput, @Ctx() context: Context<any>): Promise<Game> {
        let createdGame: Game = await context.models.Game.create(newGame);
        await this.updateDevelopers(newGame, createdGame, context);
        await this.updateTags(newGame, createdGame, context);
        return context.models.Game.findByPk(createdGame.id, { include: { all: true } });
    }

    @Mutation(returns => Game)
    async updateGame(@Arg("id") id: number, @Arg("data") newData: UpdateGameInput, @Ctx() context: Context<any>): Promise<Game> {
        await context.models.Game.update(newData, { where: { id: id } });
        if(newData.developers) {
            await this.updateDevelopers(newData, newData, context, id);
        }
        if(newData.tags) {
            await this.updateTags(newData, newData, context, id);
        }

        return context.models.Game.findByPk(id, { include: { all: true }});
    }

    @Mutation(returns => Number)
    async deleteDeveloper(@Arg("id") id: number, @Ctx() context: Context<any>) {
        return context.models.Developer.destroy({ where: { id: id } });
    }

    async updateDevelopers(newGame: any, createdGame: any, context: Context<any>, gameId?: number) : Promise<any> {
        if(gameId) {
            createdGame.id = gameId;
            await context.models.GamesDeveloper.destroy({where: {gameId: gameId}});
        }

        let developers = newGame.developers.map(developer => {
            return { gameId: createdGame.id, developerId: developer.id }
        });

        return context.models.GamesDeveloper.bulkCreate(developers);
    }

    async updateTags(newGame: any, createdGame: any, context: Context<any>, gameId?: number) : Promise<any> {
        if(gameId) {
            createdGame.id = gameId;
            await context.models.GamesTag.destroy({where: {gameId: gameId}});
        }

        let tags = newGame.tags.map(tag => {
            return { gameId: createdGame.id, tagId: tag.id }
        });

        return context.models.GamesTag.bulkCreate(tags);
    }
}
