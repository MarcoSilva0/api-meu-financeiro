import { Entity } from 'src/shared/entities/entity';
import { UniqueEntityId } from 'src/shared/entities/unique-entity-id';

interface CategoryProps {
  name: string;
  userId: number;
  createdAt: Date;
  updatedAt?: Date;
}

export class Category extends Entity<CategoryProps> {
  get name() {
    return this.props.name;
  }

  get userId() {
    return this.props.userId;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }

  static create(props: CategoryProps, id?: UniqueEntityId) {
    return new Category(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
        updatedAt: props.updatedAt ?? new Date(),
      },
      id,
    );
  }
}
