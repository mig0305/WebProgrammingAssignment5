export default function ErrorMessage({ message, onRetry }) {
  return (
    <div className="error-box">
      <p role="alert">{message}</p>
      <button type="button" onClick={onRetry}>Try again</button>
    </div>
  );
}
