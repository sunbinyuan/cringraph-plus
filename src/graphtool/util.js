import { saveSvgAsPng, saveSvg } from '../saveSvgAsPng.js';

export function saveGraph(dB, gpath, ext) {
    let fn = { png: saveSvgAsPng, svg: saveSvg }[ext];
    let showControls = (s) => dB.all.attr('visibility', s ? null : 'hidden');
    gpath.selectAll('path').classed('highlight', false);
    drawLabels();
    showControls(false);
    fn(gr.node(), 'graph.' + ext, { scale: 3 }).then(() => showControls(true));

    // Analytics event
    if (analyticsEnabled) {
        pushEventTag('clicked_download', targetWindow);
    }
}
