import client from '../database';

export type Weapon = {
    id: Number;
    name: string;
    type: string;
    weight: number;
}

export class MythicalWeaponStore {
    //index method get a list of all elements in the database
    // async beacause all the call will be promises
    async index():Promise<Weapon[]>{
    //Trycatch because a connection could fail
        try {
            //First connect to the database
            const conn = await client.connect()
            //Second create a connection to the table
            const sql = 'SELECT * FROM mythical_weapons'
            //Third Run the query in the database
            const result = await conn.query(sql)
            //close the database connection
            conn.release()
        //return the rows from the table
        return result.rows

        } catch (error) {
            throw new Error(`Cannot get weapons ${error}`)
        }
    }
}

