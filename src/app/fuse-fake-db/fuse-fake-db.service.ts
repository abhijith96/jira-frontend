import { InMemoryDbService } from 'angular-in-memory-web-api';

import { TodoFakeDb } from './todo';


export class FuseFakeDbService implements InMemoryDbService
{
    createDb()
    {
        return {
        
            // Todo
            'todo-todos'  : TodoFakeDb.todos,
            'todo-filters': TodoFakeDb.filters,
            'todo-tags'   : TodoFakeDb.tags,

            
        };
    }
}
