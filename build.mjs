import { buildDshPlugin } from 'dsh-build-tools'

await buildDshPlugin({
  modules: [
    { entry: 'src/host/latch.ts', out: 'latch.mjs' },
    { entry: 'src/host/metrics.ts', out: 'metrics.mjs' },
    { entry: 'src/host/fingerprint.ts', out: 'fingerprint.mjs' },
    { entry: 'src/host/ollama.ts', out: 'ollama.mjs' },
    { entry: 'src/client/slotState.ts', out: 'slotState.mjs' },
    { entry: 'src/client/metricsFmt.ts', out: 'metricsFmt.mjs' },
  ],
})
