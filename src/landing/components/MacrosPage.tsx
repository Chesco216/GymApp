import { Header } from "../../common/components/Header";
import { SearchBar } from "./SearchBar";
import { MacrosRow } from "./MacrosRow";
import { FoodCardSkeleton, MacrosTableSkeleton } from "./MacrosSkeleton";
import "./Macros.css";
import { useMacrosTable } from "../hooks/useMacros";

export const MacrosPage = () => {
  const { data, setData, cardData, setCardData, dataEmpty, setDataEmpty, setHidden, showCardPreview } =
    useMacrosTable();

  const isLoading = data.length === 0 && dataEmpty.display === "none";

  return (
    <>
      <Header />
      <main className='macros-page'>
        <div className='macros-head'>
          <h1>Tabla de macronutrientes</h1>
          <p>Busca un alimento o filtra por categoría para ver sus calorías, proteínas y más.</p>
        </div>
        <SearchBar onDataChanged={setData} onCardChanged={setCardData} onNotFound={setDataEmpty} />
        <div className='no-data' style={dataEmpty}>
          <label>
            No se encontró el alimento
          </label>
          <button onClick={setHidden} className='close-not-found' aria-label='Cerrar aviso'>x</button>
        </div>
        {isLoading ? (
          <div className='macros-table-card-container'>
            <MacrosTableSkeleton />
            <FoodCardSkeleton />
          </div>
        ) : (
          data.length > 0 && (
            <div className='macros-table-card-container'>
              <div className='macros-table'>
                <table>
                  <thead>
                    <tr>
                      <th>Comida</th>
                      <th>Calorías</th>
                      <th>Proteínas</th>
                      <th>Grasas</th>
                      <th>Vitaminas</th>
                      <th>Minerales</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      data.map((item) => {
                        return (
                          <MacrosRow
                            key={item.nombre}
                            nombre={item.nombre}
                            calorias={item.macros.calorias}
                            proteinas={item.macros.proteinas}
                            grasa={item.macros.grasa}
                            vitaminas={item.macros.vitaminas}
                            minerales={item.macros.minerales}
                            showCardPreview={showCardPreview}
                          />
                        )
                      })
                    }
                  </tbody>
                </table>
              </div>
              {cardData.nombre ? (
                <div className='food-card-container'>
                  {cardData.img && <img src={cardData.img} className='food-card-img' alt={cardData.nombre} />}
                  <span className='food-card-text'>
                    <h3>{cardData.nombre}</h3>
                    <label>{cardData.descripcion}</label>
                  </span>
                </div>
              ) : (
                <FoodCardSkeleton />
              )}
            </div>
          )
        )}
      </main>
    </>
  )
}
