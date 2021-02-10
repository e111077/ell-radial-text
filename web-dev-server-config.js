import { hmrPlugin, presets } from '@open-wc/dev-server-hmr';

export default {
  nodeResolve: true,
  watch: true,
  plugins: [
    hmrPlugin({
      include: ['src/**/*'],
      presets: [presets.litElement],
    }),
  ],
};