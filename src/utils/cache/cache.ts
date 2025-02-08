// src/utils/cache.ts
import NodeCache from 'node-cache';

// ایجاد یک نمونه کش با زمان انقضا (TTL) به مدت 24 ساعت (86400 ثانیه)
const myNodeCache = new NodeCache({ stdTTL: 86400 });
export default myNodeCache;
