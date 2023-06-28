import pandas as pd
import matplotlib.pyplot as plt

# Crear un DataFrame de ejemplo
data = {
    'Ciudad': ['Ciudad A', 'Ciudad B', 'Ciudad C', 'Ciudad D'],
    'Poblacion': [100000, 150000, 90000, 120000],
    'Area': [50, 70, 40, 60]
}

df = pd.DataFrame(data)

# Opciones de columnas y estilo de gráfico
columna_x = 'Ciudad'  # Columna para el eje x
columna_y = 'Poblacion'  # Columna para el eje y
estilo_grafico = 'bar'  # Estilo de gráfico (puedes probar con 'bar', 'line', 'scatter', etc.)

# Crear el gráfico
plt.style.use('seaborn')  # Estilo de gráfico

df.plot(x=columna_x, y=columna_y, kind=estilo_grafico)
plt.xlabel('Ciudades')
plt.ylabel('Población')
plt.title('Población por Ciudad')

# Mostrar el gráfico
plt.show()
