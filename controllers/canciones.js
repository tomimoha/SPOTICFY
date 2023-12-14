const conn = require("../db");

const getCanciones = (_, res) => {
    // Completar con la consulta que devuelve todas las canciones
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            {
                "id": "Id de la canción",
                "nombre": "Nombre de la canción",
                "nombre_artista": "Id del artista",
                "nombre_album": "Id del album",
                "duracion": "Duración de la canción",
                "reproducciones": "Reproducciones de la canción"
            },
            ...
        ]
    */

        conn.query('SELECT * FROM canciones', (err, result) => {
            if (err) 
            {
                console.error(err);
                return res.status(500).json({msg:"Error en la base de datos"});
            }
            return res.status(200).json(result);
        });
};

const getCancion = (req, res) => {
    // Completar con la consulta que devuelve una canción
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id de la canción",
            "nombre": "Nombre de la canción",
            "nombre_artista": "Id del artista",
            "nombre_album": "Id del album",
            "duracion": "Duración de la canción",
            "reproducciones": "Reproducciones de la canción"
        }
    */

        const id = req.params.id;
        conn.query('SELECT * FROM canciones WHERE id = ?', [id], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const createCancion = (req, res) => {
    // Completar con la consulta que crea una canción
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones se inicializa en 0)

    const cancion = req.body;
    conn.query('INSERT INTO canciones (nombre, album, duracion, reproducciones) VALUES (?, ?, ?, 0)', [cancion.nombre, cancion.album, cancion.duracion], (err, response) => {
    if (err)
    {
        console.error(err);
        return res.status(500).json({msg:"Error en la base de datos"});
    }
    return res.status(200).json(cancion);
}) 
};

const updateCancion = (req, res) => {
    // Completar con la consulta que actualiza una canción
    // Recordar que los parámetros de una consulta PUT se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre de la canción",
            "album": "Id del album",
            "duracion": "Duración de la canción",
        }
    */
    // (Reproducciones no se puede modificar con esta consulta)

        const id = req.params;
        const cancion = req.body;
        conn.query('SELECT * FROM canciones WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query("UPDATE canciones SET nombre = ?, album = ?, duracion = ?", [cancion.nombre, cancion.album, cancion.duracion], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al actualizar el nombre"});
            }
            return res.status(200).json(cancion);
        })
    })
};

const deleteCancion = (req, res) => {
    // Completar con la consulta que elimina una canción
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params;
    conn.query('SELECT * FROM canciones WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query("DELETE FROM canciones WHERE id = ?", [id], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al eliminar la cancion"});
            }
            return res.status(200).json({msg:"La cancion se elimino correctamente"});
        })
    })
};

const reproducirCancion = (req, res) => {
    // Completar con la consulta que aumenta las reproducciones de una canción
    // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
    
    const reproducirCancion = (req, res) => {
        // Completar con la consulta que aumenta las reproducciones de una canción
        // En este caso es una consulta PUT, pero no recibe ningún parámetro en el body, solo en los params
        
        const id = req.params.id;
        conn.query('SELECT * FROM canciones WHERE id = ?', [id], (err, result) => {
            if (err) 
            {
                console.error(err);
                return res.status(500).json({msg: "Error en la base de datos"});
            }
    
            if (result.length > 0) 
            {
                conn.query('UPDATE canciones SET reproducciones = reproducciones + 1 WHERE id = ?', [id], (err, response) => {
                    if (err) 
                    {
                        console.error(err);
                        return res.status(500).json({msg: "Error al actualizar las reproducciones"});
                    }
                    return res.status(200).json({msg: "Reproducción registrada"});
                });
            }
            return res.status(404).json({msg: "Canción no encontrada"});
        
        });
    };
}; 

module.exports = {
    getCanciones,
    getCancion,
    createCancion,
    updateCancion,
    deleteCancion,
    reproducirCancion,
};