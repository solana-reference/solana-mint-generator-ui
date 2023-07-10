export default function Error() {
  return (
    <div className="font-styled flex min-h-screen flex-col">
      <div className="flex grow flex-col items-center justify-center gap-2">
        <div className="text-4xl">Page not found!</div>
        <div className="text-lg">
          Click{' '}
          <a className="text-blue-500" href="/">
            here
          </a>{' '}
          to return back to safety
        </div>
      </div>
    </div>
  )
}
