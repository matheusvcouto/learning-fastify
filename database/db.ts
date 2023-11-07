import { User } from "../types/users"

type Record = {
  [key: string]: any;
};


export class database {
  private database: { [key: string]: User[] | Record[] } = {

  }

  select(table:string) {
    const data = this.database[table] ?? []

    return data
  }

  insert(table:string, data: User) {
    if (Array.isArray(this.database[table])) { // se ja existe a tabela 
      this.database[table].push(data)

    } else {
      this.database[table] = [data] 
    }

    return data
  }

}