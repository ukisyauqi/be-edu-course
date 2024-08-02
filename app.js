import express from "express"

import {
  createCourse,
  deleteCourse,
  getCourse,
  updateCourse,
  getCourses,
} from "./database.js"

const app = express()

app.use(express.json())

// get all courses
app.get("/course", async (req, res) => {
  const courses = await getCourses()
  res.send(courses)
})

// get courses by id
app.get("/course/:id", async (req, res) => {
  const id = req.params.id
  const course = await getCourse(id)
  res.send(course)
})

// create course
app.post("/course", async (req, res) => {
  const { name, description, category_id, tutor_id } = req.body
  const course = await createCourse(name, description, category_id, tutor_id)
  res.status(201).send(course)
})

// update course
app.put("/course/:id", async (req, res) => {
  const id = req.params.id
  const { name, description, category_id, tutor_id } = req.body
  const updatedCourse = await updateCourse(id, name, description, category_id, tutor_id)
  res.send(updatedCourse)
})

// delete course
app.delete("/course/:id", async (req, res) => {
  const id = req.params.id
  const result = await deleteCourse(id)
  res.send(result)
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

app.listen(3000, () => {
  console.log("started on port 3000")
})
