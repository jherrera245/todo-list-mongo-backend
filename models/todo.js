module.exports = mongoose => {
    const Todo = mongoose.model(
        'todo',
        mongoose.Schema(
            {
                todoNombre: String,
                todoDescripcion: String,
                todoEstado: String
            },
            { timestamps: true }
        )
    )

    return Todo
}