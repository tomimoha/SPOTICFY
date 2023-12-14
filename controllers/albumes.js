const conn = require("../db");

const getAlbumes = (_, res) => {
    // Completar con la consulta que devuelve todos los albumes
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": 1,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            {
                "id": 2,
                "nombre": "Nombre del album",
                "nombre_artista": "Nombre del artista"
            },
            ...
        ]
    */

    conn.query('SELECT * FROM albumes', (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const getAlbum = (req, res) => {
    // Completar con la consulta que devuelve un album por id
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": 1,
            "nombre": "Nombre del album",
            "nombre_artista": "Nombre del artista"
        }
    */

        const id = req.params.id;
        conn.query('SELECT * FROM albumes WHERE id = ?', [id], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const createAlbum = (req, res) => {
    // Completar con la consulta que crea un album
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

        const nombre = req.body;
        conn.query('INSERT INTO albumes (nombre) VALUES (?)', [nombre], (err, response) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(response);
    }) 
};

const updateAlbum = (req, res) => {
    // Completar con la consulta que actualiza un album
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recbir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del album",
            "artista": "Id del artista"
        }
    */

        const id = req.params;
        const nombre = req.body;
        conn.query('SELECT * FROM albumes WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query("UPDATE albumes SET nombre = ?", [nombre], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al actualizar el nombre"});
            }
            return res.status(200).json(nombre);
        })

        conn.query("UPDATE albumes SET artista = ?", [artista], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al actualizar el nombre"});
            }
            return res.status(200).json(artista);
        })
    })
};

const deleteAlbum = (req, res) => {
    // Completar con la consulta que elimina un album
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params;
    conn.query('SELECT * FROM albumes WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query("DELETE FROM albumes WHERE id = ?", [id], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al eliminar el album"});
            }
            return res.status(200).json({msg:"El album se elimino correctamente"});
        })
    })
};

const getCancionesByAlbum = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un album
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const albumes = req.params;
    conn.query('SELECT canciones FROM albumes WHERE artista = ?', [artista], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

module.exports = {
    getAlbumes,
    getAlbum,
    createAlbum,
    updateAlbum,
    deleteAlbum,
    getCancionesByAlbum,
};
