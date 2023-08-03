import sqlite3
from sqlite3 import Error
from datetime import datetime
conn = None

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file)
    except Error as e:
        print(e)

    return conn

def create_table(conn, create_table_sql):
    """ create a table from the create_table_sql statement
    :param conn: Connection object
    :param create_table_sql: a CREATE TABLE statement
    :return:
    """
    try:
        c = conn.cursor()
        c.execute(create_table_sql)
    except Error as e:
        print(e)


def create_lectura(conn, lectura):
    """
    Creo una nueva lectura para almacenar en la base de datos
    :param conn:
    :param lectura:
    :return: project id
    """
    sql = ''' INSERT INTO clima(fechayHora, humedadRel, humedadAbs, velocidadV, direccionV, presionBar)
              VALUES(?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, lectura)
    conn.commit()
    return cur.lastrowid





def main():
    database = "Backend\\Base\\base.db"
    #Creo la tabla si no existe
    clima_table = """ CREATE TABLE IF NOT EXISTS clima (
                                        id integer PRIMARY KEY,
                                        fechayHora DATETIME NOT NULL,
                                        humedadRel text NOT NULL,
                                        humedadAbs text NOT NULL,
                                        velocidadV text NOT NULL,
                                        direccionV text NOT NULL,
                                        presionBar tect NOT NULL
                                    ); """

    # Creo la conexión con la base de datos
    conn = create_connection(database)

    if conn is not None:
        # Creo la tabla para almacenar las lecturas del cima
        create_table(conn, clima_table)

       
    else:
        print("Error! cannot create the database connection.")

    

    with conn:
        # Agrego una lectura
        lectura = (datetime.now(),"23","22","4","N","2");
        create_lectura(conn, lectura)
       
       


if __name__ == '__main__':
    main()