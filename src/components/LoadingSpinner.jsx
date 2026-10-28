export default function LoadingSpinner() {
  return (
    <div className="status" role="status">
      <span className="spinner" aria-hidden="true" />
      Loading weather...
    </div>
  );
}
