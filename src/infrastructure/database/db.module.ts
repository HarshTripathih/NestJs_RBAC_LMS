
import { Module } from "@nestjs/common";
import { KnexService } from "./knex/knex.service";
import { MongoDBModule } from "./mongo/mongo.module";

// Interfaces
import { UserRepositoryInterface } from "src/core/domain/repositories/user.repository.interface";
import { CourseRepositoryInterface } from "src/core/domain/repositories/course.repository.interface";

// Implementations
import { MongoUserRepository } from "./mongo/repositories/user.repository.mongo";
import { KnexMySQLUserRepository } from "./knex/repositories/user.repository.mysql";
import { CourseRepositoryMongo } from "./mongo/repositories/course.repository.mongo";

// Dynamic provider factory
import { createDynamicRepoProvider } from "./providers/dynamic-repo.provider";

const userRepoProvider = createDynamicRepoProvider(
  UserRepositoryInterface,
  KnexMySQLUserRepository,
  MongoUserRepository,
);

const courseRepoProvider = createDynamicRepoProvider(
  CourseRepositoryInterface,
  null, // no MySQL version yet
  CourseRepositoryMongo,
);

@Module({
  imports: [MongoDBModule],
  providers: [
    KnexService,
    MongoUserRepository,
    CourseRepositoryMongo,
    userRepoProvider,
    courseRepoProvider,
  ],
  exports: [
    userRepoProvider,
    courseRepoProvider,
  ],
})
export class DBModule {}
