export default function ErrorMessage({ error, touched }) {
  return (
    error &&
    touched && (
      <p className="text-xs text-red-600 mt-2 capitalize font-normal">
        {error}
      </p>
    )
  );
}
