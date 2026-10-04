const ROWS = 6;
const COLS = 6;

/** Placeholder con shimmer mientras la tabla de alimentos carga. */
export const MacrosTableSkeleton = () => {
  return (
    <div className='macros-table' aria-hidden='true'>
      <table className='macros-skeleton-table'>
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
          {Array.from({ length: ROWS }).map((_, r) => (
            <tr key={r} className='macros-skeleton-row'>
              {Array.from({ length: COLS }).map((_, c) => (
                <td key={c}>
                  <span className='skel' />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/** Placeholder con shimmer mientras la tarjeta del alimento carga. */
export const FoodCardSkeleton = () => {
  return (
    <div className='food-card-container' aria-hidden='true'>
      <span className='skel food-card-skeleton-img' />
      <span className='food-card-text'>
        <span className='skel food-card-skeleton-line' />
        <span className='skel food-card-skeleton-line food-card-skeleton-line--short' />
        <span className='skel food-card-skeleton-line' />
      </span>
    </div>
  );
};
