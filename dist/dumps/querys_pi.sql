use u657840993_newpi
show tables;

SELECT * FROM alumnos;

SELECT * FROM u657840993_newpi.doc_requeridos where id_docreq = (SELECT id_docreq FROM alumnos  WHERE id = 53 and id_docreq = 1);

use u657840993_newpi

SELECT e.nombre, b.documento AS 'CFP', d.descripcion AS 'Estado CFP' FROM doc_requeridos a INNER JOIN documentos b ON a.CFP = b.id   
        INNER JOIN documentos c ON a.CFP = c.id
        INNER JOIN estados d ON a.estado_CFP = id_estado
        INNER JOIN alumnos e ON a.id_docreq = e.id_docreq
        WHERE a.id_docreq IN (1)
                