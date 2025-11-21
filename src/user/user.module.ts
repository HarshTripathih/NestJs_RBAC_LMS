import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { DBModule } from 'src/infrastructure/database/db.module';


@Module({
  imports: [
    DBModule
  ],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
