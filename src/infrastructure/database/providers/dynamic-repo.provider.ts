import { KnexService } from "../knex/knex.service";

export function createDynamicRepoProvider(
    token: any,
    knexImpl: any,
    mongoImpl: any,
) {
return {
    provide: token,
    useFactory: (knexService: KnexService, mongoInstance: any) => {
        switch (process.env.DB_TYPE) {
        case "mysql":
            return new knexImpl(knexService);
        case "mongo":
            return mongoInstance;
        default:
            throw new Error(`Unknown DB_TYPE: ${process.env.DB_TYPE}`);
        }
    },
    inject: [KnexService, mongoImpl],
    };
}
