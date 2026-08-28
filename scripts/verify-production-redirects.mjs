#!/usr/bin/env node

import fs from 'node:fs/promises';

const BASE_URL = process.env.REDIRECT_VERIFY_BASE_URL || 'https://travel.mitchchadban.com';
const EXPECTED_RULE_COUNT = Number(process.env.EXPECTED_NORMALIZATION_REDIRECTS || 81);
const config = JSON.parse(await fs.readFile(new URL('../vercel.json', import.meta.url), 'utf8'));

const normalizationRules = (config.redirects || []).filter((rule) => {
  const slashlessDestination = rule.destination === '/' ? '' : rule.destination.replace(/\/$/, '');
  return rule.source === slashlessDestination || rule.source === `${rule.destination}index.html`;
});

if (normalizationRules.length !== EXPECTED_RULE_COUNT) {
  throw new Error(`Expected ${EXPECTED_RULE_COUNT} normalization redirects, found ${normalizationRules.length}.`);
}

const canonicalDestinations = [...new Set(normalizationRules.map((rule) => rule.destination))];
const failures = [];

async function fetchWithRetry(url, options = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fetch(url, {
        redirect: 'manual',
        signal: AbortSignal.timeout(15000),
        headers: {
          'user-agent': 'there-and-back-again-redirect-verifier/1.0',
          ...(options.headers || {}),
        },
        ...options,
      });
    } catch (error) {
      lastError = error;
      if (attempt < attempts) await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw lastError;
}

for (const rule of normalizationRules) {
  const sourceUrl = `${BASE_URL}${rule.source}`;
  try {
    const response = await fetchWithRetry(sourceUrl);
    const location = response.headers.get('location');
    const resolvedLocation = location ? new URL(location, BASE_URL).href : null;
    const expectedLocation = new URL(rule.destination, BASE_URL).href;

    if (response.status !== rule.statusCode) {
      failures.push(`${rule.source}: expected ${rule.statusCode}, got ${response.status}`);
      continue;
    }

    if (resolvedLocation !== expectedLocation) {
      failures.push(`${rule.source}: expected Location ${expectedLocation}, got ${location || '(missing)'}`);
    }
  } catch (error) {
    failures.push(`${rule.source}: request failed: ${error.message}`);
  }
}

for (const destination of canonicalDestinations) {
  const destinationUrl = `${BASE_URL}${destination}`;
  try {
    const response = await fetchWithRetry(destinationUrl);
    const location = response.headers.get('location');

    if (response.status !== 200) {
      failures.push(`${destination}: expected canonical 200, got ${response.status}${location ? ` -> ${location}` : ''}`);
    }
  } catch (error) {
    failures.push(`${destination}: canonical request failed: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`FAIL: ${failures.length} production redirect verification error(s)`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS: ${normalizationRules.length}/${normalizationRules.length} normalization redirects return the configured status and exact canonical Location.`);
console.log(`PASS: ${canonicalDestinations.length}/${canonicalDestinations.length} canonical destinations return 200 without following redirects.`);
console.log(`Verified against ${BASE_URL}.`);
