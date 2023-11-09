import path from 'node:path';
import { User } from '../types/users'
import fs from 'node:fs/promises'


type Record = {
  [key: string]: any;
};

const dataBasePath = path.resolve('./', './database/database.json') // caminho do meu database

// console.log(dataBasePath) 


export class Database {
  private database: { [key: string]: User[] | Record[] } = {}

  private persist() {
    fs.writeFile(dataBasePath, JSON.stringify(this.database, null, 2))
  }

  constructor() { // Sempre que iniciar o servidor ele vai ler o arquivo
    fs.readFile(dataBasePath, 'utf8').then(data => { // quando terminar de ler o arquivo vai salvar no meu database.json
      this.database = JSON.parse(data)
    }).catch(() => { // caso não exista vai criar o arquivo mesmo assim
      this.persist() 
    })
  } 

  select(table:string) {
    const data = this.database[table] ?? []

    return data
  }

  showDatabase() {
    return this.database
  }
  /*
  exemple 
    {
    "users": [
      {
        "name": "dasdasdsd",
        "email": "sddasasdasa",
        "password": "madsdasdasddsada"
      }
    ]
  }
  */

  insert(table:string, data: User) {
    if (Array.isArray(this.database[table])) { // se ja existe a tabela 
      this.database[table].push(data)

    } else {
      this.database[table] = [data] 
    }

    this.persist()

    return data
  }

  delete(table: string, id: string) {
    const rowIndex = this.database[table].findIndex(row => row.id === id)

    if (rowIndex > -1) { // retorna -1 se não encontoru e se tiver encontrado sera maior que -1 // se tiver encontrado
      this.database[table].splice(rowIndex, 1)
      this.persist()
    }
  }

}