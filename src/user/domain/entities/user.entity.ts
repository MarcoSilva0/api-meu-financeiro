import { Entity } from 'src/shared/entities/entity';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';

interface UserProps {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class User extends Entity<UserProps> {
  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

  get password() {
    return this.props.password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: UserProps, id?: UniqueEntityId) {
    return new User(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }
}
