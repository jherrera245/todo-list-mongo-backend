const database = require('../models')
const Todo = database.todo

//metodo para listas todas las tares
exports.findAll = (req, res) => {
    const todoNombre = req.query.todoNombre
    let condition = todoNombre ? { todoNombre: { $regex: new RegExp(todoNombre), $options: "i" } } : {}

    Todo.find(condition).then(data => {
        res.send(data)
    }).catch(err => {
        res.status(500).send({
            message:
                err.message || "Ah ocurrido un error al buscar las tareas"
        })
    })
}

//metodo para guardar una tarea
exports.create = (req, res) => {
    //validando petición
    if (!req.body.todoNombre) {
        res.status(404).send({ message: 'El nombre de la tarea no puede ser vacio!!' })
        return
    }

    const todo = new Todo({
        todoNombre: req.body.todoNombre,
        todoDescripcion: req.body.todoDescripcion,
        todoEstado: req.body.todoEstado
    })

    //guardando nueva tarea en la base de datos
    todo.save(todo).then(
        data => {
            res.send(data)
        }
    ).catch(err => {
        res.status(500).send({
            message: err.message || "Ah ocurrido un error al crear la tarea!!"
        })
    })
}

//metodo para actualizar una tarea
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Los campos no pueden ser vacios"
        })
    }

    const id = req.params.id

    Todo.findByIdAndUpdate(id, req.body,
        {
            useFindAndModify: false
        }
    ).then(data => {
        if (!data) {
            res.status(404).send({
                message: `No se pudo actualizar la tarea con id=${id}!!`
            })
        } else res.send({ message: "Tarea actualizada correctamente!!" })
    }).catch(err => {
        res.status(500).send({
            message: `Error al actualizar la tarea con id=${id}`
        })
    })
}

//metodo para eliminar una tarea
exports.delete = (req, res) => {

    const id = req.params.id

    Todo.findByIdAndRemove(id).then(
        data => {
            if (!data) {
                res.status(404).send({
                    message: `No se pudo eliminar tarea con id=${id}`
                });
            } else {
                res.send({
                    message: "Tarea eliminada correctamente!!!"
                });
            }
        }
    ).catch(err => {
        res.status(500).send({
            message: `Error al eliminar tarea con id=${id}s`
        });
    });
}

//metodo para eliminar todas las tareas
exports.deleteAll = (req, res) => {
    Todo.deleteMany({}).then(
        data => {
            res.send({
                message: `${data.deletedCount} Tareas elimindas correctamente!!`
            });
        }
    ).catch(err => {
        res.status(500).send({
            message:
                err.message || "Error al eliminar todas las tareas"
        });
    });
}