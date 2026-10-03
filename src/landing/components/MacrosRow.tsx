interface MacrosRowProps {
  nombre: string;
  calorias: number;
  proteinas: number;
  grasa: number;
  vitaminas: string[] | string;
  minerales: string[] | string;
  showCardPreview: (event: React.MouseEvent<HTMLElement>) => void;
}

const joinList = (value: string[] | string): string =>
  Array.isArray(value) ? value.join(",  ") : value;

export const MacrosRow = ({ nombre, calorias, proteinas, grasa, vitaminas, minerales, showCardPreview }: MacrosRowProps) => {
  return (
    <tr>
      <td onClick={ showCardPreview }>{nombre}</td>
      <td>{calorias}</td>
      <td>{proteinas}</td>
      <td>{grasa}</td>
      <td>{joinList(vitaminas)}</td>
      <td>{joinList(minerales)}</td>
    </tr>
  )
}
