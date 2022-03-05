import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Author } from '../models/author.model';

@Resolver(() => Author)
export class AuthorsResolver {
  @Query(() => Author)
  async author(@Args('id', { type: () => Int }) id: number): Promise<Author> {
    return {
      id,
      firstName: 'Saf',
      posts: [],
    };
  }

  @ResolveField()
  async posts(@Parent() author: Author) {
    const { id } = author;
    return [
      {
        id: 21,
        title: 'SAtish',
      },
      {
        id: 22,
        title: 'SAtish22',
      },
    ];
  }
}
