
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/constants/roles';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop( { required: true } )
  fname: string;

  @Prop( { required: true } )
  lname: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop( { required: true } )
  password: string;

  @Prop({ default: [] })
  roles: Role[];

  @Prop({ default: true })
  isActive: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
