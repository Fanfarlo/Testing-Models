import client from '../database'

export type Book = {
    id: Number;
    title: string;
    totalPages: number;
    author: string;
    type: string;
    summary: string
}

export class BookStore {
    async index():Promise<Book[]>{
        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM books'
            const resolve = await conn.query(sql)
            conn.release()
            return resolve.rows 
        } catch (error) {
            throw new Error (`Cannot get book ${error}`)
        }
    }

    async show(id:string):Promise<Book>{

        try {
            const conn = await client.connect()
            const sql = 'SELECT * FROM books WHERE id=($1)'
            const resolve = await conn.query(sql, [id])
            conn.release()
            return resolve.rows[0]
        } catch (error) {
            throw new Error (`Cannot find book ${id} Error:${error}`)
        }
    }

    async create(b:Book):Promise<Book>{
        try {
            const conn = await client.connect()
            const sql = 'INSERT INTO books (title, author, total_pages, summary) VALUES ($1, $2, $3, $4) RETURNING *'
            const resolve = await conn.query(sql,[b.title, b.author, b.totalPages, b.summary])
            conn.release()
            return resolve.rows[0]
        }
        catch (error) {
            throw new Error(`Could'nt add book ${b.title} Error:${error} `)
        }
    }
    async delete(id:string):Promise<Book>{
        try {
            const conn = await client.connect()
            const sql = 'DELETE FROM books WHERE id=($1)'
            const resolve = await conn.query(sql, [id])
            conn.release()
            return resolve.rows[0]
        } catch (error) {
            throw new Error (`Cannot delete book with ${id}. Error: ${error}`)
        }
    }
}
