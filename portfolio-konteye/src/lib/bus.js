// Mini bus d'événements : le réseau animé (canvas) prévient la console
// quand une menace simulée est isolée.
const listeners = new Set()

export const bus = {
  on(fn) {
    listeners.add(fn)
    return () => listeners.delete(fn)
  },
  emit(event) {
    listeners.forEach((fn) => fn(event))
  },
}
