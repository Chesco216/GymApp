import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import { fetchMacros } from "../repositories/macros.repository";
import { searchFoodByName } from "../repositories/macros.repository";
import type { Food } from "../interfaces/food";

/** State machine ported verbatim from legacy Macros screen. */
export const useMacrosTable = () => {
  const [dataEmpty, setDataEmpty] = useState<CSSProperties>({ display: "none" });
  const [data, setData] = useState<Food[]>([]);
  const [cardData, setCardData] = useState<Food>({} as Food);

  useEffect(() => {
    fetchMacros().then((res) => setData(res));
    searchFoodByName("pollo").then((res) => setCardData(res.retVal[0]));
  }, []);

  const setHidden = () => setDataEmpty({ display: "none" });

  const showCardPreview = async (event: React.MouseEvent<HTMLElement>) => {
    const value = (event.target as HTMLElement).innerText;
    const { retVal } = await searchFoodByName(value);
    setCardData(retVal[0]);
  };

  return { data, setData, cardData, setCardData, dataEmpty, setDataEmpty, setHidden, showCardPreview };
};
