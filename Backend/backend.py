from flask import Flask, request, jsonify
import sqlite3
from sqlite3 import Error
from datetime import datetime
import json
import os

from tkinter import filedialog as fd

conn = None


request = ""
app = Flask(__name__)

data_base = fd.askopenfilename()
print(data_base)




@app.route('/')
def index():
    
    return 'Hello, World!'

@app.route('/clima', methods=['GET'])
def read_clima():
    database = data_base
    conn = create_connection(database)
    
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        # Agrego una lectura
        print("Realizando consulta")
        rows = read_data(conn)
        resultados = dict()
        for r in rows:
            #print(r[0])        
            objs = {
                "humedadRel":r[2],
                "humedadAbs":r[3],
                "velocidadV":r[4],
                "direccionV":r[5],
                "presionBar":r[6],
                "temperatura":""
            }
            resultados[str(r[0])] = r
        return jsonify(resultados)
    
@app.route('/temperaturas', methods=['GET'])
def read_temperaturas():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"temperatura":str(r[1])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)

@app.route('/humedadRel', methods=['GET'])
def read_humedadrel():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"humedadRel":str(r[2])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)
    
@app.route('/humedadAbs', methods=['GET'])
def read_humedadabs():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"humedadAbs":str(r[3])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)
    
@app.route('/velocidadV', methods=['GET'])
def read_velocidadV():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"velocidadV":str(r[4])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)

@app.route('/direccionV', methods=['GET'])
def read_direccionV():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"direccionV":str(r[5])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)
    
    
@app.route('/presionBar', methods=['GET'])
def read_presionBar():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"presionBar":str(r[6])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)
    
@app.route('/puntoRocio', methods=['GET'])
def read_puntoRocio():
    database = data_base
    conn = create_connection(database)
    clean_database(conn)
    if conn is not None:
        print("Conexion de clima exitosa")
        # Creo la tabla para almacenar las lecturas del cima
        
    else:
        print("Error! cannot create the database connection.")
    with conn:
        rows = read_data(conn)
        resultados = dict()
        #print(len(resultados))
        temps = []
        dates = []
        
        last_date = "00:00:00"
        
        
        index = -1;
        for r in rows:
            
            actual =str(r[0].split("@")[1])
            
            # print(last_date, actual)
            if( actual !=last_date):

                
                # restar dos horas en formato 00:00:00
                hora1 = datetime.strptime(actual.strip(), '%H:%M:%S')
                hora2 = datetime.strptime(last_date.strip(), '%H:%M:%S')
                
                diferencia = int ((hora1 - hora2).total_seconds())
                # print(diferencia)
                    
                
                
                if(diferencia > 30 or diferencia < -30):
                    index = index + 1
                    resultados[index] = {"fecha":str(r[0]),"puntoRocio":str(r[7])}
                    last_date = actual
           
        print ("resultados",str(len(resultados)))
        return jsonify(resultados)

@app.route('/post/<tem>/<humRel>/<humAbs>/<velVien>/<dirVien>/<pres>/<rocio>',methods=['POST'])
def post_lectura(tem, humRel, humAbs,velVien,dirVien,pres, rocio):
    
    #print(tem)
    #print(humRel)
    #print(humAbs)
    #print(velVien)
    #print(dirVien)
    #print(pres)

    
    # Agrego una lectura
    print("Agregando una lectura")
    
    # if(tem != "Serial Port is Closed"):
    #     global last_time
    #     time = datetime.now().strftime("%M:%S")
    #     if(last_time.split(":")[0] != time.split(":")[0] and (int(time.split(":")[1]) - int(last_time.split(":")[1]))>= 5):
            
    #         last_time = time    
    lectura = (datetime.now().strftime("%d-%m-%Y@%H:%M:%S"),tem,humRel,humAbs,velVien,dirVien,pres, rocio);
    create_lectura(conn, lectura)
    return "Lectura posteada!"

def create_connection(db_file):
    """ create a database connection to the SQLite database
        specified by db_file
    :param db_file: database file
    :return: Connection object or None
    """
    conn = None
    try:
        conn = sqlite3.connect(db_file,check_same_thread=False)

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
    sql = ''' INSERT INTO clima(fechayHora, temperatura, humedadRel, humedadAbs, velocidadV, direccionV, presionBar, puntoRocio)
            VALUES(?,?,?,?,?,?,?,?) '''
    cur = conn.cursor()
    cur.execute(sql, lectura)
    conn.commit()
    return cur.lastrowid


def read_data(conn):
    
    cur = conn.cursor()
    cur.execute("SELECT * FROM clima")
    rows = cur.fetchall()

    return rows
        
        




def clean_database(conn):
    cur = conn.cursor()
    cur.execute("""delete from clima 
                    where temperatura == "Serial Port is Closed"
	                or temperatura == "0"
	                or temperatura == "4" """)
    conn.commit()
    return True


def main():
    global conn
    database = data_base
    #Creo la tabla si no existe
    clima_table = """ CREATE TABLE IF NOT EXISTS clima (
                                        fechayHora DATETIME NOT NULL,
                                        temperatura text NOT NULL,
                                        humedadRel text NOT NULL,
                                        humedadAbs text NOT NULL,
                                        velocidadV text NOT NULL,
                                        direccionV text NOT NULL,
                                        presionBar text NOT NULL,
                                        puntoRocio text NOT NULL
                                    ); """

    # Creo la conexión con la base de datos
    conn = create_connection(database)
 
    if conn is not None:
        print("Conectado a la base de datos")
        # Creo la tabla para almacenar las lecturas del cima
        create_table(conn, clima_table)
        
        #print(read_data(conn))
        
    else:
        print("Error! cannot create the database connection.")

    
"""
    with conn:
        # Agrego una lectura
        print("Agregando una lectura")
        lectura = (datetime.now().strftime("%d-%m-%Y @ %H:%M:%S"),"23","22","4","N","2");
        create_lectura(conn, lectura)
"""


if __name__=='__main__':
    print("Iniciando el servidor")
    main()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='localhost', port=port)	
    app.run(hdebug=True)
