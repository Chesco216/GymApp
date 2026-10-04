import "./PlanSkeleton.css";

const ROWS = 5;

/** Placeholder con shimmer mientras cargan dieta/rutina en el perfil. */
export const PlanSkeleton = () => {
  return (
    <div className='plan-skeleton' aria-hidden='true'>
      {Array.from({ length: ROWS }).map((_, i) => (
        <div key={i} className='plan-skeleton-row'>
          <span className='skel plan-skeleton-day' />
          <span className='skel plan-skeleton-meta' />
          <span className='skel plan-skeleton-btn' />
        </div>
      ))}
    </div>
  );
};
