import mysql from "mysql2"
import dotenv from "dotenv"
dotenv.config()

const pool = mysql
  .createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
  })
  .promise()

export async function getCourses() {
  const [rows] = await pool.query("SELECT * FROM course")
  return rows
}

export async function getCourse(id) {
  const [rows] = await pool.query("SELECT * FROM course WHERE id = ?", [id])
  return rows[0]
}

export async function createCourse(name, description, category_id, tutor_id) {
  const [result] = await pool.query(
    "INSERT INTO course (name, description, category_id, tutor_id) VALUES (?,?,?,?)",
    [name, description, category_id, tutor_id]
  )
  return await getCourse(result.insertId)
}

export async function updateCourse(
  id,
  name,
  description,
  category_id,
  tutor_id
) {
  const [result] = await pool.query(
    `UPDATE course
    SET name = ?,
        description = ?,
        category_id = ?,
        tutor_id = ?
    WHERE id = ?`,
    [name, description, category_id, tutor_id, id]
  )
  return await getCourse(id)
}

export async function deleteCourse(id) {
  const [result] = await pool.query("DELETE FROM course WHERE id = ?", [id])
  return result
}
