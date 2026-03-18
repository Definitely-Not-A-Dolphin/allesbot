export function unwrap<T>($: T | undefined | null): NonNullable<T> {
  if ($ === undefined || $ === null) {
    throw new Error("Unwrapping failed: value is undefined or null");
  }

  return $;
}
