const conn = require("../db");

const getArtistas = (_, res) => {
    // Completar con la consulta que devuelve todos los artistas
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        [
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            {
                "id": "Id del artista",
                "nombre": "Nombre del artista"
            },
            ...
        ]
    */

        conn.query('SELECT * FROM artistas', (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const getArtista = (req, res) => {
    // Completar con la consulta que devuelve un artista
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la siguiente forma:
    /*
        {
            "id": "Id del artista",
            "nombre": "Nombre del artista"
        }
    */

        const id = req.params.id;
        conn.query('SELECT * FROM artistas WHERE id = ?', [id], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const createArtista = (req, res) => {
    // Completar con la consulta que crea un artista
    // Recordar que los parámetros de una consulta POST se encuentran en req.body
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista",
        }
    */

    const nombre = req.body;
    conn.query('INSERT INTO artistas (nombre) VALUES (?)', [nombre], (err, response) => {
        if (err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(nombre);
    }) 

};

const updateArtista = (req, res) => {
    // Completar con la consulta que actualiza un artista
    // Recordar que en este caso tienen parámetros en req.params (el id) y en req.body (los demás datos)
    // Deberían recibir los datos de la siguiente forma:
    /*
        {
            "nombre": "Nombre del artista"
        }
    */

    const id = req.params;
    const nombre = req.body;
    conn.query('SELECT * FROM artistas WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query('UPDATE artistas SET nombre = ?', [nombre], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al actualizar el nombre"});
            }
            return res.status(200).json(nombre);
        })
    })

};

const deleteArtista = (req, res) => {
    // Completar con la consulta que elimina un artista
    // Recordar que los parámetros de una consulta DELETE se encuentran en req.params

    const id = req.params;
    conn.query('SELECT * FROM artistas WHERE id = ?', [id], (err, result) => {
        if(err)
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }

        conn.query('DELETE FROM artistas WHERE id = ?', [id], (err, result) => {
            if(err)
            {
                console.error(err);
                return res.status(500).json({msg:"Error al eliminar el artista"});
            }
            return res.status(200).json({msg:"El artista se elimino correctamente"});
        })
    })
};

const getAlbumesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista 
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getAlbumes

    const artista = req.params;
    conn.query('SELECT * FROM albumes WHERE artista = ?', [artista], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        }
        return res.status(200).json(result);
    });
};

const getCancionesByArtista = (req, res) => {
    // Completar con la consulta que devuelve las canciones de un artista
    // (tener en cuenta que las canciones están asociadas a un álbum, y los álbumes a un artista)
    // Recordar que los parámetros de una consulta GET se encuentran en req.params
    // Deberían devolver los datos de la misma forma que getCanciones

    const artista = req.params;
    conn.query('SELECT * FROM albumes WHERE artista = ?', [artista], (err, result) => {
        if (err) 
        {
            console.error(err);
            return res.status(500).json({msg:"Error en la base de datos"});
        } 

        const album = req.params;
        if(result > 0)
        {
            conn.query('SELECT * FROM canciones WHERE album = ?', [album], (err, result) => {
            if (err) 
            {
                console.error(err);
                return res.status(500).json({msg:"Error en la base de datos"});
            }
            return res.status(200).json(result);
            });
        }  
    });
};

module.exports = {
    getArtistas,
    getArtista,
    createArtista,
    updateArtista,
    deleteArtista,
    getAlbumesByArtista,
    getCancionesByArtista,
};