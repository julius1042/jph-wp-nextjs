'use client';
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="p-6 text-center">
      <h2>Something went wrong loading this page!</h2>
      <p className="text-sm text-red-500 my-2">{error.message}</p>
      <button onClick={() => reset()} className="px-4 py-2 bg-blue-500 text-white rounded">
        Try Again
      </button>
    </div>
  );
}