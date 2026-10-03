import { Header } from "../../common/components/Header";
import { SearchBar } from "./SearchBar";
import { MacrosRow } from "./MacrosRow";
import "./Macros.css";
import { Loading } from "../../common/components/Loading";
import { useMacrosTable } from "../hooks/useMacros";

export const MacrosPage = () => {
  const { data, setData, cardData, setCardData, dataEmpty, setDataEmpty, setHidden, showCardPreview } =
    useMacrosTable();

  return (
    <>
      {
        (!data) ? <Loading />
          :
          <>
            <Header />
            <SearchBar onDataChanged={setData} onCardChanged={setCardData} onNotFound={setDataEmpty} />
            <div className='no-data' style={dataEmpty}>
              <label>
                no se encontro el alimento
              </label>
              <button onClick={setHidden} className='close-not-found'>x</button>
            </div>
            {
              (data && data.length > 0) ?
                <div className='macros-table-card-container'>
                  <div className='macros-table'>
                    <table>
                      <thead>
                        <tr>
                          <th>Comida</th>
                          <th>Calorias</th>
                          <th>Proteinas</th>
                          <th>Grasas</th>
                          <th>Viataminas</th>
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
                  <div className='food-card-container'>
                    <img src={cardData.img} className='food-card-img' />
                    <span className='food-card-text'>
                      <h3>{cardData.nombre}</h3>
                      <label>{cardData.descripcion}</label>
                    </span>
                  </div>
                </div>
                : <Loading />
            }

          </>

      }
    </>
  )
}
