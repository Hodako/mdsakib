
interface RateLimitEntry {
  count: number;
  lastReset: number;
  blocked: boolean;
}

class RateLimiter {
  private static instance: RateLimiter;
  private limits: Map<string, RateLimitEntry> = new Map();
  private readonly maxRequests = 10;
  private readonly windowMs = 60 * 1000; // 1 minute
  private readonly blockDurationMs = 60 * 60 * 1000; // 1 hour

  static getInstance(): RateLimiter {
    if (!RateLimiter.instance) {
      RateLimiter.instance = new RateLimiter();
    }
    return RateLimiter.instance;
  }

  private getClientIp(): string {
    // In a real application, you'd get this from headers
    // For now, we'll use a simple identifier
    return 'client-ip'; // This would be replaced with actual IP detection
  }

  isBlocked(): boolean {
    const clientIp = this.getClientIp();
    const now = Date.now();
    const entry = this.limits.get(clientIp);

    if (!entry) {
      this.limits.set(clientIp, {
        count: 1,
        lastReset: now,
        blocked: false
      });
      return false;
    }

    // Check if block period has expired
    if (entry.blocked && (now - entry.lastReset) > this.blockDurationMs) {
      entry.blocked = false;
      entry.count = 1;
      entry.lastReset = now;
      return false;
    }

    // If currently blocked, stay blocked
    if (entry.blocked) {
      return true;
    }

    // Reset counter if window has expired
    if ((now - entry.lastReset) > this.windowMs) {
      entry.count = 1;
      entry.lastReset = now;
      return false;
    }

    // Increment counter
    entry.count++;

    // Block if limit exceeded
    if (entry.count > this.maxRequests) {
      entry.blocked = true;
      entry.lastReset = now;
      console.warn(`Rate limit exceeded for client. Blocked for 1 hour.`);
      return true;
    }

    return false;
  }

  getRemainingRequests(): number {
    const clientIp = this.getClientIp();
    const entry = this.limits.get(clientIp);
    
    if (!entry || entry.blocked) return 0;
    
    const now = Date.now();
    if ((now - entry.lastReset) > this.windowMs) {
      return this.maxRequests;
    }
    
    return Math.max(0, this.maxRequests - entry.count);
  }
}

export const rateLimiter = RateLimiter.getInstance();
