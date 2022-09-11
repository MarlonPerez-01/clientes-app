DROP DATABASE IF EXISTS clientes_db;
CREATE DATABASE clientes_db;
USE clientes_db;


create table cliente
(
    id              int auto_increment
        primary key,
    primerNombre    varchar(255)                             not null,
    segundoNombre   varchar(255)                             not null,
    primerApellido  varchar(255)                             not null,
    segundoApellido varchar(255)                             not null,
    edad            int                                      not null,
    correo          varchar(255)                             not null,
    createdAt       datetime(6) default current_timestamp(6) not null,
    deletedAt       datetime(6)                              null
);


create table direccion
(
    id           int auto_increment
        primary key,
    clienteId    int                                      not null,
    departamento varchar(255)                             not null,
    municipio    varchar(255)                             not null,
    detalles     varchar(255)                             not null,
    createdAt    datetime(6) default current_timestamp(6) not null,
    deletedAt    datetime(6)                              null,
    constraint FK_db0e996c8ebce5c76e5d7c41155
        foreign key (clienteId) references cliente (id)
);

create table documento
(
    id        int auto_increment
        primary key,
    clienteId int                                      not null,
    nombre    varchar(255)                             not null,
    ruta      varchar(255)                             not null,
    createdAt datetime(6) default current_timestamp(6) not null,
    deletedAt datetime(6)                              null,
    constraint FK_e14e0e8abaef4f04597bad703c8
        foreign key (clienteId) references cliente (id)
);

create table usuario
(
    id          int auto_increment
        primary key,
    correo      varchar(255) not null,
    contrasenia varchar(255) not null,
    constraint IDX_349ecb64acc4355db443ca17cb
        unique (correo)
);


-- Tabla: auditoria
create table auditoria
(
    id_auditoria        int auto_increment
        primary key,
    id_registro         int                                   not null,
    nombre_tabla        varchar(255)                          not null,
    nombre_campo        varchar(255)                          not null,
    accion              varchar(255)                          not null,
    valor_anterior      varchar(255)                          null,
    valor_nuevo         varchar(255)                          not null,
    fecha_actualizacion timestamp default current_timestamp() null
);
DELIMITER
$$

-- Trigger al insertar en tabla cliente
CREATE TRIGGER cliente_insertar
    AFTER INSERT
    ON cliente
    FOR EACH ROW

BEGIN

    INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                           fecha_actualizacion)
    VALUES (NEW.id, 'cliente', 'id', 'insertar', NULL, NEW.id, CURRENT_TIMESTAMP);

END$$


-- Trigger al actualizar en tabla cliente
DROP TRIGGER IF EXISTS cliente_actualizar;

DELIMITER $$

CREATE TRIGGER cliente_actualizar
    AFTER UPDATE
    ON cliente
    FOR EACH ROW

BEGIN
    IF OLD.primerNombre <> NEW.primerNombre THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'primerNombre', 'actualizar', OLD.primerNombre, NEW.primerNombre,
                CURRENT_TIMESTAMP);
    END IF;

    IF OLD.segundoNombre <> NEW.segundoNombre THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'segundoNombre', 'actualizar', OLD.segundoNombre, NEW.segundoNombre,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.primerApellido <> NEW.primerApellido THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'primerApellido', 'actualizar', OLD.primerApellido, NEW.primerApellido,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.segundoApellido <> NEW.segundoApellido THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'segundoApellido', 'actualizar', OLD.segundoApellido, NEW.segundoApellido,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.edad <> NEW.edad THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'edad', 'actualizar', OLD.edad, NEW.edad, CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.correo <> NEW.correo THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'correo', 'actualizar', OLD.correo, NEW.correo, CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.deletedAt <> NEW.deletedAt THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'cliente', 'deletedAt', 'deshabilitar', OLD.deletedAt, NEW.deletedAt, CURRENT_TIMESTAMP);
    END IF;
END$$



-- Trigger al insertar en tabla direccion
CREATE TRIGGER direccion_insertar
    AFTER INSERT
    ON cliente
    FOR EACH ROW

BEGIN

    INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                           fecha_actualizacion)
    VALUES (NEW.id, 'direccion', 'id', 'insertar', NULL, NEW.id, CURRENT_TIMESTAMP);

END$$


-- Trigger al actualizar en tabla direccion
DROP TRIGGER IF EXISTS direccion_actualizar;

DELIMITER $$

CREATE TRIGGER direccion_actualizar
    AFTER UPDATE
    ON direccion
    FOR EACH ROW

BEGIN
    IF OLD.clienteId <> NEW.clienteId THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.clienteId, 'direccion', 'clienteId', 'actualizar', OLD.clienteId, NEW.clienteId,
                CURRENT_TIMESTAMP);
    END IF;

    IF OLD.departamento <> NEW.departamento THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'direccion', 'departamento', 'actualizar', OLD.departamento, NEW.departamento,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.municipio <> NEW.municipio THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'direccion', 'municipio', 'actualizar', OLD.municipio, NEW.municipio,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.detalles <> NEW.detalles THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'direccion', 'detalles', 'actualizar', OLD.detalles, NEW.detalles,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.createdAt <> NEW.createdAt THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'direccion', 'createdAt', 'deshabilitar', OLD.createdAt, NEW.createdAt, CURRENT_TIMESTAMP);
    END IF;

END$$



-- Trigger al insertar en tabla documento
CREATE TRIGGER documento_insertar
    AFTER INSERT
    ON documento
    FOR EACH ROW

BEGIN

    INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                           fecha_actualizacion)
    VALUES (NEW.id, 'documento', 'id', 'insertar', NULL, NEW.id, CURRENT_TIMESTAMP);

END$$


-- Trigger al actualizar en tabla documento
DROP TRIGGER IF EXISTS documento_actualizar;

DELIMITER $$

CREATE TRIGGER documento_actualizar
    AFTER UPDATE
    ON documento
    FOR EACH ROW

BEGIN
    IF OLD.clienteId <> NEW.clienteId THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'documento', 'clienteId', 'actualizar', OLD.clienteId, NEW.clienteId,
                CURRENT_TIMESTAMP);
    END IF;

    IF OLD.nombre <> NEW.nombre THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'documento', 'nombre', 'actualizar', OLD.nombre, NEW.nombre,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.ruta <> NEW.ruta THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'documento', 'ruta', 'actualizar', OLD.ruta, NEW.ruta,
                CURRENT_TIMESTAMP);
    END IF;


    IF
        OLD.deletedAt <> NEW.deletedAt THEN
        INSERT INTO auditoria (id_registro, nombre_tabla, nombre_campo, accion, valor_anterior, valor_nuevo,
                               fecha_actualizacion)
        VALUES (NEW.id, 'documento', 'deletedAt', 'deshabilitar', OLD.deletedAt, NEW.deletedAt, CURRENT_TIMESTAMP);
    END IF;
END$$
