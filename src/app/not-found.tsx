export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 text-center h-full">
      <h1 className="from-destructive via-destructive/85 to-destructive/70 bg-gradient-to-br bg-clip-text text-7xl font-bold text-transparent md:text-9xl">
        404
      </h1>

      <div className="flex items-center justify-center gap-2">
        <h2 className="text-2xl font-semibold md:text-3xl">Page Not Found</h2>
      </div>

      <p className="text-muted-foreground mx-auto max-w-md text-lg">
        The page you're looking for seems to have wandered off into the digital void
      </p>
    </div>
  );
}
