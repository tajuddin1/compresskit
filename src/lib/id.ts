let clientIdCounter = 0;

/**
 * Generate a unique client-side id.
 * Avoid relying only on Date.now()/Math.random() — duplicate keys
 * cause React lists to render a single row.
 */
export function createClientId(prefix = "id"): string {
  clientIdCounter += 1;

  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }

  return `${prefix}-${Date.now()}-${clientIdCounter}-${Math.random().toString(36).slice(2, 11)}`;
}
