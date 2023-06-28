from fastapi import FastAPI, UploadFile, HTTPException, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
import matplotlib.pyplot as plt
from io import BytesIO

app = FastAPI()

# Configuración de los orígenes permitidos
origins = [
    "null",
    # Agrega aquí otros orígenes permitidos
]

# Configuración de los encabezados CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


global GrapgStyle
global columnas
global dataframe
@app.post("/upload")
async def upload_file(csvFile : UploadFile):
    global GraphStyle, columnas, dataframe  # Acceder a las variables globales
    GraphStyle = ['scatter', 'line', 'bar', 'barh', 'pie']
    dataframe = pd.read_csv(csvFile.file)
    print(dataframe)
    columnas = dataframe.columns.tolist()
    print(columnas)
    return {"message" : "Archivo recibido"}


@app.get("/graph/info")
async def defineColum_andStyle():
    global GraphStyle, columnas  # Acceder a las variables globales

    if not GraphStyle or not columnas:
        raise HTTPException(status_code=404, detail="No hay datos disponibles")

    print(JSONResponse(content={"graph_styles": GraphStyle, "columnas": columnas}))
    return JSONResponse(content={"graph_styles": GraphStyle, "columnas": columnas})

global buffer
class Datos(BaseModel):
    columna1: str
    columna2: str
    estilo: str

@app.post("/columna/estilo")
async def RecibirTexto(data : Datos):
    global buffer

    columna1 = data.columna1
    columna2 = data.columna2
    estilo = data.estilo

    columna_x = columna1
    columna_y = columna2
    estilo_grafico = estilo

    plt.style.use('seaborn')

    dataframe.plot(x = columna_x, y = columna_y, kind = estilo_grafico)

    #plt.show()
    # Guardar el gráfico en memoria
    buffer = BytesIO()
    plt.savefig(buffer, format='png')
    buffer.seek(0)
    print(buffer)
    return {"message" : "Imagen generada y decodificada"}


@app.get("/image")
async def renderImage():
    global buffer
    response = Response(content=buffer.getvalue(), media_type='image/png')
    return response

