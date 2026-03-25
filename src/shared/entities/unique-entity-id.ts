import { randomUUID } from 'crypto';

export class UniqueEntityId {
  private value: string;

  toString() {
    return this.value;
  }

  toValue() {
    return this.value;
  }

  constructor(id?: string) {
    this.value = id ?? randomUUID();
  }

  equals(id?: UniqueEntityId): boolean {
    if (id === null || id === undefined) {
      return false;
    }
    return id.toValue() === this.value;
  }
}
